import { useState } from 'react'
import { getSectionsByRole, getRoleInfo } from '../config/roleConfig'
import Header from './Header'
import SectionContent from './SectionContent'
import Sidebar from './Sidebar'
import '../styles/Dashboard.css'

/**
 * Ensambla el encabezado, la navegacion lateral y el contenido del rol activo.
 *
 * @param {Object} props Propiedades del dashboard.
 * @param {Object} props.user Usuario autenticado.
 * @param {string} props.userRole Rol seleccionado por el usuario.
 * @param {() => void} props.onLogout Funcion que cierra la sesion.
 * @param {() => void} [props.onChangeRole] Funcion que vuelve al selector de rol.
 * @param {() => void} [props.onBackToRoleSelector] Funcion para volver a la seleccion de roles.
 * @returns {JSX.Element} Panel principal o mensaje de rol invalido.
 */
export default function Dashboard({ user, userRole, onLogout, onChangeRole, onBackToRoleSelector }) {
  const [activeSection, setActiveSection] = useState('inicio')
  const sections = getSectionsByRole(userRole)
  const roleInfo = getRoleInfo(userRole)

  if (!roleInfo) {
    return <div className="error">Error: Rol no válido</div>
  }

  return (
    <div className="dashboard-container">
      <Header
        user={user}
        userRole={userRole}
        onLogout={onLogout}
        onChangeRole={onChangeRole}
        onBackToRoleSelector={onBackToRoleSelector}
      />
      <div className="dashboard-content">
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          userRole={userRole}
        />
        <div className="main-content">
          <div className="section-header">
            <h2>{sections.find(s => s.key === activeSection)?.label || 'Dashboard'}</h2>
          </div>
          <SectionContent
            section={activeSection}
            userRole={userRole}
            user={user}
          />
        </div>
      </div>
    </div>
  )
}
