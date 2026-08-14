import { useState } from 'react'
import { getSectionsByRole, getRoleInfo } from '../config/roleConfig'
import Header from './Header'
import SectionContent from './SectionContent'
import Sidebar from './Sidebar'
import '../styles/Dashboard.css'

export default function Dashboard({ user, userRole, onLogout }) {
  const [activeSection, setActiveSection] = useState('inicio')
  const sections = getSectionsByRole(userRole)
  const roleInfo = getRoleInfo(userRole)

  if (!roleInfo) {
    return <div className="error">Error: Rol no válido</div>
  }

  return (
    <div className="dashboard-container">
      <Header user={user} userRole={userRole} onLogout={onLogout} />
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
