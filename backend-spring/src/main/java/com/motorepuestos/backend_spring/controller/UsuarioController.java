package com.motorepuestos.backend_spring.controller;

import com.motorepuestos.backend_spring.model.Usuario;
import com.motorepuestos.backend_spring.service.UsuarioService;
import com.motorepuestos.backend_spring.service.UsuarioService.RegistroRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Controlador encargado del registro y autenticación de usuarios.
 */
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Inyecta el servicio que contiene la lógica de usuarios.
     *
     * @param usuarioService servicio de usuarios
     */
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param datos información enviada desde el formulario de registro
     * @return respuesta de confirmación o error por datos duplicados
     */
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(
            @RequestBody RegistroRequest datos) {

        try {
            usuarioService.registrar(datos);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Map.of(
                            "mensaje",
                            "Usuario registrado correctamente"
                    ));

        } catch (IllegalArgumentException error) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", error.getMessage()));
        }
    }

    /**
     * Valida las credenciales enviadas por el usuario.
     *
     * @param datos mapa con correo y contraseña
     * @return datos básicos del usuario o mensaje de error
     */
    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(
            @RequestBody Map<String, String> datos) {

        try {
            Usuario usuario = usuarioService.autenticar(
                    datos.get("correo"),
                    datos.get("contrasena")
            );

            return ResponseEntity.ok(
                    Map.of(
                            "mensaje",
                            "Inicio de sesión correcto",
                            "nombre",
                            usuario.getNombre()
                    )
            );

        } catch (IllegalArgumentException error) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", error.getMessage()));
        }
    }
}
