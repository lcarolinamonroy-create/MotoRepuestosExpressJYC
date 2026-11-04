package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.Producto;
import com.motorepuestos.backend_spring.repository.ProductoJdbcRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock
    private ProductoJdbcRepository productoJdbcRepository;

    @InjectMocks
    private ProductoService productoService;

    @Test
    void debeListarProductos() {
        Producto producto = new Producto("Pastillas", "Frenos", 45000.0, 10);
        when(productoJdbcRepository.listarTodos()).thenReturn(List.of(producto));

        List<Producto> resultado = productoService.listarProductos();

        assertEquals(1, resultado.size());
        assertEquals("Pastillas", resultado.get(0).getNombre());
        verify(productoJdbcRepository).listarTodos();
    }

    @Test
    void debeInsertarProductoNuevo() {
        Producto producto = new Producto("Aceite", "Lubricantes", 42000.0, 8);
        when(productoJdbcRepository.insertar(producto)).thenReturn(producto);

        Producto resultado = productoService.guardarProducto(producto);

        assertEquals("Aceite", resultado.getNombre());
        verify(productoJdbcRepository).insertar(producto);
    }

    @Test
    void debeActualizarProductoExistente() {
        Producto producto = new Producto("Kit de arrastre", "Transmisión", 185000.0, 5);
        producto.setId(1L);
        when(productoJdbcRepository.actualizar(producto)).thenReturn(producto);

        Producto resultado = productoService.guardarProducto(producto);

        assertEquals(1L, resultado.getId());
        verify(productoJdbcRepository).actualizar(producto);
    }

    @Test
    void debeBuscarProductoPorId() {
        Producto producto = new Producto("Filtro", "Filtros", 28000.0, 15);
        when(productoJdbcRepository.buscarPorId(1L)).thenReturn(Optional.of(producto));

        Optional<Producto> resultado = productoService.buscarPorId(1L);

        assertEquals("Filtro", resultado.orElseThrow().getNombre());
        verify(productoJdbcRepository).buscarPorId(1L);
    }
}
