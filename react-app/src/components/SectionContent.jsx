import Inicio from './Inicio.jsx'
import Registro from './Registro.jsx'
import Evidencias from './Evidencias.jsx'
import Reportes from './Reportes.jsx'
import Usuarios from './Usuarios.jsx'
import Perfil from './Perfil.jsx'

function SectionContent({ section, userRole, user }) {
  const map = {
    inicio: <Inicio userRole={userRole} user={user} />,
    registro: <Registro userRole={userRole} user={user} />,
    evidencias: <Evidencias userRole={userRole} user={user} />,
    reportes: <Reportes userRole={userRole} user={user} />,
    usuarios: <Usuarios userRole={userRole} user={user} />,
    perfil: <Perfil userRole={userRole} user={user} />,
  }

  return map[section] || <Inicio />
}

export default SectionContent
