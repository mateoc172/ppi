import { getRoleInfo } from '../config/roleConfig'
import '../styles/Header.css'

/**
 * Muestra la identidad de la sesion, el rol activo y la accion de cierre.
 *
 * @param {Object} props Propiedades del encabezado.
 * @param {Object} props.user Usuario autenticado, si existe.
 * @param {string} props.userRole Rol activo.
 * @param {string} [props.userEmail] Correo alternativo para compatibilidad.
 * @param {() => void} props.onLogout Funcion ejecutada al cerrar sesion.
 * @returns {JSX.Element} Encabezado de la aplicacion.
 */
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
