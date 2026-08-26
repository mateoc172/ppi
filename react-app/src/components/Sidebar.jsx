/**
 * Renderiza la navegacion lateral y conserva compatibilidad con dos contratos de props.
 *
 * @param {Object} props Propiedades de navegacion.
 * @param {Array<Object>} [props.sections] Secciones del contrato actual.
 * @param {Array<Object>} [props.items] Secciones del contrato anterior.
 * @param {string} [props.activeSection] Seccion activa actual.
 * @param {string} [props.currentSection] Seccion activa del contrato anterior.
 * @param {(section: string) => void} [props.setActiveSection] Cambio de seccion actual.
 * @param {(section: string) => void} [props.onChangeSection] Cambio anterior.
 * @returns {JSX.Element} Menu lateral con botones de seccion.
 */
function Sidebar({ sections, activeSection, setActiveSection, userRole, items, currentSection, onChangeSection }) {
  // Compatibilidad con ambas interfaces
  const displaySections = sections || items
  const active = activeSection || currentSection
  const handleChange = setActiveSection || onChangeSection

  return (
    <aside className="app-sidebar shadow-soft sidebar-card">
      <div className="sidebar-banner">
        <span>Menú</span>
        <strong>Explora</strong>
      </div>
      <h2 className="sidebar-title">Secciones</h2>
      <nav className="sidebar-nav">
        {displaySections.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-item ${active === item.key ? 'sidebar-item--active' : ''}`}
            onClick={() => handleChange(item.key)}
          >
            <span className="sidebar-item-icon">{item.icon || '📄'}</span>
            <span className="sidebar-item-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
