import { getRoleInfo } from '../config/roleConfig'
import '../styles/Inicio.css'

/**
 * Presenta el resumen de bienvenida y las funciones disponibles para cada rol.
 *
 * @param {Object} props Propiedades de la pantalla de inicio.
 * @param {string} props.userRole Rol que determina el contenido mostrado.
 * @param {Object} props.user Usuario autenticado recibido por el dashboard.
 * @returns {JSX.Element} Panel de bienvenida con funciones y referencia visual.
 */
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
      descripcion: 'Sigue el progreso de horas de servicio social de tu hijo/a.',
      features: [
        { titulo: 'Horas de mi Hijo', descripcion: 'Consulta las horas aprobadas y actividades realizadas', icon: '📊' },
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
        </div>
        <div className="image-panel__gallery">
          <div
            className="image-panel__thumb image-panel__thumb--large"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85)',
            }}
            role="img"
            aria-label="Personas participando en una clase"
          />
          <div
            className="image-panel__thumb image-panel__thumb--small"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=85)',
            }}
            role="img"
            aria-label="Estudiante leyendo y aprendiendo"
          />
          <div
            className="image-panel__thumb image-panel__thumb--small"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85)',
            }}
            role="img"
            aria-label="Persona estudiando con recursos digitales"
          />
        </div>
      </div>

      <div className="project-gallery">
        <div className="project-gallery__header">
          <div>
            <p className="image-panel__tag">Nuestro proyecto</p>
            <h3>Aprender también se construye en comunidad</h3>
          </div>
          <span>Actividades de alfabetización</span>
        </div>
        <div className="project-gallery__grid">
          <figure className="project-gallery__item">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85"
              alt="Estudiantes aprendiendo juntos en un aula"
              loading="lazy"
            />
            <figcaption>Aprendizaje compartido</figcaption>
          </figure>
          <figure className="project-gallery__item">
            <img
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85"
              alt="Grupo de jóvenes participando en una actividad educativa"
              loading="lazy"
            />
            <figcaption>Participación activa</figcaption>
          </figure>
          <figure className="project-gallery__item">
            <img
              src="https://images.unsplash.com/photo-1494386346843-e12284507169?auto=format&fit=crop&w=900&q=85"
              alt="Personas colaborando alrededor de una mesa de estudio"
              loading="lazy"
            />
            <figcaption>Trabajo en comunidad</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
