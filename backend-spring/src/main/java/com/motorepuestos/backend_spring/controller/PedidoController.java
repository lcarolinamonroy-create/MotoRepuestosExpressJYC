package com.motorepuestos.backend_spring.controller;

import com.motorepuestos.backend_spring.model.Pedido;
import com.motorepuestos.backend_spring.service.PedidoService;
import com.motorepuestos.backend_spring.service.PedidoService.ItemPedidoRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controlador encargado de recibir las solicitudes relacionadas con los pedidos.
 */
@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    private final PedidoService pedidoService;

    /**
     * Inyecta el servicio que contiene la lógica de creación de pedidos.
     *
     * @param pedidoService servicio de pedidos
     */
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    /**
     * Registra un pedido recibido desde el carrito de React.
     *
     * @param items productos y cantidades incluidos en el pedido
     * @return pedido creado o mensaje de error
     */
    @PostMapping
    public ResponseEntity<?> crearPedido(
            @RequestBody List<ItemPedidoRequest> items) {

        try {
            Pedido pedido = pedidoService.crearPedido(items);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(pedido);

        } catch (IllegalArgumentException error) {
            return ResponseEntity
                    .badRequest()
                    .body(error.getMessage());
        }
    }
}