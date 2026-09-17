package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.Producto;
import com.motorepuestos.backend_spring.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Contiene la lógica de negocio relacionada con los productos.
 */
@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /**
     * Consulta todos los productos registrados.
     */
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    /**
     * Busca un producto por su identificador.
     */
    public Optional<Producto> buscarPorId(Long id) {
        return productoRepository.findById(id);
    }

    /**
     * Guarda un producto nuevo o actualiza uno existente.
     */
    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    /**
     * Elimina un producto por su identificador.
     */
    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }
}
