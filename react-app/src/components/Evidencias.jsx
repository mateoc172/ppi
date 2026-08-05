import { useState } from 'react'

export default function Evidencias() {
  const [archivo, setArchivo] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [lista, setLista] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!archivo || !descripcion) return

    setLista((prev) => [
      ...prev,
      { id: Date.now(), nombre: archivo.name, descripcion },
    ])
    setArchivo(null)
    setDescripcion('')
  }

  return (
    <section className="section-card">
      <h2>Evidencias</h2>
      <form onSubmit={handleSubmit} className="section-form">
        <div className="mb-3">
          <label htmlFor="archivo" className="form-label">Archivo</label>
          <input
            id="archivo"
            type="file"
            className="form-control"
            onChange={(event) => setArchivo(event.target.files?.[0] || null)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            className="form-control"
            rows="3"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Subir evidencia</button>
      </form>
      {lista.length > 0 && (
        <div className="mt-4">
          <h3>Archivos subidos</h3>
          <ul className="list-group">
            {lista.map((item) => (
              <li key={item.id} className="list-group-item">
                <strong>{item.nombre}</strong>
                <p>{item.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
