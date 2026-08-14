import '../styles/RoleSelector.css'

const ROLES = [
  { id: 'estudiante', label: 'Estudiante', icon: '👨‍🎓', color: '#007bff' },
  { id: 'profesor', label: 'Profesor', icon: '👨‍🏫', color: '#28a745' },
  { id: 'directivo', label: 'Directivo', icon: '👔', color: '#dc3545' },
  { id: 'padre', label: 'Padre de Familia', icon: '👨‍👩‍👧', color: '#fd7e14' },
]

export default function RoleSelector({ onRoleSelect, selectedRole }) {
  return (
    <div className="role-selector-container">
      <div className="role-selector-card">
        <div className="role-selector-header">
          <h1>Software Académico</h1>
          <p>Selecciona tu rol para continuar</p>
        </div>

        <div className="role-options">
          {ROLES.map((role) => (
            <button
              key={role.id}
              className={`role-btn ${selectedRole === role.id ? 'active' : ''}`}
              onClick={() => onRoleSelect(role.id)}
              style={selectedRole === role.id ? { borderColor: role.color } : {}}
            >
              <span className="role-icon">{role.icon}</span>
              <span className="role-label">{role.label}</span>
            </button>
          ))}
        </div>

        {selectedRole && (
          <div className="role-selector-footer">
            <p className="selected-role-text">
              Rol seleccionado: <strong>{ROLES.find(r => r.id === selectedRole)?.label}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
