function Sidebar({ items, currentSection, onChangeSection }) {
  return (
    <aside className="app-sidebar shadow-soft sidebar-card">
      <div className="sidebar-banner">
        <span>Menú</span>
        <strong>Explora</strong>
      </div>
      <h2 className="sidebar-title">Secciones</h2>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-item ${currentSection === item.key ? 'sidebar-item--active' : ''}`}
            onClick={() => onChangeSection(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
