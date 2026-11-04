# Diagrama de clases del backend

```mermaid
classDiagram
    class Producto {
        -Long id
        -String nombre
        -String categoria
        -Double precio
        -Integer stock
    }

    class Usuario {
        -Long id
        -String nombre
        -String apellido
        -String correo
        -String nombreUsuario
        -String contrasena
    }

    class Pedido {
        -Long id
        -LocalDateTime fecha
        -String estado
        -Double total
        +crearPedido()
    }

    class DetallePedido {
        -Long productoId
        -String nombreProducto
        -Double precioUnitario
        -Integer cantidad
        -Double subtotal
    }

    class ProductoController
    class UsuarioController
    class PedidoController
    class ProductoService
    class UsuarioService
    class PedidoService
    class ProductoJdbcRepository
    class UsuarioRepository
    class PedidoRepository

    Pedido "1" *-- "1..*" DetallePedido
    ProductoController --> ProductoService
    UsuarioController --> UsuarioService
    PedidoController --> PedidoService
    ProductoService --> ProductoJdbcRepository
    UsuarioService --> UsuarioRepository
    PedidoService --> PedidoRepository
    PedidoService --> ProductoService
    DetallePedido --> Producto
```
