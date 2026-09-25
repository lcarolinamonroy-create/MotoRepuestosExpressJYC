# Moto Repuestos Express JYC

Aplicación web académica para consultar y gestionar repuestos y accesorios para motocicletas. El proyecto conserva una versión HTML inicial y una versión integrada con React, Spring Boot, Java y MySQL.

La solución está separada en un frontend React y una API REST. El frontend consulta la información de productos y el módulo de administración permite actualizar y eliminar registros almacenados en MySQL.

## Estructura del proyecto

```text
HTML/             Versión HTML inicial del proyecto.
IMG/              Imágenes y recursos visuales.
ProyectoReact/    Frontend desarrollado con React y Vite.
backend-spring/   API REST desarrollada con Java y Spring Boot.
```

## Tecnologías

- Java 21.
- Spring Boot.
- Spring Web.
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

La API devuelve `400 Bad Request` cuando se envían datos inválidos, `404 Not Found` cuando no existe el identificador solicitado, `200 OK` para consultas y actualizaciones exitosas y `204 No Content` después de una eliminación exitosa.

## Funcionalidades

- Catálogo por categorías.
- Productos con precios y fotografías.
- Búsqueda y filtro por categoría.
- Carrito de compras.
- Cálculo del total.
- API REST para consultar y registrar productos.
- Administración de inventario desde React.
- Operaciones CRUD de productos.
- Validación de datos en el backend.
- Rechazo de datos inválidos mediante respuesta HTTP 400.

## Arquitectura

El backend aplica una arquitectura por capas relacionada con MVC:

- `model`: entidad `Producto`.
- `repository`: acceso a datos mediante Spring Data JPA.
- `service`: lógica de negocio.
- `controller`: endpoints REST.
- React: interfaz visual del usuario.

## Versiones del proyecto

- `main`: versión integrada y entregable del proyecto.
- `version-h2`: respaldo de la versión funcional con base de datos H2 en memoria.
- `migracion-mysql`: rama utilizada para realizar la migración y completar el CRUD antes de fusionarla en `main`.

La versión H2 se conserva como respaldo académico. La versión MySQL permite mantener los productos después de reiniciar el backend.

## Pruebas realizadas

Las operaciones principales fueron verificadas en Postman:

- `GET` de todos los productos con respuesta `200 OK`.
- `PUT` de un producto con respuesta `200 OK`.
- `DELETE` de un producto con respuesta `204 No Content`.
- `GET` posterior a la eliminación con respuesta `404 Not Found`.
- Solicitud inválida con precio y stock negativos con respuesta `400 Bad Request`.

También se verificó el módulo `/admin` de React, incluyendo la edición y actualización de un producto desde la interfaz.

## Nota técnica

La autenticación, los pedidos y los pagos todavía corresponden a funcionalidades de continuidad. Para una versión productiva se requiere autenticación segura, control de usuarios, persistencia de pedidos y una pasarela de pagos autorizada.

## Repositorio

[MotoRepuestosExpressJYC](https://github.com/lcarolinamonroy-create/MotoRepuestosExpressJYC)
