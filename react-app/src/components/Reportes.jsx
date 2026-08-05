const reportes = [
  { id: 1, estudiante: 'Ana Gómez', horas: 32, aprobado: true },
  { id: 2, estudiante: 'Carlos Ruiz', horas: 24, aprobado: false },
  { id: 3, estudiante: 'María Pérez', horas: 40, aprobado: true },
]

export default function Reportes() {
  return (
    <section className="section-card">
      <h2>Reportes</h2>
      <p>Revisa el estado de los reportes finales y la aprobación de horas.</p>
      <div className="section-list">
        {reportes.map((reporte) => (
          <article key={reporte.id} className="section-item shadow-sm">
            <h3>{reporte.estudiante}</h3>
            <p>Horas cumplidas: {reporte.horas}</p>
            <p>Estado: {reporte.aprobado ? 'Aprobado' : 'Pendiente'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
