package com.motorepuestos.backend_spring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/** Representa un producto incluido dentro de un pedido. */
@Entity
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productoId;
    private String nombreProducto;
    private Double precioUnitario;
    private Integer cantidad;
    private Double subtotal;

    public DetallePedido() {
    }

    public DetallePedido(Long productoId, String nombreProducto, Double precioUnitario,
                         Integer cantidad, Double subtotal) {
        this.productoId = productoId;
        this.nombreProducto = nombreProducto;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }

    public Long getId() { return id; }
    public Long getProductoId() { return productoId; }
    public String getNombreProducto() { return nombreProducto; }
    public Double getPrecioUnitario() { return precioUnitario; }
    public Integer getCantidad() { return cantidad; }
    public Double getSubtotal() { return subtotal; }
}
