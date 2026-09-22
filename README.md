# Moto Repuestos Express JYC

Aplicación web académica para consultar y gestionar repuestos y accesorios para motocicletas. El proyecto conserva una versión HTML inicial y una versión integrada con React, Java, Spring Boot y MySQL.

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

Configurar las credenciales en `backend-spring/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/motorepuestos?useSSL=false&serverTimezone=America/Bogota&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=TU_CONTRASENA
spring.jpa.hibernate.ddl-auto=update
```

No se debe publicar la contraseña real en GitHub. Para cada equipo se debe utilizar una contraseña local.

## Ejecutar el backend

Abrir PowerShell en la carpeta `backend-spring` y ejecutar:

```powershell
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

El backend debe estar ejecutándose antes de abrir el catálogo React.

## Endpoints principales

```text
GET  /api/productos       Consultar todos los productos.
GET  /api/productos/{id}  Consultar un producto por identificador.
POST /api/productos       Registrar un producto.
```

## Funcionalidades

- Catálogo por categorías.
- Productos con precios y fotografías.
- Búsqueda y filtro por categoría.
- Carrito de compras.
- Cálculo del total.
- API REST para consultar y registrar productos.
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

- `version-h2`: respaldo de la versión funcional con base de datos H2 en memoria.
- `migracion-mysql`: versión actual conectada a MySQL.

La versión H2 se conserva como respaldo académico. La versión MySQL permite mantener los productos después de reiniciar el backend.

## Nota técnica

La autenticación, los pedidos y los pagos todavía corresponden a funcionalidades de continuidad. Para una versión productiva se requiere autenticación segura, control de usuarios, persistencia de pedidos y una pasarela de pagos autorizada.

## Repositorio

https://github.com/lcarolinamonroy-create/MotoRepuestosExpressJYC
