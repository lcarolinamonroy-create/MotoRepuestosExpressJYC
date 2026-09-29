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

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody RegistroRequest datos) {
        try {
            usuarioService.registrar(datos);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("mensaje", "Usuario registrado correctamente"));
        } catch (IllegalArgumentException error) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", error.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody Map<String, String> datos) {
        try {
            Usuario usuario = usuarioService.autenticar(
                    datos.get("correo"), datos.get("contrasena")
            );
            return ResponseEntity.ok(Map.of(
                    "mensaje", "Inicio de sesión correcto",
                    "nombre", usuario.getNombre()
            ));
        } catch (IllegalArgumentException error) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", error.getMessage()));
        }
    }
}
