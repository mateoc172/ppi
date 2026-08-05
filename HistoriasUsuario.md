# Historias de Usuario

## 📌 Roles principales
- **Padres**: ven datos de padres y estudiantes.
- **Estudiantes**: ven perfil, registran horas, suben evidencias y consultan reportes.
- **Directivos**: ven reportes, gestionan registros y usuarios.

## 🗂 Tablas clave
- `padres`
- `estudiantes`
- `directivos`
- `registro`
- `reporte_final`

## 📝 Historias de usuario
| # | Historia | Beneficio |
|---|---|---|
| 1 | Como **Estudiante**, quiero registrar mis horas con fecha, hora de inicio, hora de término y actividades | para que el sistema guarde mi jornada |
| 2 | Como **Estudiante**, quiero subir una evidencia asociada a un registro | para respaldar mi trabajo |
| 3 | Como **Directivo**, quiero ver los reportes finales por estudiante | para aprobar las horas cumplidas |
| 4 | Como **Directivo**, quiero ver la lista de usuarios | para administrar permisos y roles |
| 5 | Como **Estudiante**, quiero ver mi perfil | para comprobar mis datos personales |

## ✅ Criterios de aceptación
### Historia 1 — Registro de horas
- Dado que estoy en **Registro de horas**
- Cuando completo fecha, hora de inicio, hora de término y actividades
- Entonces el registro se guarda y se muestra un mensaje de confirmación

### Historia 2 — Subir evidencia
- Dado que estoy en **Evidencias**
- Cuando selecciono un archivo y escribo una descripción
- Entonces la evidencia se muestra en la lista

### Historia 3 — Ver reportes
- Dado que estoy en **Reportes**
- Cuando veo la lista de reportes
- Entonces veo estudiante, horas cumplidas y estado de aprobación

### Historia 4 — Gestionar usuarios
- Dado que estoy en **Usuarios**
- Cuando veo la lista de usuarios
- Entonces veo nombre y rol de cada usuario

### Historia 5 — Ver perfil
- Dado que estoy en **Perfil**
- Cuando abro mi perfil
- Entonces veo mis datos personales listados

## ⚠️ Deuda de datos
- Falta la tabla `evidencias` para la sección Evidencias
- Falta definir la relación entre Supabase Auth y las tablas `padres`, `estudiantes` y `directivos`
