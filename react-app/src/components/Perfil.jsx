import { useState } from 'react'

export default function Perfil() {
  const [form, setForm] = useState({ nombre: '', correo: '' })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Perfil actualizado correctamente.')
  }

  return (
    <section className="section-card">
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit} className="section-form">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            className="form-control"
            value={form.correo}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar perfil</button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </section>
  )
}
