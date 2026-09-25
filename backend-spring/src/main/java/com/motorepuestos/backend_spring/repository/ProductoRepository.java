package com.motorepuestos.backend_spring.repository;

import com.motorepuestos.backend_spring.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Permite consultar y administrar productos en la base de datos.
 */
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}

