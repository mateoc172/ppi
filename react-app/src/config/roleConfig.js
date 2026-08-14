// Configuración de roles y permisos
export const ROLE_PERMISSIONS = {
  estudiante: {
    label: 'Estudiante',
    icon: '👨‍🎓',
    color: '#007bff',
    sections: [
      { key: 'inicio', label: 'Inicio', icon: '🏠' },
      { key: 'evidencias', label: 'Mis Evidencias', icon: '📋' },
      { key: 'reportes', label: 'Mis Reportes', icon: '📊' },
      { key: 'perfil', label: 'Mi Perfil', icon: '👤' },
    ],
    permissions: {
      verEvidencias: true,
      verReportes: true,
      registrarHoras: false,
      verUsuarios: false,
      editarUsuarios: false,
      verCalificaciones: true,
    },
    description: 'Acceso a evidencias, reportes y perfil'
  },

  profesor: {
    label: 'Profesor',
    icon: '👨‍🏫',
    color: '#28a745',
    sections: [
      { key: 'inicio', label: 'Inicio', icon: '🏠' },
      { key: 'registro', label: 'Registro de horas', icon: '⏱️' },
      { key: 'evidencias', label: 'Evidencias', icon: '📋' },
      { key: 'reportes', label: 'Reportes', icon: '📊' },
      { key: 'usuarios', label: 'Estudiantes', icon: '👥' },
      { key: 'perfil', label: 'Mi Perfil', icon: '👤' },
    ],
    permissions: {
      verEvidencias: true,
      verReportes: true,
      registrarHoras: true,
      verUsuarios: true,
      editarUsuarios: false,
      verCalificaciones: true,
      calificar: true,
    },
    description: 'Acceso completo a evidencias, horas y estudiantes'
  },

  directivo: {
    label: 'Directivo',
    icon: '👔',
    color: '#dc3545',
    sections: [
      { key: 'inicio', label: 'Inicio', icon: '🏠' },
      { key: 'reportes', label: 'Reportes Generales', icon: '📊' },
      { key: 'usuarios', label: 'Gestión de Usuarios', icon: '👥' },
      { key: 'evidencias', label: 'Evidencias', icon: '📋' },
      { key: 'perfil', label: 'Mi Perfil', icon: '👤' },
    ],
    permissions: {
      verEvidencias: true,
      verReportes: true,
      registrarHoras: false,
      verUsuarios: true,
      editarUsuarios: true,
      verCalificaciones: true,
      verEstadisticas: true,
    },
    description: 'Acceso administrativo a reportes y usuarios'
  },

  padre: {
    label: 'Padre de Familia',
    icon: '👨‍👩‍👧',
    color: '#fd7e14',
    sections: [
      { key: 'inicio', label: 'Inicio', icon: '🏠' },
      { key: 'reportes', label: 'Reportes de mi hijo', icon: '📊' },
      { key: 'evidencias', label: 'Evidencias de mi hijo', icon: '📋' },
      { key: 'perfil', label: 'Mi Perfil', icon: '👤' },
    ],
    permissions: {
      verEvidencias: true,
      verReportes: true,
      registrarHoras: false,
      verUsuarios: false,
      editarUsuarios: false,
      verCalificaciones: true,
      contactarProfesor: true,
    },
    description: 'Acceso al progreso de tu hijo/a'
  },
}

// Función para verificar si un rol tiene permiso
export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.permissions[permission] || false
}

// Función para obtener secciones disponibles para un rol
export const getSectionsByRole = (role) => {
  return ROLE_PERMISSIONS[role]?.sections || []
}

// Función para obtener la información del rol
export const getRoleInfo = (role) => {
  return ROLE_PERMISSIONS[role] || null
}
