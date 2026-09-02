import { useEffect, useState } from 'react'
import { getRoleInfo } from '../config/roleConfig'
import { supabase } from '../config/supabase'
import '../styles/Perfil.css'

/**
 * Presenta y actualiza los campos de perfil disponibles para el rol activo.
 * Los datos se mantienen en el estado del formulario y la confirmacion es local.
 *
 * @param {Object} props Propiedades de la vista.
 * @param {string} props.userRole Rol que define los campos mostrados.
 * @param {Object} props.user Usuario autenticado usado para inicializar el correo.
 * @returns {JSX.Element} Formulario de informacion personal y mensaje de resultado.
 */
export default function Perfil({ userRole, user }) {
  const [form, setForm] = useState({
    nombre: '',
    correo: user?.email || '',
    telefono: '',
    direccion: '',
    institucion: '',
    departamento: '',
  })
  const [message, setMessage] = useState('')
  const roleInfo = getRoleInfo(userRole)

  useEffect(() => {
    const cargarPerfil = async () => {
      if (!supabase) return

      const { data: authData } = await supabase.auth.getUser()
      const userId = authData.user?.id
      if (!userId) return

      const { data, error } = await supabase
        .from('perfiles')
        .select('nombre, correo, telefono, direccion, institucion, departamento')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        setMessage(`No se pudo cargar el perfil: ${error.message}`)
        return
      }

      if (data) setForm((prev) => ({ ...prev, ...data }))
    }

    cargarPerfil()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!supabase) {
      setMessage('Supabase no está configurado.')
      return
    }

    const { data: authData } = await supabase.auth.getUser()
    const userId = authData.user?.id
    if (!userId) {
      setMessage('Tu sesión no está disponible. Inicia sesión nuevamente.')
      return
    }

    const { error } = await supabase.from('perfiles').upsert({ id: userId, ...form })
    setMessage(error ? `No se pudo actualizar el perfil: ${error.message}` : 'Perfil actualizado correctamente.')
    setTimeout(() => setMessage(''), 3000)
  }

  const camposPorRol = {
    estudiante: [
      { name: 'nombre', label: 'Nombre Completo', type: 'text', placeholder: 'Tu nombre' },
      { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'correo@ejemplo.com' },
      { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+57 123 4567890' },
      { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Tu dirección' },
    ],
    profesor: [
      { name: 'nombre', label: 'Nombre Completo', type: 'text', placeholder: 'Tu nombre' },
      { name: 'correo', label: 'Correo Institucional', type: 'email', placeholder: 'correo@institucion.edu' },
      { name: 'telefono', label: 'Teléfono de Contacto', type: 'tel', placeholder: '+57 123 4567890' },
      { name: 'departamento', label: 'Departamento', type: 'text', placeholder: 'Tu departamento' },
    ],
    directivo: [
      { name: 'nombre', label: 'Nombre Completo', type: 'text', placeholder: 'Tu nombre' },
      { name: 'correo', label: 'Correo Institucional', type: 'email', placeholder: 'correo@institucion.edu' },
      { name: 'telefono', label: 'Teléfono de Oficina', type: 'tel', placeholder: '+57 123 4567890' },
      { name: 'institucion', label: 'Institución', type: 'text', placeholder: 'Nombre de la institución' },
    ],
    padre: [
      { name: 'nombre', label: 'Nombre Completo', type: 'text', placeholder: 'Tu nombre' },
      { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'correo@ejemplo.com' },
      { name: 'telefono', label: 'Teléfono de Contacto', type: 'tel', placeholder: '+57 123 4567890' },
      { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Tu dirección' },
    ],
  }

  const campos = camposPorRol[userRole] || camposPorRol.estudiante

  return (
    <section className="section-card perfil-section">
      <div className="perfil-header">
        <div className="perfil-title">
          <h2>Mi Perfil</h2>
          <p>Actualiza tu información personal</p>
        </div>
        <div className="perfil-role-badge">
          <span className="role-icon">{roleInfo.icon}</span>
          <div>
            <p className="role-type">Tu Rol</p>
            <p className="role-name">{roleInfo.label}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="perfil-form">
        {campos.map((campo) => (
          <div key={campo.name} className="form-group">
            <label htmlFor={campo.name} className="form-label">
              {campo.label}
            </label>
            <input
              id={campo.name}
              name={campo.name}
              type={campo.type}
              className="form-control"
              value={form[campo.name]}
              onChange={handleChange}
              placeholder={campo.placeholder}
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary btn-submit">
          💾 Actualizar Perfil
        </button>
      </form>

      {message && (
        <div className="alert alert-success mt-3">
          ✅ {message}
        </div>
      )}
    </section>
  )
}
