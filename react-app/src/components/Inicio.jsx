import heroImage from '../assets/hero.png'

export default function Inicio() {
  return (
    <section className="section-card inicio-card">
      <div className="inicio-hero">
        <div>
          <p className="hero-tag">Bienvenida</p>
          <h2>Tu tablero está listo</h2>
          <p className="hero-copy">
            Descubre rápidamente las opciones clave y comienza a gestionar tus registros con estilo.
          </p>
        </div>
        <div className="hero-badge">✨</div>
      </div>

      <div className="section-list inicio-grid">
        <article className="section-item feature-card feature-card--blue">
          <h3>Registro de horas</h3>
          <p>Agrega y guarda tu jornada laboral con fecha, inicio y fin.</p>
        </article>
        <article className="section-item feature-card feature-card--purple">
          <h3>Evidencias</h3>
          <p>Sube archivos, fotos y documentos de tus actividades.</p>
        </article>
        <article className="section-item feature-card feature-card--green">
          <h3>Reportes</h3>
          <p>Revisa el estado de tus reportes y seguimientos en tiempo real.</p>
        </article>
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
