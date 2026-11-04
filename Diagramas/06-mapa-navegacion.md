# Mapa de navegación

```mermaid
flowchart TD
    INICIO[Inicio /]
    INICIO --> PRODUCTOS[/productos]
    INICIO --> PROMO[/promociones]
    INICIO --> LOGIN[/login]
    INICIO --> REGISTRO[/registro]
    INICIO --> CARRITO[/carrito]
    INICIO --> ADMIN[/admin]
    LOGIN --> RECUPERAR[/recuperar]
    LOGIN --> INICIO
    REGISTRO --> LOGIN
    PRODUCTOS --> CARRITO
    CARRITO --> PEDIDO[Finalizar compra]
    PEDIDO --> CARRITO
    ADMIN --> PRODUCTOS
```

Las rutas son administradas por React Router y consumen la API REST de Spring Boot cuando necesitan datos persistidos.
