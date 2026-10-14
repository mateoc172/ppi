# PPI - Sistema de Seguimiento de Actividades

Aplicación web desarrollada con React, Vite y Supabase para gestionar el seguimiento de horas, evidencias, reportes y perfiles relacionados con actividades de servicio social y alfabetización.

El sistema permite acceder según diferentes roles: estudiante, profesor, directivo y padre de familia.

## ¿Qué problema resuelve?

El proyecto organiza la información de las actividades realizadas por los estudiantes. Permite registrar horas, consultar reportes, cargar evidencias y visualizar información según el tipo de usuario.

## Capturas de pantalla

Actualmente no se incluyen capturas de pantalla. Se pueden agregar posteriormente con esta estructura:

```markdown
![Pantalla de inicio](ruta/de/la/imagen.png)
```

## Tecnologías usadas

- React 19
- Vite
- JavaScript
- Supabase
- Supabase Auth
- Supabase Storage
- Bootstrap 5
- CSS
- Oxlint
- GitHub Codespaces

## Instalación y ejecución

### Requisitos

- Node.js instalado
- npm instalado
- Una cuenta de Supabase, si se desea utilizar la conexión con la base de datos
- Git

### Clonar el proyecto

```bash
git clone URL_DEL_REPOSITORIO
cd NOMBRE_DEL_REPOSITORIO
```

### Entrar a la aplicación React

```bash
cd react-app
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
http://localhost:5173
```

También se puede ejecutar desde GitHub Codespaces utilizando el puerto que indique VS Code.

### Crear una versión de producción

```bash
npm run build
```

### Previsualizar la versión de producción

```bash
npm run preview
```

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` compila `react-app` y publica el sitio al
hacer push a `main`. Vite usa `/ppi/` como ruta base en GitHub Actions, que
corresponde al nombre de este repositorio, y conserva `/` para el desarrollo local.
La aplicación cambia entre secciones dentro de React y no usa rutas en la URL, por
lo que no necesita `HashRouter` ni un archivo `404.html` para rutas internas.

Antes del primer despliegue:

1. En GitHub, abre **Settings → Pages** y selecciona **GitHub Actions** como origen.
2. En **Settings → Secrets and variables → Actions**, agrega `VITE_SUPABASE_URL` y
   `VITE_SUPABASE_ANON_KEY` con los valores de tu proyecto Supabase.
3. Haz push de los cambios a `main` y revisa la ejecución en **Actions**.

La URL esperada para este repositorio es
`https://mateoc172.github.io/ppi/`. La clave `anon` se incluye en el cliente web;
protege los datos con políticas RLS y nunca agregues una clave `service_role`.

### Ejecutar el linter

```bash
npm run lint
```

## Variables de entorno

Para conectar la aplicación con Supabase, se debe crear un archivo `.env` dentro de la carpeta `react-app`:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

No se deben publicar las claves reales en el repositorio.

Si las variables de entorno no están configuradas, la aplicación puede ejecutarse en modo local para realizar demostraciones de autenticación con datos almacenados en `localStorage`.

Usuario demo:

```text
Correo: demo@ppi.com
Contraseña: demo123
```

## Configuración de Supabase

El archivo `supabase-schema.sql`, ubicado en la raíz del proyecto, contiene las tablas y políticas necesarias para Supabase.

Para configurarlo:

1. Crear un proyecto en Supabase.
2. Abrir el SQL Editor de Supabase.
3. Copiar el contenido de `supabase-schema.sql`.
4. Ejecutar el script.
5. Crear el archivo `.env` dentro de `react-app`.
6. Agregar la URL y la clave pública del proyecto.
7. Ejecutar nuevamente la aplicación.

El esquema utiliza las siguientes tablas:

- `perfiles`
- `registros_horas`
- `evidencias`

También configura el bucket de Storage llamado `evidencias`.

## Estructura del proyecto

```text
react-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Evidencias.jsx
│   │   ├── Header.jsx
│   │   ├── Inicio.jsx
│   │   ├── Perfil.jsx
│   │   ├── Registro.jsx
│   │   ├── Reportes.jsx
│   │   ├── RoleSelector.jsx
│   │   ├── SectionContent.jsx
│   │   ├── Sidebar.jsx
│   │   └── Usuarios.jsx
│   ├── config/
│   │   ├── roleConfig.js
│   │   └── supabase.js
│   ├── styles/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

Archivos importantes:

- `src/App.jsx`: controla la autenticación, la sesión, los roles y la navegación principal.
- `src/config/roleConfig.js`: define los roles, permisos y secciones disponibles.
- `src/config/supabase.js`: configura la conexión con Supabase.
- `src/components/Registro.jsx`: permite registrar horas y actividades.
- `src/components/Evidencias.jsx`: permite consultar y cargar evidencias.
- `src/components/Reportes.jsx`: muestra los reportes según el rol.
- `src/components/Usuarios.jsx`: muestra la lista de usuarios.
- `supabase-schema.sql`: contiene la estructura de la base de datos y las políticas de seguridad.

## Roles del sistema

### Estudiante

- Consultar sus evidencias.
- Consultar sus reportes.
- Revisar su perfil.
- Ver el progreso de sus horas de servicio social.

### Profesor

- Registrar horas.
- Consultar evidencias de estudiantes.
- Consultar reportes.
- Ver la lista de estudiantes.
- Revisar información académica.

### Directivo

- Consultar reportes generales.
- Gestionar usuarios.
- Consultar evidencias.
- Revisar estadísticas institucionales.

### Padre de familia

- Consultar los reportes de su hijo o hija.
- Consultar sus evidencias.
- Revisar su perfil.
- Consultar el progreso académico.

## Funcionalidades

- [x] Inicio de sesión con Supabase Auth.
- [x] Registro de usuarios con Supabase.
- [x] Modo demo local utilizando `localStorage`.
- [x] Usuario demo para probar la aplicación.
- [x] Selección de roles.
- [x] Navegación personalizada según el rol.
- [x] Registro de fecha, hora de inicio, hora de término y actividades.
- [x] Consulta de registros de horas almacenados en Supabase.
- [x] Carga de evidencias mediante Supabase Storage.
- [x] Consulta de evidencias.
- [x] Visualización de reportes.
- [x] Visualización de estadísticas de progreso.
- [x] Consulta de perfiles.
- [x] Consulta de usuarios.
- [x] Políticas de seguridad mediante Row Level Security.
- [ ] Relacionar completamente los usuarios de Supabase Auth con los roles del sistema.
- [ ] Implementar la gestión completa de usuarios desde Supabase.
- [ ] Conectar todos los reportes con datos reales de la base de datos.
- [ ] Completar la aprobación y rechazo de evidencias desde el rol de profesor.
- [ ] Definir completamente la relación entre padres, estudiantes y directivos.

## Historias de usuario

### Registro de horas

Como usuario autorizado, quiero registrar la fecha, la hora de inicio, la hora de término y las actividades realizadas para que el sistema guarde mi jornada.

### Carga de evidencias

Como estudiante, quiero subir un archivo y agregar una descripción para respaldar las actividades realizadas.

### Consulta de reportes

Como estudiante, quiero consultar mis horas aprobadas y rechazadas para conocer mi progreso.

Como profesor, quiero consultar los reportes de mis estudiantes para hacer seguimiento a sus actividades.

Como directivo, quiero ver reportes generales para revisar el funcionamiento de la institución.

### Gestión de usuarios

Como directivo, quiero consultar la lista de usuarios y sus roles para administrar el acceso al sistema.

### Consulta del perfil

Como usuario, quiero consultar mis datos personales para verificar que la información registrada sea correcta.

## Base de datos

### `perfiles`

Almacena la información personal de cada usuario:

- Nombre
- Correo electrónico
- Teléfono
- Dirección
- Institución
- Departamento

### `registros_horas`

Almacena la información de las horas realizadas:

- Usuario
- Fecha
- Hora de inicio
- Hora de término
- Actividades realizadas

### `evidencias`

Almacena los archivos que respaldan las actividades:

- Usuario
- Nombre del archivo
- Descripción
- URL del archivo
- Estado de la evidencia
- Fecha de creación

## Seguridad

La base de datos utiliza Row Level Security para controlar el acceso a la información.

Cada usuario puede consultar o modificar únicamente los datos que le corresponden. Los archivos de evidencias se almacenan en Supabase Storage y se utiliza una política que relaciona cada archivo con el usuario autenticado.

## Estado actual del proyecto

El proyecto cuenta con una interfaz funcional para probar los diferentes roles y las principales secciones de la aplicación.

Algunas vistas todavía utilizan datos de ejemplo, especialmente:

- Reportes.
- Usuarios.
- Parte de la información de evidencias.
- Estadísticas mostradas por rol.

La conexión con Supabase ya está preparada para autenticación, registros de horas, perfiles y evidencias.

## Autores

- Nombre del integrante 1
- Nombre del integrante 2
- Nombre del integrante 3
- Nombre del integrante 4

Reemplazar estos datos por los nombres reales y usuarios de GitHub de los integrantes del equipo.

## Licencia

Este proyecto fue desarrollado con fines académicos. Actualmente no cuenta con una licencia de software definida.

## Vista previa del README

Para revisar el resultado del documento en VS Code:

1. Abrir el archivo `README.md`.
2. Presionar `Ctrl + Shift + V`.
3. Revisar que los títulos, listas, enlaces y bloques de código se visualicen correctamente.

## Publicar el README en GitHub

```bash
git add README.md
git commit -m "Agrega README del proyecto"
git push origin main
```
