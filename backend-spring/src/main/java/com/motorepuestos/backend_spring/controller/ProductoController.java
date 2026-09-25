package com.motorepuestos.backend_spring.controller;

import com.motorepuestos.backend_spring.model.Producto;
import com.motorepuestos.backend_spring.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Expone los endpoints de productos para el front-end React.
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    /**
     * Consulta todos los productos.
     *
     * URL: GET /api/productos
     */
    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.listarProductos());
    }

    /**
     * Consulta un producto por su identificador.
     *
     * URL: GET /api/productos/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarProducto(@PathVariable Long id) {
        return productoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Crea un producto nuevo.
     *
     * URL: POST /api/productos
     */
    @PostMapping
    public ResponseEntity<Producto> crearProducto(
            @Valid @RequestBody Producto producto) {

        Producto productoGuardado = productoService.guardarProducto(producto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productoGuardado);
    }

    /**
     * Actualiza un producto existente.
     *
     * URL: PUT /api/productos/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long id,
            @Valid @RequestBody Producto datosProducto) {

        return productoService.buscarPorId(id)
                .map(productoExistente -> {
                    productoExistente.setNombre(datosProducto.getNombre());
                    productoExistente.setCategoria(datosProducto.getCategoria());
                    productoExistente.setPrecio(datosProducto.getPrecio());
                    productoExistente.setStock(datosProducto.getStock());

                    return ResponseEntity.ok(
                            productoService.guardarProducto(productoExistente)
                    );
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Elimina un producto.
     *
     * URL: DELETE /api/productos/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        productoService.eliminarProducto(id);

        return ResponseEntity.noContent().build();
    }
}
