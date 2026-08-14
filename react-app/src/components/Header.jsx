import { getRoleInfo } from '../config/roleConfig'
import '../styles/Header.css'

function Header({ user, userRole, userEmail, onLogout }) {
  const roleInfo = userRole ? getRoleInfo(userRole) : null
  const email = user?.email || userEmail

  return (
    <header className="app-header shadow-soft">
      <div className="header-left">
        <p className="app-brand">Horas de alfabetización</p>
        <p className="app-user">
          Sesión iniciada como <strong>{email}</strong>
        </p>
        {roleInfo && (
          <div className="user-role-badge">
            <span className="role-icon">{roleInfo.icon}</span>
            <span className="role-name">{roleInfo.label}</span>
          </div>
        )}
      </div>
      <button type="button" className="btn btn-gradient" onClick={onLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Header
