# Diagrama de casos de uso

```mermaid
flowchart LR
    CLIENTE((Cliente))
    ADMIN((Administrador))
    SISTEMA((Moto Repuestos Express JYC))

    C1[Consultar productos]
    C2[Filtrar por categoría]
    C3[Registrarse]
    C4[Iniciar sesión]
    C5[Agregar productos al carrito]
    C6[Crear pedido]
    A1[Crear producto]
    A2[Actualizar producto]
    A3[Eliminar producto]

    CLIENTE --> C1
    CLIENTE --> C2
    CLIENTE --> C3
    CLIENTE --> C4
    CLIENTE --> C5
    CLIENTE --> C6
    ADMIN --> A1
    ADMIN --> A2
    ADMIN --> A3
    C1 -.-> SISTEMA
    C2 -.-> SISTEMA
    C3 -.-> SISTEMA
    C4 -.-> SISTEMA
    C5 -.-> SISTEMA
    C6 -.-> SISTEMA
    A1 -.-> SISTEMA
    A2 -.-> SISTEMA
    A3 -.-> SISTEMA
```
