package com.motorepuestos.backend_spring.repository;

import com.motorepuestos.backend_spring.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
