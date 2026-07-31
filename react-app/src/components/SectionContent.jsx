function SectionContent({ section }) {
  const sections = {
    inicio: {
      title: 'Inicio',
      description: 'Bienvenido al panel principal de la aplicación. Aquí encontrarás un resumen rápido de las secciones disponibles.',
      items: ['Estado de informes', 'Resumen de usuarios', 'Atajos a los módulos principales'],
    },
    registro: {
      title: 'Registro de horas',
      description: 'Registra las horas trabajadas por docentes y directivos. Este módulo ayuda a llevar control de asistencia y actividades.',
      items: ['Agregar registro', 'Ver historial', 'Enviar para aprobación'],
    },
    evidencias: {
      title: 'Evidencias',
      description: 'Carga evidencias y documentos relacionados a las actividades de estudiantes y docentes.',
      items: ['Subir archivos', 'Ver evidencias', 'Descargar reportes'],
    },
    reportes: {
      title: 'Reportes',
      description: 'Genera y revisa reportes para docentes, directivos y administradores.',
      items: ['Reporte de horas', 'Reporte de asistencia', 'Reporte de actividades'],
    },
    usuarios: {
      title: 'Usuarios',
      description: 'Administra los diferentes perfiles: estudiantes, docentes, padres de familia, directivos y admin.',
      items: ['Estudiantes', 'Docentes', 'Padres de familia', 'Directivos', 'Admin'],
    },
    perfil: {
      title: 'Perfil',
      description: 'Ve y actualiza los datos de tu perfil de usuario.',
      items: ['Nombre', 'Correo', 'Rol', 'Preferencias'],
    },
  }

  const sectionInfo = sections[section] || sections.inicio

  return (
    <section className="section-card">
      <h2>{sectionInfo.title}</h2>
      <p>{sectionInfo.description}</p>
      <div className="section-list">
        {sectionInfo.items.map((item) => (
          <div key={item} className="section-item shadow-sm">
            {item}
          </div>
        ))}
      </div>
      {section === 'reportes' && (
        <div className="section-note alert alert-info mt-3">
          Acceso solo a: Docentes, Directivos y Admin.
        </div>
      )}
    </section>
  )
}

export default SectionContent
