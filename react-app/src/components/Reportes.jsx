import '../styles/Reportes.css'

const datosEstudiante = [
  { 
    id: 1, 
    fecha: '2024-08-14', 
    horas: 2.5, 
    profesor: 'Lic. María García', 
    actividad: 'Apoyo educativo en lectura',
    estado: 'Aprobado',
    horaInicio: '08:00',
    horaFin: '10:30'
  },
  { 
    id: 2, 
    fecha: '2024-08-13', 
    horas: 3, 
    profesor: 'Lic. Carlos Rodríguez', 
    actividad: 'Taller de alfabetización',
    estado: 'Aprobado',
    horaInicio: '09:00',
    horaFin: '12:00'
  },
  { 
    id: 3, 
    fecha: '2024-08-12', 
    horas: 2, 
    profesor: 'Lic. Ana López', 
    actividad: 'Acompañamiento educativo',
    estado: 'Aprobado',
    horaInicio: '14:00',
    horaFin: '16:00'
  },
  { 
    id: 4, 
    fecha: '2024-08-11', 
    horas: 1.5, 
    profesor: 'Lic. Roberto Silva', 
    actividad: 'Labores comunitarias',
    estado: 'Rechazado',
    horaInicio: '10:00',
    horaFin: '11:30'
  },
]

const datosProfesor = [
  { id: 1, estudiante: 'Ana Gómez', horas: 32, estado: 'Completado' },
  { id: 2, estudiante: 'Carlos Ruiz', horas: 24, estado: 'Pendiente' },
  { id: 3, estudiante: 'María Pérez', horas: 40, estado: 'Completado' },
]

const datosDirectivo = [
  { id: 1, departamento: 'Académico', estudiantes: 120, aprobados: 95 },
  { id: 2, departamento: 'Deportivo', estudiantes: 80, aprobados: 75 },
  { id: 3, departamento: 'Cultural', estudiantes: 60, aprobados: 58 },
]

const datosPadre = [
  { id: 1, materia: 'Matemáticas', calificacion: 4.5, observaciones: 'Excelente rendimiento' },
  { id: 2, materia: 'Lenguaje', calificacion: 4.2, observaciones: 'Muy bien, sigue así' },
  { id: 3, materia: 'Ciencias', calificacion: 3.8, observaciones: 'Necesita refuerzo' },
]

export default function Reportes({ userRole, user }) {
  const reportesPorRol = {
    estudiante: {
      titulo: 'Mis Horas de Servicio Social',
      descripcion: 'Registro diario de horas completadas en alfabetización y servicio comunitario',
      subtitulo: 'Progreso: 42 / 80 horas (52.5%)',
      datos: datosEstudiante,
      columnas: ['fecha', 'horas', 'profesor', 'estado'],
      renderItem: (item) => (
        <article key={item.id} className={`hour-card status-${item.estado.toLowerCase()}`}>
          <div className="hour-header">
            <div className="status-section">
              <span className={`status-badge status-${item.estado.toLowerCase()}`}>
                {item.estado === 'Aprobado' ? '✓ Aprobado' : '✗ Rechazado'}
              </span>
            </div>
            <div className="date-section">
              <p className="date-label">Fecha</p>
              <p className="date-value">{item.fecha}</p>
            </div>
          </div>
          
          <div className="hour-body">
            <div className="hour-info-group">
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div>
                  <p className="info-label">Horas completadas</p>
                  <p className="info-value">{item.horas} hrs</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🕐</span>
                <div>
                  <p className="info-label">Horario</p>
                  <p className="info-value">{item.horaInicio} - {item.horaFin}</p>
                </div>
              </div>
            </div>

            <div className="hour-info-group">
              <div className="info-item full-width">
                <span className="info-icon">👨‍🏫</span>
                <div>
                  <p className="info-label">Profesor supervisor</p>
                  <p className="info-value">{item.profesor}</p>
                </div>
              </div>
            </div>

            <div className="hour-activity">
              <span className="activity-icon">📋</span>
              <div>
                <p className="activity-label">Actividad realizada</p>
                <p className="activity-value">{item.actividad}</p>
              </div>
            </div>
          </div>
        </article>
      ),
    },
    profesor: {
      titulo: 'Reportes de Estudiantes',
      descripcion: 'Seguimiento del progreso de tus estudiantes',
      datos: datosProfesor,
      columnas: ['estudiante', 'horas', 'estado'],
      renderItem: (item) => (
        <article key={item.id} className="report-card">
          <div className="report-header">
            <h3>👨‍🎓 {item.estudiante}</h3>
            <span className={`status-badge status-${item.estado.toLowerCase()}`}>{item.estado}</span>
          </div>
          <div className="report-body">
            <p><strong>Horas cumplidas:</strong> {item.horas}</p>
          </div>
        </article>
      ),
    },
    directivo: {
      titulo: 'Reportes Generales',
      descripcion: 'Estadísticas generales de la institución',
      datos: datosDirectivo,
      columnas: ['departamento', 'estudiantes', 'aprobados'],
      renderItem: (item) => (
        <article key={item.id} className="report-card">
          <div className="report-header">
            <h3>🏢 {item.departamento}</h3>
            <span className="status-badge status-completado">
              {Math.round((item.aprobados / item.estudiantes) * 100)}%
            </span>
          </div>
          <div className="report-body">
            <p><strong>Total estudiantes:</strong> {item.estudiantes}</p>
            <p><strong>Aprobados:</strong> {item.aprobados}</p>
          </div>
        </article>
      ),
    },
    padre: {
      titulo: 'Reportes de mi Hijo/a',
      descripcion: 'Seguimiento del desempeño académico',
      datos: datosPadre,
      columnas: ['materia', 'calificacion', 'observaciones'],
      renderItem: (item) => (
        <article key={item.id} className="report-card">
          <div className="report-header">
            <h3>📖 {item.materia}</h3>
            <span className="status-badge status-completado">{item.calificacion}/5.0</span>
          </div>
          <div className="report-body">
            <p><strong>Observaciones:</strong> {item.observaciones}</p>
          </div>
        </article>
      ),
    },
  }

  const reporte = reportesPorRol[userRole] || reportesPorRol.estudiante

  // Calcular horas totales para estudiante
  const horasTotales = userRole === 'estudiante' 
    ? reporte.datos.reduce((total, item) => total + item.horas, 0)
    : 0
  const horasAprobadas = userRole === 'estudiante'
    ? reporte.datos.filter(item => item.estado === 'Aprobado').reduce((total, item) => total + item.horas, 0)
    : 0
  const horasRechazadas = userRole === 'estudiante'
    ? reporte.datos.filter(item => item.estado === 'Rechazado').reduce((total, item) => total + item.horas, 0)
    : 0
  const porcentajeCompleto = userRole === 'estudiante' ? (horasAprobadas / 80) * 100 : 0

  return (
    <section className="section-card reportes-section">
      <div className="section-header-content">
        <h2>{reporte.titulo}</h2>
        <p>{reporte.descripcion}</p>
        {userRole === 'estudiante' && reporte.subtitulo && (
          <p className="progress-subtitle">{reporte.subtitulo}</p>
        )}
      </div>

      {userRole === 'estudiante' && (
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${porcentajeCompleto}%` }}></div>
          </div>
          <div className="progress-info">
            <span className="progress-current">{horasAprobadas} horas</span>
            <span className="progress-total">de 80 horas requeridas</span>
          </div>
        </div>
      )}

      <div className="reportes-grid">
        {reporte.datos.map((item) => reporte.renderItem(item))}
      </div>

      <div className="reportes-summary">
        {userRole === 'estudiante' ? (
          <>
            <div className="summary-stat status-aprobado">
              <span className="stat-icon">✓</span>
              <div>
                <p className="stat-label">Horas Aprobadas</p>
                <p className="stat-value">{horasAprobadas} hrs</p>
              </div>
            </div>
            <div className="summary-stat status-rechazado">
              <span className="stat-icon">✗</span>
              <div>
                <p className="stat-label">Horas Rechazadas</p>
                <p className="stat-value">{horasRechazadas} hrs</p>
              </div>
            </div>
            <div className="summary-stat status-pendiente">
              <span className="stat-icon">⏱️</span>
              <div>
                <p className="stat-label">Horas Faltantes</p>
                <p className="stat-value">{Math.max(0, 80 - horasAprobadas)} hrs</p>
              </div>
            </div>
          </>
        ) : (
          <div className="summary-stat">
            <span className="stat-icon">📊</span>
            <div>
              <p className="stat-label">Total de registros</p>
              <p className="stat-value">{reporte.datos.length}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
