package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.DetallePedido;
import com.motorepuestos.backend_spring.model.Pedido;
import com.motorepuestos.backend_spring.model.Producto;
import com.motorepuestos.backend_spring.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Contiene las reglas de negocio para crear pedidos
 * y actualizar el inventario de productos.
 */
@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoService productoService;

    /**
     * Inyecta los repositorios y servicios necesarios.
     *
     * @param pedidoRepository repositorio de pedidos
     * @param productoService servicio para consultar y actualizar productos
     */
    public PedidoService(
            PedidoRepository pedidoRepository,
            ProductoService productoService) {

        this.pedidoRepository = pedidoRepository;
        this.productoService = productoService;
    }

    /**
     * Valida los productos, calcula el total, descuenta el stock
     * y guarda el pedido dentro de una transacción.
     *
     * @param items productos y cantidades enviados desde el carrito
     * @return pedido registrado
     */
    @Transactional
    public Pedido crearPedido(List<ItemPedidoRequest> items) {

        // Verifica que el pedido tenga al menos un producto.
        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException(
                    "El pedido debe tener al menos un producto"
            );
        }

        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado("PENDIENTE");

        double total = 0;

        // Recorre los productos enviados desde el carrito.
        for (ItemPedidoRequest item : items) {

            // Valida el identificador y la cantidad solicitada.
            if (item.productoId() == null
                    || item.cantidad() == null
                    || item.cantidad() <= 0) {

                throw new IllegalArgumentException(
                        "Cada producto debe tener un identificador "
                                + "y una cantidad válida"
                );
            }

            // Consulta el producto mediante el servicio de productos.
            Producto producto = productoService
                    .buscarPorId(item.productoId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "El producto no existe"
                    ));

            // Verifica que exista suficiente inventario.
            if (producto.getStock() < item.cantidad()) {
                throw new IllegalArgumentException(
                        "Stock insuficiente para: "
                                + producto.getNombre()
                );
            }

            // Calcula el subtotal del producto.
            double subtotal =
                    producto.getPrecio() * item.cantidad();

            // Agrega el detalle al pedido.
            pedido.getDetalles().add(
                    new DetallePedido(
                            producto.getId(),
                            producto.getNombre(),
                            producto.getPrecio(),
                            item.cantidad(),
                            subtotal
                    )
            );

            total += subtotal;

            // Descuenta del inventario la cantidad solicitada.
            producto.setStock(
                    producto.getStock() - item.cantidad()
            );
            productoService.guardarProducto(producto);
        }

        // Guarda el total calculado y persiste el pedido.
        pedido.setTotal(total);

        return pedidoRepository.save(pedido);
    }

    /**
     * Representa un producto solicitado dentro de un pedido.
     *
     * @param productoId identificador del producto
     * @param cantidad cantidad solicitada
     */
    public record ItemPedidoRequest(
            Long productoId,
            Integer cantidad
    ) {
    }
}