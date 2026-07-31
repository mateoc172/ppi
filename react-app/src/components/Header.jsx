function Header({ userEmail, onLogout }) {
  return (
    <header className="app-header shadow-sm">
      <div>
        <p className="app-brand">PPI - Portal educativo</p>
        <p className="app-user">Sesión iniciada como <strong>{userEmail}</strong></p>
      </div>
      <button type="button" className="btn btn-outline-secondary" onClick={onLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Header
