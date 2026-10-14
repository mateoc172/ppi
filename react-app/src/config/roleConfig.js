/** Configuracion central de roles, secciones visibles y permisos de la aplicacion. */
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
      contactarProfesor: true,
    },
    description: 'Acceso al progreso de horas y actividades de tu hijo/a'
  },
}

/**
 * Comprueba si un rol tiene un permiso especifico.
 *
 * @param {string} role Identificador del rol.
 * @param {string} permission Nombre del permiso.
 * @returns {boolean} true cuando el permiso esta habilitado.
 */
export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.permissions[permission] || false
}

/**
 * Obtiene las secciones de navegacion disponibles para un rol.
 *
 * @param {string} role Identificador del rol.
 * @returns {Array<Object>} Secciones configuradas o un arreglo vacio.
 */
export const getSectionsByRole = (role) => {
  return ROLE_PERMISSIONS[role]?.sections || []
}

/**
 * Obtiene la configuracion completa de un rol.
 *
 * @param {string} role Identificador del rol.
 * @returns {Object|null} Informacion del rol o null si no existe.
 */
export const getRoleInfo = (role) => {
  return ROLE_PERMISSIONS[role] || null
}
