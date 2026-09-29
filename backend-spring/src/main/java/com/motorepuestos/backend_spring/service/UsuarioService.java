package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.Usuario;
import com.motorepuestos.backend_spring.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario registrar(RegistroRequest datos) {
        if (usuarioRepository.existsByCorreo(datos.correo())) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }
        if (usuarioRepository.existsByNombreUsuario(datos.nombreUsuario())) {
            throw new IllegalArgumentException("El nombre de usuario ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(datos.nombre());
        usuario.setApellido(datos.apellido());
        usuario.setTipoDocumento(datos.tipoDocumento());
        usuario.setNumeroDocumento(datos.numeroDocumento());
        usuario.setTelefono(datos.telefono());
        usuario.setCorreo(datos.correo());
        usuario.setNombreUsuario(datos.nombreUsuario());
        usuario.setContrasena(passwordEncoder.encode(datos.contrasena()));
        return usuarioRepository.save(usuario);
    }

    public Usuario autenticar(String correo, String contrasena) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new IllegalArgumentException("Credenciales incorrectas"));

        if (!passwordEncoder.matches(contrasena, usuario.getContrasena())) {
            throw new IllegalArgumentException("Credenciales incorrectas");
        }

        return usuario;
    }

    public record RegistroRequest(
            String nombre,
            String apellido,
            String tipoDocumento,
            String numeroDocumento,
            String telefono,
            String correo,
            String nombreUsuario,
            String contrasena
    ) {
    }
}
