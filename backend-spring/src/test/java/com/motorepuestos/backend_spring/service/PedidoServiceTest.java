package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.Pedido;
import com.motorepuestos.backend_spring.model.Producto;
import com.motorepuestos.backend_spring.repository.PedidoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private ProductoService productoService;

    @InjectMocks
    private PedidoService pedidoService;

    @Test
    void debeCrearPedidoCalcularTotalYDescontarStock() {
        Producto producto = new Producto("Kit de arrastre", "Transmisión", 185000.0, 5);
        producto.setId(2L);
        when(productoService.buscarPorId(2L)).thenReturn(Optional.of(producto));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Pedido resultado = pedidoService.crearPedido(
                List.of(new PedidoService.ItemPedidoRequest(2L, 2))
        );

        assertEquals("PENDIENTE", resultado.getEstado());
        assertEquals(370000.0, resultado.getTotal());
        assertEquals(1, resultado.getDetalles().size());
        assertEquals(3, producto.getStock());
        verify(productoService).guardarProducto(producto);
        verify(pedidoRepository).save(any(Pedido.class));
    }

    @Test
    void noDebeCrearPedidoSinProductos() {
        assertThrows(IllegalArgumentException.class, () -> pedidoService.crearPedido(List.of()));
    }

    @Test
    void noDebeCrearPedidoSinStockSuficiente() {
        Producto producto = new Producto("Pastillas", "Frenos", 45000.0, 1);
        producto.setId(1L);
        when(productoService.buscarPorId(1L)).thenReturn(Optional.of(producto));

        assertThrows(
                IllegalArgumentException.class,
                () -> pedidoService.crearPedido(
                        List.of(new PedidoService.ItemPedidoRequest(1L, 2))
                )
        );
    }
}
