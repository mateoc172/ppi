function Header({ userEmail, onLogout }) {
  return (
    <header className="app-header shadow-soft">
      <div>
        <p className="app-brand">PPI</p>
        <p className="app-user">
          Sesión iniciada como <strong>{userEmail}</strong>
        </p>
      </div>
      <button type="button" className="btn btn-gradient" onClick={onLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Header
