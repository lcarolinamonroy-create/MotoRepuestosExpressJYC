package com.motorepuestos.backend_spring.repository;

import com.motorepuestos.backend_spring.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
    boolean existsByNombreUsuario(String nombreUsuario);
}
