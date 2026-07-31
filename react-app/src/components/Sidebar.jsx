function Sidebar({ items, currentSection, onChangeSection }) {
  return (
    <aside className="app-sidebar shadow-sm">
      <h2 className="sidebar-title">Secciones</h2>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-item btn ${currentSection === item.key ? 'btn-primary' : 'btn-outline-secondary'}`}
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
