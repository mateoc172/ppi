const usuarios = [
  { id: 1, nombre: 'Ana Gómez', rol: 'Estudiante' },
  { id: 2, nombre: 'Luis Martínez', rol: 'Padre' },
  { id: 3, nombre: 'Carolina Díaz', rol: 'Directivo' },
]

export default function Usuarios() {
  return (
    <section className="section-card">
      <h2>Usuarios</h2>
      <p>Administración básica de usuarios registrada en el sistema.</p>
      <div className="section-list">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="section-item shadow-sm">
            <strong>{usuario.nombre}</strong>
            <p>Rol: {usuario.rol}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
