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
