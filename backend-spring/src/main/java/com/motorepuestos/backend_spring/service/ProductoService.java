package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.Producto;
import com.motorepuestos.backend_spring.repository.ProductoJdbcRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Contiene la lógica de negocio relacionada con los productos.
 */
@Service
public class ProductoService {

    private final ProductoJdbcRepository productoJdbcRepository;

    public ProductoService(ProductoJdbcRepository productoJdbcRepository) {
        this.productoJdbcRepository = productoJdbcRepository;
    }

    /**
     * Consulta todos los productos registrados.
     */
    public List<Producto> listarProductos() {
        return productoJdbcRepository.listarTodos();
    }

    /**
     * Busca un producto por su identificador.
     */
    public Optional<Producto> buscarPorId(Long id) {
        return productoJdbcRepository.buscarPorId(id);
    }

    /**
     * Guarda un producto nuevo o actualiza uno existente.
     */
    public Producto guardarProducto(Producto producto) {
        if (producto.getId() == null) {
            return productoJdbcRepository.insertar(producto);
        }

        return productoJdbcRepository.actualizar(producto);
    }

    /**
     * Elimina un producto por su identificador.
     */
    public void eliminarProducto(Long id) {
        productoJdbcRepository.eliminar(id);
    }
}
