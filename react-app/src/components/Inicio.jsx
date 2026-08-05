export default function Inicio() {
  return (
    <section className="section-card">
      <h2>Inicio</h2>
      <p>Bienvenido al sistema. Selecciona una sección del menú para continuar.</p>
      <div className="section-list">
        <div className="section-item shadow-sm">
          <h3>Registro de horas</h3>
          <p>Agrega y guarda tu jornada laboral.</p>
        </div>
        <div className="section-item shadow-sm">
          <h3>Evidencias</h3>
          <p>Sube archivos y documentos de tus actividades.</p>
        </div>
        <div className="section-item shadow-sm">
          <h3>Reportes</h3>
          <p>Revisa el estado de los reportes finales y aprobaciones.</p>
        </div>
      </div>
    </section>
  )
}
