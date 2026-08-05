import Inicio from './Inicio.jsx'
import Registro from './Registro.jsx'
import Evidencias from './Evidencias.jsx'
import Reportes from './Reportes.jsx'
import Usuarios from './Usuarios.jsx'
import Perfil from './Perfil.jsx'

function SectionContent({ section }) {
  const map = {
    inicio: <Inicio />,
    registro: <Registro />,
    evidencias: <Evidencias />,
    reportes: <Reportes />,
    usuarios: <Usuarios />,
    perfil: <Perfil />,
  }

  return map[section] || <Inicio />
}

export default SectionContent
