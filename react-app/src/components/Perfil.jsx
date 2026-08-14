import { useState } from 'react'
import { getRoleInfo } from '../config/roleConfig'
import '../styles/Perfil.css'

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

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Perfil actualizado correctamente.')
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
