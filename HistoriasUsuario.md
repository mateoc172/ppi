# Taller: De mapa del sitio + Supabase + login → Historias de Usuario

**Duración total:** ~1h30min (ajustable)
**Modalidad:** Grupos de 3-4 estudiantes, cada grupo trabaja sobre su propio proyecto

## Objetivo
Que cada grupo termine con un backlog inicial de historias de usuario trazables a pantallas concretas del sitio y a tablas concretas de Supabase, listo para empezar a desarrollar.

---

## 0. Marco teórico rápido (15 min)

- **Formato historia de usuario:** Como [rol/actor], quiero [acción/funcionalidad], para [beneficio/objetivo]
- **Criterios de aceptación:** en formato Gherkin: `Dado [contexto], cuando [acción], entonces [resultado esperado]`
- **INVEST:** Independiente, Negociable, Valiosa, Estimable, Small, Testeable
- Idea clave: el mapa del sitio te da las pantallas, Supabase te da los datos, y el cruce entre ambos te da las historias.

---

## Actividad 1 — Inventario de lo que ya existe (20 min)

Rellenar usando lo que YA tienen (no lo que falta):

### 1A. Roles/actores (extraído del proyecto)
- `Padres`: se loguean con id/contraseña — acceso de lectura a `padres`, `estudiantes`.
- `Estudiantes`: se loguean con id/contraseña — acceso de lectura a `estudiantes`, `registro`, `reporte_final`.
- `Directivos`: se loguean con id/contraseña — acceso completo (create/update/delete) a todas las tablas.

### 1B. Tablas de Supabase (extraído de `BS.SQL`)
- `padres` (id, nombre, contrasena)
- `estudiantes` (id, nombre, contrasena, id_padre)
- `directivos` (id, nombre, contrasena)
- `registro` (id, hora_de_inicio, hora_de_termino, actividades_desarrolladas, total_de_horas_acumuladas, total_de_horas_por_dia, fecha_de_servicio_prestado, id_directivo, id_estudiante)
- `reporte_final` (id, total_de_horas_cumplidas, aprobacion, id_estudiante)

### 1C. Pantallas del mapa del sitio (detectadas en `App.jsx`)
- `inicio`
- `registro` (Registro de horas)
- `evidencias`
- `reportes`
- `usuarios`
- `perfil`

> 🎯 Este inventario es el insumo directo para las siguientes actividades. Nadie avanza sin llenarlo.

---

## Actividad 2 — De pantallas a historias de usuario (30 min)

Para cada pantalla del sitemap, redactar al menos una historia. Regla: no mencionar pantallas que no estén en el sitemap ni datos que no existan en Supabase. Si falta un dato, anotarlo en "Deuda de datos".

Ejemplos (por pantalla):
- `perfil` (tabla: `estudiantes` / `padres`)
  - Historia: Como `Estudiante`, quiero ver mi perfil con nombre y horas acumuladas, para revisar mi progreso.
- `registro` (tabla: `registro`)
  - Historia: Como `Estudiante`, quiero crear un registro de jornada con hora de inicio/fin y actividades, para que se contabilicen mis horas.
- `evidencias` (sin tabla en `BS.SQL`)
  - Historia: Como `Estudiante`, quiero subir una evidencia (foto/documento) asociada a un `registro`, para respaldar mi jornada.
  - Deuda: falta tabla `evidencias`.
- `reportes` (tabla: `reporte_final`)
  - Historia: Como `Directivo`, quiero ver los reportes finales por estudiante para validar y aprobar las horas cumplidas.
- `usuarios` (tablas: `padres`, `estudiantes`, `directivos`)
  - Historia: Como `Directivo`, quiero listar y gestionar usuarios para administrar permisos y registros.

---

## Actividad 3 — De tablas Supabase a historias CRUD (30 min)

Para cada tabla importante, listar Create/Read/Update/Delete y decidir si cada operación necesita su propia historia.

Ejemplos resumidos:
- `registro` — Create: estudiante crea registro; Read: directivo consulta; Update/Delete: directivo.
- `reporte_final` — Create: generado al finalizar; Read: directivo; Update: directivo (aprobación); Delete: admin si aplica.

Preguntas guía: ¿esta operación la puede hacer cualquier rol o solo algunos? Esto conecta con RLS.

---

## Actividad 4 — Criterios de aceptación (30 min)

Tomar 5 historias importantes y escribir criterios en Gherkin.

Ejemplos:

Historia: Como `Estudiante`, quiero editar mi nombre y foto de perfil, para que mi información esté actualizada.

Criterio 1:
  Dado que estoy en `/perfil` y he iniciado sesión
  Cuando cambio mi nombre y presiono "Guardar"
  Entonces el campo `name` en la tabla `estudiantes` se actualiza y veo un mensaje de confirmación

Criterio 2 (error):
  Dado que estoy en `/perfil`
  Cuando dejo el nombre vacío y presiono "Guardar"
  Entonces no se guarda el cambio y veo un mensaje de error

Otro ejemplo — Crear registro:

Historia: Como `Estudiante`, quiero crear un registro de jornada, para que se cuenten mis horas.

Criterio 1:
  Dado que estoy autenticado en `/registro`
  Cuando completo hora_inicio, hora_termino y actividades y presiono "Guardar"
  Entonces se crea una fila en `registro` asociada a mi `id_estudiante` y veo confirmación

Criterio 2 (validación):
  Dado que estoy en `/registro`
  Cuando hora_inicio >= hora_termino
  Entonces se muestra un mensaje de validación y no se guarda

---

## Actividad 5 — Priorización y backlog (20 min)

Clasificar historias usando MoSCoW y armar Sprint 1/2/3.

Sugerencia de priorización:
- Must: Login, navegación básica, ver perfil, crear registro, ver reportes.
- Should: Editar perfil, subir evidencias, gestión básica de usuarios.
- Could: Exportar reportes, filtros avanzados.
- Won't: Integraciones externas en Sprint 1.

---

## Actividad 6 — Revisión cruzada entre grupos (15 min)

Lista de verificación para revisores:
1. ¿Cada historia tiene un rol claro (no "el usuario" genérico)?
2. ¿Se puede rastrear a una pantalla real del sitemap?
3. ¿Se puede rastrear a una tabla/campo real de Supabase?
4. ¿Alguna historia son dos historias mezcladas?
5. ¿Falta alguna historia obvia (login, logout, recuperar contraseña, 404)?

---

## Cierre — "Deuda de datos" (5 min)

Cada grupo anota qué historias necesitan una tabla/campo que todavía no existe.

Ejemplos detectados en este proyecto:
- Falta la tabla `evidencias` para la pantalla `evidencias`.
- Falta campo `email`/`uid` en `padres`, `estudiantes`, `directivos` para mapear con Supabase Auth (las tablas actuales usan `nombre` y `contrasena`).
- Decidir estrategia: usar `auth.users` de Supabase o mantener tablas propias con `auth.uid`.

---

## Entregable final del taller
1. Tabla de inventario (Actividad 1)
2. Backlog de historias de usuario con formato estándar (Actividades 2+3)
3. 5 historias con criterios de aceptación completos (Actividad 4)
4. Backlog priorizado (MoSCoW) organizado en sprints (Actividad 5)
5. Lista de "deuda de datos"

Con esto tienen el punto de partida para empezar a codear: saben qué pantalla construir primero, qué tabla de Supabase usar, y cómo validar que "ya funciona".
