import { useState } from 'react'

export default function Registro() {
  const [form, setForm] = useState({
    fecha: '',
    horaInicio: '',
    horaTermino: '',
    actividades: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.fecha || !form.horaInicio || !form.horaTermino || !form.actividades) {
      setMessage('Por favor completa todos los campos.')
      return
    }

    setMessage(`Registro guardado: ${form.fecha}, ${form.horaInicio}-${form.horaTermino}`)
    setForm({ fecha: '', horaInicio: '', horaTermino: '', actividades: '' })
  }

  return (
    <section className="section-card">
      <h2>Registro de horas</h2>
      <form onSubmit={handleSubmit} className="section-form">
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            className="form-control"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="horaInicio" className="form-label">Hora de inicio</label>
            <input
              id="horaInicio"
              name="horaInicio"
              type="time"
              className="form-control"
              value={form.horaInicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="horaTermino" className="form-label">Hora de término</label>
            <input
              id="horaTermino"
              name="horaTermino"
              type="time"
              className="form-control"
              value={form.horaTermino}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="actividades" className="form-label">Actividades desarrolladas</label>
          <textarea
            id="actividades"
            name="actividades"
            className="form-control"
            rows="4"
            value={form.actividades}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar registro</button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </section>
  )
}
