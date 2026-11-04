# Moto Repuestos Express JYC

Aplicación web académica para consultar y gestionar repuestos y accesorios para motocicletas. La versión final de entrega está integrada con React, Spring Boot, Java, Maven y MySQL.

La solución está separada en un frontend React y una API REST. El frontend consulta la información de productos y el módulo de administración permite actualizar y eliminar registros almacenados en MySQL. Las carpetas HTML y los respaldos de versiones anteriores son antecedentes del proyecto y no forman parte de la arquitectura activa de entrega.

## Framework web utilizado

Para el desarrollo de la aplicación web se utilizó React con Vite en el frontend y Spring Boot en el backend.

React permite construir la interfaz mediante componentes reutilizables, mientras que Spring Boot expone los servicios REST que se conectan con MySQL.

## Estructura del proyecto

```text
MotoRepuestosExpress/
├── backend-spring/
│   ├── src/main/java/com/motorepuestos/backend_spring/
│   │   ├── controller/       Endpoints REST.
│   │   ├── model/            Entidades del sistema.
│   │   ├── repository/       Persistencia JDBC y repositorios.
│   │   └── service/          Lógica de negocio.
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── ProyectoReact/
│   ├── src/components/       Componentes reutilizables.
│   ├── src/context/          Estado global del carrito.
│   ├── src/pages/            Pantallas de la aplicación.
│   ├── src/services/         Comunicación con la API.
│   ├── public/IMG/           Imágenes del frontend.
│   ├── package.json
│   └── package-lock.json
├── HTML/                     Versión HTML inicial.
├── IMG/                      Recursos visuales originales.
├── README.md
└── .gitignore
```

## Tecnologías

- Java 21.
- Spring Boot.
- Spring Web.
- Spring JDBC.
- Spring Data JPA e Hibernate.
- MySQL.
- React y Vite.
- Maven Wrapper.
- Git y GitHub.

## Requisitos

- JDK 21.
- Node.js y npm.
- MySQL Server y MySQL Workbench.
- Visual Studio Code u otro IDE compatible.

## Configuración de MySQL

Crear la base de datos y la tabla de productos en MySQL Workbench:

```sql
CREATE DATABASE IF NOT EXISTS motorepuestos;
USE motorepuestos;

CREATE TABLE IF NOT EXISTS producto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);
```

El archivo `backend-spring/src/main/resources/application.properties` utiliza la variable de entorno `DB_PASSWORD` para evitar publicar la contraseña en GitHub:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/motorepuestos?useSSL=false&serverTimezone=America/Bogota&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

En Windows PowerShell, definir la contraseña solamente en la terminal actual:

```powershell
$env:DB_PASSWORD="TU_CONTRASENA_LOCAL"
```

No se debe publicar la contraseña real en GitHub ni escribirla directamente en `application.properties`.

## Ejecutar el backend

Abrir PowerShell en la carpeta `backend-spring` y ejecutar:

```powershell
$env:DB_PASSWORD="TU_CONTRASENA_LOCAL"
.\mvnw.cmd compile
.\mvnw.cmd spring-boot:run
```

La API queda disponible en:

```text
http://localhost:8080/api/productos
```

## Ejecutar el frontend React

Abrir otra terminal en la carpeta `ProyectoReact` y ejecutar:

```powershell
npm install
npm run dev
```

La aplicación queda disponible en:

```text
http://localhost:5173/productos
```

El módulo de administración se encuentra en:

```text
http://localhost:5173/admin
```

El backend debe estar ejecutándose antes de abrir el catálogo React. Se deben utilizar dos terminales: una para Spring Boot y otra para Vite.

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Consultar todos los productos. |
| GET | `/api/productos/{id}` | Consultar un producto por identificador. |
| POST | `/api/productos` | Registrar un producto. |
| PUT | `/api/productos/{id}` | Actualizar un producto existente. |
| DELETE | `/api/productos/{id}` | Eliminar un producto. |
| POST | `/api/pedidos` | Crear un pedido desde el carrito y descontar el stock. |
| POST | `/api/usuarios/registro` | Registrar un usuario nuevo. |
| POST | `/api/usuarios/login` | Validar las credenciales de un usuario. |

La API devuelve `400 Bad Request` cuando se envían datos inválidos, `404 Not Found` cuando no existe el identificador solicitado, `200 OK` para consultas y actualizaciones exitosas y `204 No Content` después de una eliminación exitosa.

## Persistencia mediante JDBC

El módulo de productos utiliza `JdbcTemplate` para realizar las operaciones directamente sobre MySQL mediante consultas SQL parametrizadas. Las operaciones implementadas son:

- `SELECT` para consultar productos.
- `INSERT` para registrar productos.
- `UPDATE` para actualizar productos.
- `DELETE` para eliminar productos.

Los módulos de pedidos y usuarios conservan Spring Data JPA para manejar sus entidades relacionadas. De esta manera, el proyecto demuestra tanto el uso explícito de JDBC solicitado para el módulo de productos como la persistencia por capas utilizada en las funcionalidades complementarias.

## Funcionalidades

- Catálogo por categorías.
- Productos con precios y fotografías.
- Búsqueda y filtro por categoría.
- Carrito de compras.
- Cálculo del total.
- API REST para consultar, registrar, actualizar y eliminar productos.
- Administración de inventario desde React.
- Operaciones CRUD de productos.
- Registro e inicio de sesión de usuarios.
- Contraseñas cifradas con BCrypt.
- Carrito con cantidades y cálculo de totales.
- Registro de pedidos en MySQL.
- Descuento automático del stock al confirmar un pedido.
- Validación de datos en el backend.
- Rechazo de datos inválidos mediante respuesta HTTP 400.

## Arquitectura

El backend aplica una arquitectura por capas relacionada con MVC:

- `model`: entidad `Producto`.
- `repository`: acceso a datos mediante JDBC para productos y Spring Data JPA para pedidos y usuarios.
- `service`: lógica de negocio.
- `controller`: endpoints REST.
- `JdbcTemplate`: conexión y ejecución de consultas SQL del módulo de productos.
- React: interfaz visual del usuario.

## Estándares de codificación

El código aplica convenciones de nombramiento para facilitar su lectura y mantenimiento:

- Las clases utilizan PascalCase: `Producto`, `ProductoService`, `ProductoController` y `ProductoJdbcRepository`.
- Los métodos utilizan camelCase y describen su acción: `listarProductos`, `buscarPorId`, `guardarProducto` y `eliminarProducto`.
- Las variables utilizan camelCase: `producto`, `jdbcTemplate`, `resultSet` y `keyHolder`.
- Los paquetes se escriben en minúscula y siguen una estructura organizada: `controller`, `model`, `repository` y `service`.
- Los nombres se relacionan con la responsabilidad de cada clase, método o variable.
- Las clases y métodos principales contienen comentarios que explican su propósito.

## Versiones del proyecto

- `main`: versión estable publicada del proyecto.
- `aa2-ev01-jdbc`: versión utilizada para implementar y probar el acceso JDBC del módulo de productos.
- `migracion-mysql`: rama utilizada durante la migración de H2 a MySQL.

La versión final utiliza exclusivamente MySQL. H2 no forma parte de las dependencias, la configuración ni la ejecución actual del backend.

## Pruebas realizadas

Las operaciones principales fueron verificadas en Postman:

- `GET` de todos los productos con respuesta `200 OK`.
- `PUT` de un producto con respuesta `200 OK`.
- `DELETE` de un producto con respuesta `204 No Content`.
- Validación de registro con datos inválidos y respuesta `400 Bad Request`.
- Registro exitoso de usuario con respuesta `201 Created`.
- Inicio de sesión correcto con respuesta `200 OK`.
- Rechazo de credenciales incorrectas con respuesta `401 Unauthorized`.
- Rechazo de correo duplicado con respuesta `409 Conflict`.
- Creación de pedido con respuesta `201 Created` y actualización del stock.
- CRUD de productos ejecutado mediante JDBC y probado con Postman.

También se verificó el módulo `/admin` de React, incluyendo la edición y actualización de un producto desde la interfaz.

## Nota técnica

La versión actual implementa registro, autenticación básica mediante correo y contraseña cifrada con BCrypt, persistencia de pedidos y descuento de inventario. La recuperación de contraseña mediante correo y token, la autenticación mediante JWT, la autorización avanzada por roles y la integración con una pasarela de pagos se consideran mejoras futuras para una versión productiva.

## Repositorio

[MotoRepuestosExpressJYC](https://github.com/lcarolinamonroy-create/MotoRepuestosExpressJYC)
