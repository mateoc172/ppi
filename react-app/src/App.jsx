import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Header from './components/Header.jsx'
import SectionContent from './components/SectionContent.jsx'
import Sidebar from './components/Sidebar.jsx'
import './App.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://tu-proyecto.supabase.co'
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

const sections = [
  { key: 'inicio', label: 'Inicio' },
  { key: 'registro', label: 'Registro de horas' },
  { key: 'evidencias', label: 'Evidencias' },
  { key: 'reportes', label: 'Reportes' },
  { key: 'usuarios', label: 'Usuarios' },
  { key: 'perfil', label: 'Perfil' },
]

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
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    if (!supabase) return

    const session = supabase.auth.getSession().then(({ data }) => {
      const sessionData = data.session
      if (sessionData?.user) {
        setUser({ email: sessionData.user.email })
      }
    })

    return () => {
      if (session?.unsubscribe) {
        session.unsubscribe()
      }
    }
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

    if (!supabase) {
      setMessage('Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env')
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) throw error

        setUser({ email: formData.email })
        setMessage('Inicio de sesión correcto.')
        setIsSuccess(true)
        setActiveSection('inicio')
      } else {
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
      }
    } catch (error) {
      setMessage(error.message || 'No se pudo completar la operación.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setIsLogin(true)
    setMessage('Has cerrado sesión correctamente.')
    setIsSuccess(true)
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

  return (
    <div className="app-shell">
      <Header userEmail={user.email} onLogout={handleLogout} />
      <div className="app-layout">
        <Sidebar items={sections} currentSection={activeSection} onChangeSection={setActiveSection} />
        <main className="app-main">
          <SectionContent section={activeSection} />
        </main>
      </div>
    </div>
  )
}

export default App
