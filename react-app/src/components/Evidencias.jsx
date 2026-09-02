import { useEffect, useState } from 'react'
import { getRoleInfo } from '../config/roleConfig'
import { supabase } from '../config/supabase'
import '../styles/Evidencias.css'

const datosEstudiante = [
  {
    id: 1,
    fecha: '2024-08-14',
    archivo: 'Reporte_Alfabetización_14082024.pdf',
    descripcion: 'Clase de alfabetización con el grupo de adultos de la comunidad. Se trabajó lectura básica.',
    profesor: 'Lic. María García',
    estado: 'Aprobado',
    comentario: 'Excelente trabajo, muy completo y bien documentado.',
    tipo: 'Documento'
  },
  {
    id: 2,
    fecha: '2024-08-13',
    archivo: 'Fotos_Taller_Lectura.zip',
    descripcion: 'Fotografías del taller de lectura realizado en la escuela rural.',
    profesor: 'Lic. Carlos Rodríguez',
    estado: 'Aprobado',
    comentario: 'Buena evidencia visual de la actividad.',
    tipo: 'Fotos'
  },
  {
    id: 3,
    fecha: '2024-08-12',
    archivo: 'Evaluación_Estudiantes.docx',
    descripcion: 'Resultados de la evaluación de los estudiantes de alfabetización.',
    profesor: 'Lic. Ana López',
    estado: 'Rechazado',
    comentario: 'Falta información de la metodología utilizada. Resubir con detalles.',
    tipo: 'Documento'
  },
]

const datosProfesor = [
  {
    id: 1,
    estudiante: 'Juan Pérez',
    fecha: '2024-08-14',
    archivo: 'Actividad_Juan.pdf',
    descripcion: 'Apoyo en lectura y escritura',
    estado: 'Pendiente',
    tipo: 'Documento'
  },
  {
    id: 2,
    estudiante: 'María Gómez',
    fecha: '2024-08-13',
    archivo: 'Proyecto_María.zip',
    descripcion: 'Proyecto de comunidad educativa',
    estado: 'Aprobado',
    tipo: 'Proyecto'
  },
]

const datosDirectivo = [
  {
    id: 1,
    estudiante: 'Juan Pérez',
    profesor: 'Lic. María García',
    fecha: '2024-08-14',
    tipo: 'Documento',
    estado: 'Aprobado',
    descripcion: 'Actividad de alfabetización'
  },
  {
    id: 2,
    estudiante: 'María Gómez',
    profesor: 'Lic. Carlos Rodríguez',
    fecha: '2024-08-13',
    tipo: 'Fotos',
    estado: 'Aprobado',
    descripcion: 'Taller comunitario'
  },
]

const datosPadre = [
  {
    id: 1,
    fecha: '2024-08-14',
    archivo: 'Reporte_Actividades.pdf',
    descripcion: 'Reporte de actividades de servicio social de su hijo',
    profesor: 'Lic. María García',
    estado: 'Aprobado',
    comentario: 'Su hijo está realizando un excelente trabajo.',
    tipo: 'Documento'
  },
  {
    id: 2,
    fecha: '2024-08-13',
    archivo: 'Fotos_Actividades.zip',
    descripcion: 'Fotografías de las actividades realizadas',
    profesor: 'Lic. Carlos Rodríguez',
    estado: 'Aprobado',
    comentario: 'Muy buena participación.',
    tipo: 'Fotos'
  },
]

/**
 * Gestiona la consulta de evidencias segun el rol y permite al estudiante
 * cargar archivos locales junto con una descripcion para enviarlos a revision.
 *
 * @param {Object} props Propiedades de la vista.
 * @param {string} props.userRole Rol que define los datos y acciones visibles.
 * @param {Object} props.user Usuario autenticado, reservado para datos de la vista.
 * @returns {JSX.Element} Formulario opcional y listado de evidencias.
 */
export default function Evidencias({ userRole, user }) {
  const [archivo, setArchivo] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [lista, setLista] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const roleInfo = getRoleInfo(userRole)

  useEffect(() => {
    const cargarEvidencias = async () => {
      if (!supabase) return

      const { data: authData } = await supabase.auth.getUser()
      const userId = authData.user?.id
      if (!userId) return

      const { data, error } = await supabase
        .from('evidencias')
        .select('id, nombre_archivo, descripcion, estado, url_archivo, created_at')
        .eq('usuario_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        setMessage(`No se pudieron cargar las evidencias: ${error.message}`)
        return
      }

      setLista((data || []).map((item) => ({
        id: item.id,
        nombre: item.nombre_archivo,
        descripcion: item.descripcion,
        estado: item.estado,
        url: item.url_archivo,
      })))
    }

    cargarEvidencias()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!archivo || !descripcion) return

    if (!supabase) {
      setMessage('Supabase no está configurado.')
      return
    }

    setLoading(true)
    try {
      const { data: authData } = await supabase.auth.getUser()
      const userId = authData.user?.id
      if (!userId) throw new Error('Tu sesión no está disponible. Inicia sesión nuevamente.')

      const path = `${userId}/${Date.now()}-${archivo.name}`
      const { error: uploadError } = await supabase.storage
        .from('evidencias')
        .upload(path, archivo, { upsert: false })
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('evidencias').getPublicUrl(path)
      const { data, error } = await supabase
        .from('evidencias')
        .insert({
          usuario_id: userId,
          nombre_archivo: archivo.name,
          descripcion,
          url_archivo: urlData.publicUrl,
        })
        .select('id, nombre_archivo, descripcion, estado, url_archivo')
        .single()
      if (error) throw error

      setLista((prev) => [
        { id: data.id, nombre: data.nombre_archivo, descripcion: data.descripcion, estado: data.estado, url: data.url_archivo },
        ...prev,
      ])
      setMessage('Evidencia subida correctamente y enviada a revisión.')
      setArchivo(null)
      setDescripcion('')
    } catch (error) {
      const message = error.message === 'Bucket not found'
        ? 'Primero crea el bucket evidencias en Supabase Storage o ejecuta supabase-schema.sql.'
        : error.message?.includes('row-level security')
          ? 'Supabase bloqueó la subida. Ejecuta nuevamente las políticas de Storage de supabase-schema.sql.'
        : `No se pudo guardar la evidencia: ${error.message}`
      setMessage(message)
    } finally {
      setLoading(false)
    }
  }

  const contenidoPorRol = {
    estudiante: {
      titulo: 'Mis Evidencias',
      descripcion: 'Carga archivos, fotos y documentos de tus actividades de alfabetización y servicio social',
      datos: datosEstudiante,
      mostrarFormulario: true,
      renderItem: (item) => (
        <article key={item.id} className={`evidence-card status-${item.estado.toLowerCase()}`}>
          <div className="evidence-header">
            <div className="status-section">
              <span className={`status-badge status-${item.estado.toLowerCase()}`}>
                {item.estado === 'Aprobado' ? '✓ Aprobado' : item.estado === 'Rechazado' ? '✗ Rechazado' : '⏳ Pendiente'}
              </span>
            </div>
            <div className="date-section">
              <p className="date-value">{item.fecha}</p>
            </div>
          </div>

          <div className="evidence-body">
            <div className="file-info">
              <span className="file-icon">📎</span>
              <div>
                <p className="file-name">{item.archivo}</p>
                <p className="file-type">{item.tipo}</p>
              </div>
            </div>

            <div className="evidence-description">
              <p className="description-text">{item.descripcion}</p>
            </div>

            <div className="professor-section">
              <span className="professor-icon">👨‍🏫</span>
              <div>
                <p className="professor-label">Revisado por</p>
                <p className="professor-name">{item.profesor}</p>
              </div>
            </div>

            {item.comentario && (
              <div className="comment-section">
                <p className="comment-label">💬 Comentario del profesor</p>
                <p className="comment-text">{item.comentario}</p>
              </div>
            )}
          </div>
        </article>
      ),
    },
    profesor: {
      titulo: 'Evidencias de Estudiantes',
      descripcion: 'Revisa y aprueba las evidencias subidas por tus estudiantes',
      datos: datosProfesor,
      mostrarFormulario: false,
      renderItem: (item) => (
        <article key={item.id} className={`evidence-card status-${item.estado.toLowerCase()}`}>
          <div className="evidence-header">
            <div className="status-section">
              <span className={`status-badge status-${item.estado.toLowerCase()}`}>
                {item.estado === 'Aprobado' ? '✓ Aprobado' : '⏳ Pendiente'}
              </span>
            </div>
            <div className="student-section">
              <p className="student-name">{item.estudiante}</p>
            </div>
          </div>

          <div className="evidence-body">
            <div className="file-info">
              <span className="file-icon">📎</span>
              <div>
                <p className="file-name">{item.archivo}</p>
                <p className="file-type">{item.tipo}</p>
              </div>
            </div>

            <div className="evidence-description">
              <p className="description-text">{item.descripcion}</p>
            </div>

            <div className="action-buttons">
              <button className="btn btn-approve">✓ Aprobar</button>
              <button className="btn btn-reject">✗ Rechazar</button>
            </div>
          </div>
        </article>
      ),
    },
    directivo: {
      titulo: 'Todas las Evidencias',
      descripcion: 'Supervisión de evidencias de toda la institución',
      datos: datosDirectivo,
      mostrarFormulario: false,
      renderItem: (item) => (
        <article key={item.id} className={`evidence-card status-${item.estado.toLowerCase()}`}>
          <div className="evidence-header">
            <div className="status-section">
              <span className={`status-badge status-${item.estado.toLowerCase()}`}>
                {item.estado}
              </span>
            </div>
          </div>

          <div className="evidence-body">
            <div className="evidence-meta">
              <div className="meta-item">
                <span className="meta-icon">👨‍🎓</span>
                <div>
                  <p className="meta-label">Estudiante</p>
                  <p className="meta-value">{item.estudiante}</p>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👨‍🏫</span>
                <div>
                  <p className="meta-label">Profesor</p>
                  <p className="meta-value">{item.profesor}</p>
                </div>
              </div>
            </div>

            <div className="file-info">
              <span className="file-icon">📎</span>
              <div>
                <p className="file-type">{item.tipo}</p>
              </div>
            </div>
          </div>
        </article>
      ),
    },
    padre: {
      titulo: 'Evidencias de mi Hijo/a',
      descripcion: 'Revisa las evidencias de las actividades realizadas por tu hijo/a',
      datos: datosPadre,
      mostrarFormulario: false,
      renderItem: (item) => (
        <article key={item.id} className={`evidence-card status-${item.estado.toLowerCase()}`}>
          <div className="evidence-header">
            <div className="status-section">
              <span className={`status-badge status-${item.estado.toLowerCase()}`}>
                {item.estado === 'Aprobado' ? '✓ Aprobado' : '⏳ Pendiente'}
              </span>
            </div>
            <div className="date-section">
              <p className="date-value">{item.fecha}</p>
            </div>
          </div>

          <div className="evidence-body">
            <div className="file-info">
              <span className="file-icon">📎</span>
              <div>
                <p className="file-name">{item.archivo}</p>
                <p className="file-type">{item.tipo}</p>
              </div>
            </div>

            <div className="evidence-description">
              <p className="description-text">{item.descripcion}</p>
            </div>

            <div className="professor-section">
              <span className="professor-icon">👨‍🏫</span>
              <div>
                <p className="professor-label">Profesor responsable</p>
                <p className="professor-name">{item.profesor}</p>
              </div>
            </div>

            {item.comentario && (
              <div className="comment-section">
                <p className="comment-label">💬 Comentario del profesor</p>
                <p className="comment-text">{item.comentario}</p>
              </div>
            )}
          </div>
        </article>
      ),
    },
  }

  const contenido = contenidoPorRol[userRole] || contenidoPorRol.estudiante

  return (
    <section className="section-card evidencias-section">
      <div className="section-header-content">
        <h2>{contenido.titulo}</h2>
        <p>{contenido.descripcion}</p>
      </div>

      {contenido.mostrarFormulario && (
        <form onSubmit={handleSubmit} className="evidence-form">
          <div className="form-group">
            <label htmlFor="archivo" className="form-label">
              📁 Seleccionar archivo
            </label>
            <div className="file-input-wrapper">
              <input
                id="archivo"
                type="file"
                className="file-input"
                onChange={(event) => setArchivo(event.target.files?.[0] || null)}
                required
              />
              <span className="file-input-label">
                {archivo ? archivo.name : 'Ningún archivo seleccionado'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">
              📝 Descripción
            </label>
            <textarea
              id="descripcion"
              className="form-control"
              rows="4"
              placeholder="Describe la actividad realizada, qué se hizo, dónde y con quién..."
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
            {loading ? 'Guardando...' : '📤 Subir evidencia'}
          </button>
        </form>
      )}

      {message && (
        <div className="alert alert-success mt-3">
          {message}
        </div>
      )}

      <div className="evidencias-grid">
        {contenido.datos.map((item) => contenido.renderItem(item))}
      </div>

      {lista.length > 0 && (
        <div className="local-uploads mt-4">
          <h3>📤 Tus evidencias guardadas</h3>
          <div className="uploads-list">
            {lista.map((item) => (
              <div key={item.id} className="upload-item">
                <span className="upload-icon">📎</span>
                <div>
                  <p className="upload-name">{item.nombre}</p>
                  <p className="upload-desc">{item.descripcion}</p>
                </div>
                <span className={`status-badge status-${item.estado.toLowerCase()}`}>
                  {item.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
