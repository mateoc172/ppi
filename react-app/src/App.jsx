import { useEffect, useState } from 'react'
import RoleSelector from './components/RoleSelector.jsx'
import Dashboard from './components/Dashboard.jsx'
import { supabase } from './config/supabase'
import './App.css'

const localUserKey = 'ppi-demo-user'
const localUserRoleKey = 'ppi-demo-user-role'
const localUsersKey = 'ppi-demo-users'
const demoCredentials = {
  email: 'demo@ppi.com',
  password: 'demo123',
}

const getLocalUsers = () => {
  try {
    const storedUsers = localStorage.getItem(localUsersKey)
    return storedUsers ? JSON.parse(storedUsers) : {}
  } catch {
    return {}
  }
}

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(localUserKey)
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

const getStoredUserRole = () => {
  try {
    const storedRole = localStorage.getItem(localUserRoleKey)
    return storedRole || null
  } catch {
    return null
  }
}

const saveLocalUserRole = (role) => {
  localStorage.setItem(localUserRoleKey, role)
}

const clearLocalUserRole = () => {
  localStorage.removeItem(localUserRoleKey)
}

/**
 * Controla la autenticacion, la sesion de Supabase o el modo local de demo.
 *
 * @returns {JSX.Element} Pantalla de autenticacion, selector de rol o dashboard.
 */
function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [user, setUser] = useState(() => getStoredUser())
  const [userRole, setUserRole] = useState(() => (supabase ? null : getStoredUserRole()))
  const [loadingSession, setLoadingSession] = useState(Boolean(supabase))
  const [activeSection, setActiveSection] = useState('inicio')

  const persistUser = (userData) => {
    localStorage.setItem(localUserKey, JSON.stringify(userData))
  }

  const loadUserProfile = async (authUser) => {
    const { data: profile, error } = await supabase
      .from('perfiles')
      .select('nombre, correo, rol')
      .eq('id', authUser.id)
      .maybeSingle()

    if (error) throw error

    if (profile) {
      return {
        user: {
          id: authUser.id,
          email: authUser.email,
          name: profile.nombre,
        },
        role: profile.rol,
      }
    }

    const { data: createdProfile, error: createError } = await supabase
      .from('perfiles')
      .insert({
        id: authUser.id,
        nombre: authUser.user_metadata?.full_name || '',
        correo: authUser.email || '',
        rol: 'estudiante',
      })
      .select('nombre, rol')
      .single()

    if (createError) throw createError

    return {
      user: {
        id: authUser.id,
        email: authUser.email,
        name: createdProfile.nombre,
      },
      role: createdProfile.rol,
    }
  }

  useEffect(() => {
    if (!supabase) return

    const loadSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error

        const sessionUser = data.session?.user
        if (!sessionUser) {
          setUser(null)
          setUserRole(null)
          return
        }

        const profileData = await loadUserProfile(sessionUser)
        setUser(profileData.user)
        setUserRole(profileData.role)
        persistUser(profileData.user)
      } catch {
        setUser(null)
        setUserRole(null)
      } finally {
        setLoadingSession(false)
      }
    }

    loadSession().catch(() => {})
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setIsSuccess(false)

    try {
      const isDemoLogin =
        isLogin &&
        formData.email === demoCredentials.email &&
        formData.password === demoCredentials.password

      if (isDemoLogin) {
        const userData = { email: demoCredentials.email, name: 'Usuario demo' }
        setUser(userData)
        persistUser(userData)
        setMessage('Inicio de sesión correcto.')
        setIsSuccess(true)
        setActiveSection('inicio')
        return
      }

      if (supabase) {
        try {
          if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
            })

            if (error) throw error

            const profileData = await loadUserProfile(data.user)
            setUser(profileData.user)
            setUserRole(profileData.role)
            persistUser(profileData.user)
            setMessage('Inicio de sesión correcto.')
            setIsSuccess(true)
            return
          }

          const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                full_name: formData.name,
              },
            },
          })

          if (error) throw error

          if (data?.user && !data.session) {
            setMessage('Registro enviado. Revisa tu correo para confirmar la cuenta.')
          } else {
            setMessage('Registro correcto. Ya puedes iniciar sesión.')
          }

          setIsSuccess(true)
          return
        } catch (supabaseError) {
          if (supabaseError?.message === 'Failed to fetch') {
            // Continúa con el modo local cuando la conexión a Supabase falla.
          } else {
            throw supabaseError
          }
        }
      }

      const localUsers = getLocalUsers()

      if (isLogin) {
        const isDemoUser =
          formData.email === demoCredentials.email && formData.password === demoCredentials.password
        const storedUser = localUsers[formData.email]

        if (isDemoUser || (storedUser && storedUser.password === formData.password)) {
          const userData = {
            email: formData.email,
            name: storedUser?.name || 'Usuario demo',
          }
          setUser(userData)
          persistUser(userData)
          setMessage('Inicio de sesión correcto.')
          setIsSuccess(true)
          return
        }

        setMessage('No se pudo obtener acceso. Usa demo@ppi.com / demo123 o crea una cuenta local.')
        return
      }

      if (!formData.name.trim()) {
        setMessage('Ingresa tu nombre completo para continuar.')
        return
      }

      if (localUsers[formData.email]) {
        setMessage('Ya existe una cuenta con ese correo en modo demo.')
        return
      }

      const createdUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }

      localStorage.setItem(localUsersKey, JSON.stringify({ ...localUsers, [formData.email]: createdUser }))

      const userData = {
        email: formData.email,
        name: formData.name,
      }
      setUser(userData)
      persistUser(userData)
      setMessage('Registro correcto. Ya puedes usar la aplicación.')
      setIsSuccess(true)
    } catch (error) {
      setMessage(error.message || 'No se pudo completar la operación.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }

    localStorage.removeItem(localUserKey)
    clearLocalUserRole()
    setUser(null)
    setUserRole(null)
    setIsLogin(true)
    setMessage('Has cerrado sesión correctamente.')
    setIsSuccess(true)
  }

  const handleRoleSelect = (role) => {
    setUserRole(role)
    saveLocalUserRole(role)
  }

  const handleChangeRole = () => {
    clearLocalUserRole()
    setUserRole(null)
  }

  const handleBackToRoleSelector = () => {
    handleChangeRole()
  }

  const handleBackToLogin = () => {
    setUser(null)
    setUserRole(null)
    setIsLogin(true)
    clearLocalUserRole()
    localStorage.removeItem(localUserKey)
  }

  if (loadingSession) {
    return <div className="auth-shell">Cargando sesión...</div>
  }

  if (!user) {
    return (
      <div className="auth-shell">
        <div className="auth-card shadow-sm">
          <div className="auth-toggle" role="tablist" aria-label="Autenticación">
            <button
              type="button"
              className={`auth-toggle__button ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              className={`auth-toggle__button ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Registro
            </button>
          </div>

          <h1 className="auth-title">{isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h1>
          <p className="auth-subtitle">
            {isLogin
              ? 'Accede con tu correo y contraseña.'
              : 'Regístrate para empezar a usar la app.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </form>

          {message && (
            <div className={`alert mt-3 ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    )
  }

  // El selector solo se usa cuando la app funciona en modo demo local.
  if (!userRole) {
    return (
      <>
        <RoleSelector onRoleSelect={handleRoleSelect} selectedRole={userRole} />
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleBackToLogin}
          >
            Regresar
          </button>
        </div>
      </>
    )
  }

  // Mostrar dashboard del usuario con su rol seleccionado
  return (
    <Dashboard
      user={user}
      userRole={userRole}
      onLogout={handleLogout}
      onChangeRole={handleChangeRole}
      onBackToRoleSelector={handleBackToRoleSelector}
    />
  )
}

export default App
