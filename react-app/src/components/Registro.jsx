import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase'

/**
 * Registra una jornada de servicio con fecha, horario y actividades realizadas.
 * Valida que todos los campos tengan contenido antes de guardarlos en Supabase.
 *
 * @returns {JSX.Element} Formulario controlado para guardar horas.
 */
export default function Registro() {
  const [form, setForm] = useState({
    fecha: '',
    horaInicio: '',
    horaTermino: '',
    actividades: '',
  })
  const [registros, setRegistros] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const cargarRegistros = async () => {
      if (!supabase) return

      const { data, error } = await supabase
        .from('registros_horas')
        .select('id, fecha, hora_inicio, hora_termino, actividades')
        .order('fecha', { ascending: false })

      if (error) {
        setMessage(`No se pudieron cargar tus registros: ${error.message}`)
        return
      }

      setRegistros(data || [])
    }

    cargarRegistros()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.fecha || !form.horaInicio || !form.horaTermino || !form.actividades) {
      setMessage('Por favor completa todos los campos.')
      return
    }

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

    const { data, error } = await supabase
      .from('registros_horas')
      .insert({
        usuario_id: userId,
        fecha: form.fecha,
        hora_inicio: form.horaInicio,
        hora_termino: form.horaTermino,
        actividades: form.actividades,
      })
      .select('id, fecha, hora_inicio, hora_termino, actividades')
      .single()

    if (error) {
      setMessage(`No se pudo guardar el registro: ${error.message}`)
      return
    }

    setRegistros((prev) => [data, ...prev])
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
      {registros.length > 0 && (
        <div className="mt-4">
          <h3>Registros guardados</h3>
          {registros.map((registro) => (
            <p key={registro.id}>
              {registro.fecha}: {registro.hora_inicio} - {registro.hora_termino} | {registro.actividades}
            </p>
          ))}
        </div>
      )}
    </section>
  )
}
