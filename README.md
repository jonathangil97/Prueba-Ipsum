# Prueba-Ipsum
Documentación del Proyecto NestJS
1. Creación del Proyecto
Crear el Repositorio en Git:

Inicia un nuevo repositorio en GitHub o en tu entorno local para llevar control de versiones del proyecto.
Iniciar el Proyecto con NestJS:

Ejecuta el comando:
bash
Copy code
nest new project-name
Selecciona TypeScript como el lenguaje de programación.

2. Configuración de MongoDB con Docker
Configurar MongoDB con Docker:
Crea un archivo docker-compose.yml con la configuración de MongoDB.
Ejecuta el comando:
bash
Copy code
docker-compose up -d
MongoDB estará corriendo en un contenedor Docker, accesible desde tu proyecto.

3. Configuración de Mongoose
Instalar Mongoose:

Instala Mongoose y los tipos correspondientes:
bash
Copy code
npm install @nestjs/mongoose mongoose
Configurar la URL de Mongoose:

Crea un archivo .env y define la variable de entorno para la conexión de la base de datos:
bash
Copy code
MONGODB_URI=mongodb://localhost:27017/nestjs_project
Configura el módulo de Mongoose en app.module.ts para conectarte a la base de datos usando la variable de entorno.

4. Creación de Esquemas y DTOs
Crear el Esquema de Usuario:

Define el esquema del usuario en user.schema.ts utilizando @Prop para definir las propiedades de cada campo, incluyendo el rol y la contraseña encriptada.
Crear los DTOs:

Crea los Data Transfer Objects (DTOs) para manejar las validaciones de los datos:
CreateUserDto: Para la creación de un usuario.
LoginDto: Para manejar la autenticación.
RegisterUserDto: Para manejar el registro.
Validaciones:

Instala class-validator y class-transformer para las validaciones:
bash
Copy code
npm install class-validator class-transformer
Configura el ValidationPipe global en main.ts para manejar las validaciones.

5. Implementación de la Autenticación
Crear el Módulo de Autenticación:

Crea un nuevo recurso auth con el comando:
bash
Copy code
nest generate resource auth
Encriptar la Contraseña:

Utiliza bcryptjs para encriptar la contraseña antes de guardarla en la base de datos.
Manejo de Errores de Usuario Duplicado:

Implementa la lógica para manejar errores de duplicación de usuarios utilizando try-catch en AuthService.
Generación de JWT:

Configura JWT en el servicio de autenticación y utiliza un AuthGuard para proteger las rutas.
Implementar Login:

Crea el endpoint /login en AuthController para manejar la autenticación de usuarios.

6. Protección de Rutas
Implementar el AuthGuard:

Configura un guard para proteger rutas específicas, verificando la validez del token JWT.
Validar Roles de Usuario:

Modifica el guard para asegurarte de que solo los usuarios con el rol admin puedan acceder a ciertas rutas.
