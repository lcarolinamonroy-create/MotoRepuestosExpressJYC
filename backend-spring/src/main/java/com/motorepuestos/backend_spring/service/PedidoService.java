package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.DetallePedido;
import com.motorepuestos.backend_spring.model.Pedido;
import com.motorepuestos.backend_spring.model.Producto;
import com.motorepuestos.backend_spring.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoService productoService;

    public PedidoService(PedidoRepository pedidoRepository, ProductoService productoService) {
        this.pedidoRepository = pedidoRepository;
        this.productoService = productoService;
    }

    @Transactional
    public Pedido crearPedido(List<ItemPedidoRequest> items) {
        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException("El pedido debe tener al menos un producto");
        }

        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado("PENDIENTE");

        double total = 0;
        for (ItemPedidoRequest item : items) {
            if (item.productoId() == null || item.cantidad() == null || item.cantidad() <= 0) {
                throw new IllegalArgumentException("Cada producto debe tener un identificador y una cantidad válida");
            }

            Producto producto = productoService.buscarPorId(item.productoId())
                    .orElseThrow(() -> new IllegalArgumentException("El producto no existe"));

            if (producto.getStock() < item.cantidad()) {
                throw new IllegalArgumentException("Stock insuficiente para: " + producto.getNombre());
            }

            double subtotal = producto.getPrecio() * item.cantidad();
            pedido.getDetalles().add(new DetallePedido(
                    producto.getId(), producto.getNombre(), producto.getPrecio(),
                    item.cantidad(), subtotal
            ));
            total += subtotal;

            producto.setStock(producto.getStock() - item.cantidad());
            productoService.guardarProducto(producto);
        }

        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }

    public record ItemPedidoRequest(Long productoId, Integer cantidad) {
    }
}
