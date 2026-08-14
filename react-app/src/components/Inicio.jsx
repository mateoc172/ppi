import heroImage from '../assets/hero.png'
import { getRoleInfo } from '../config/roleConfig'
import '../styles/Inicio.css'

export default function Inicio({ userRole, user }) {
  const roleInfo = getRoleInfo(userRole)

  const contenidoPorRol = {
    estudiante: {
      titulo: '¡Hola Estudiante!',
      descripcion: 'Aquí puedes ver tus evidencias, reportes y seguimiento académico.',
      features: [
        { titulo: 'Mis Evidencias', descripcion: 'Consulta tus actividades y entregas', icon: '📋' },
        { titulo: 'Mis Reportes', descripcion: 'Revisa tu progreso académico', icon: '📊' },
        { titulo: 'Mi Perfil', descripcion: 'Actualiza tu información personal', icon: '👤' },
      ],
    },
    profesor: {
      titulo: '¡Hola Profesor!',
      descripcion: 'Gestiona las horas de trabajo, evidencias y estudiantes desde aquí.',
      features: [
        { titulo: 'Registro de Horas', descripcion: 'Registra tu jornada laboral', icon: '⏱️' },
        { titulo: 'Evidencias', descripcion: 'Sube archivos y documentos de tus actividades', icon: '📋' },
        { titulo: 'Mis Estudiantes', descripcion: 'Gestiona y califica a tus estudiantes', icon: '👥' },
      ],
    },
    directivo: {
      titulo: '¡Hola Directivo!',
      descripcion: 'Administra la institución y accede a reportes generales.',
      features: [
        { titulo: 'Reportes Generales', descripcion: 'Visualiza estadísticas de toda la institución', icon: '📊' },
        { titulo: 'Gestión de Usuarios', descripcion: 'Administra profesores, estudiantes y padres', icon: '👥' },
        { titulo: 'Evidencias', descripcion: 'Revisa todas las evidencias de la institución', icon: '📋' },
      ],
    },
    padre: {
      titulo: '¡Hola Padre de Familia!',
      descripcion: 'Sigue el progreso académico de tu hijo/a.',
      features: [
        { titulo: 'Progreso de mi Hijo', descripcion: 'Revisa las calificaciones y reportes', icon: '📊' },
        { titulo: 'Evidencias', descripcion: 'Consulta las actividades y entregas', icon: '📋' },
        { titulo: 'Comunicación', descripcion: 'Contacta con los profesores', icon: '💬' },
      ],
    },
  }

  const contenido = contenidoPorRol[userRole] || contenidoPorRol.estudiante

  return (
    <section className="section-card inicio-card">
      <div className="inicio-hero">
        <div>
          <p className="hero-tag">Bienvenida</p>
          <h2>{contenido.titulo}</h2>
          <p className="hero-copy">{contenido.descripcion}</p>
          <div className="role-badge-hero">
            <span className="role-icon">{roleInfo.icon}</span>
            <span className="role-label">{roleInfo.label}</span>
          </div>
        </div>
        <div className="hero-badge">✨</div>
      </div>

      <div className="section-list inicio-grid">
        {contenido.features.map((feature, idx) => (
          <article 
            key={idx}
            className={`section-item feature-card feature-card--${['blue', 'purple', 'green'][idx % 3]}`}
          >
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.titulo}</h3>
            <p>{feature.descripcion}</p>
          </article>
        ))}
      </div>

      <div className="image-panel">
        <div className="image-panel__header">
          <div>
            <p className="image-panel__tag">Referencia visual</p>
            <h3>Escenario educativo</h3>
          </div>
          <span>Imagen de ejemplo</span>
        </div>
        <div className="image-panel__gallery">
          <div
            className="image-panel__thumb image-panel__thumb--large"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Escenario educativo"
          />
          <div
            className="image-panel__thumb image-panel__thumb--small"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Vista previa de referencia"
          />
          <div
            className="image-panel__thumb image-panel__thumb--small"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Vista previa de referencia"
          />
        </div>
      </div>
    </section>
  )
}
