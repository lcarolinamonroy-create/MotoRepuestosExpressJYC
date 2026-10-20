package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.Usuario;
import com.motorepuestos.backend_spring.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Contiene las reglas de negocio para registrar y autenticar usuarios.
 */
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // Permite cifrar y verificar las contraseñas de los usuarios.
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    /**
     * Inyecta el repositorio utilizado para consultar y guardar usuarios.
     *
     * @param usuarioRepository repositorio de usuarios
     */
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Valida los datos, cifra la contraseña y registra un nuevo usuario.
     *
     * @param datos información enviada desde el formulario de registro
     * @return usuario guardado
     */
    public Usuario registrar(RegistroRequest datos) {

        // Evita registrar dos usuarios con el mismo correo.
        if (usuarioRepository.existsByCorreo(datos.correo())) {
            throw new IllegalArgumentException(
                    "El correo ya está registrado"
            );
        }

        // Evita repetir nombres de usuario.
        if (usuarioRepository.existsByNombreUsuario(
                datos.nombreUsuario())) {

            throw new IllegalArgumentException(
                    "El nombre de usuario ya está registrado"
            );
        }

        Usuario usuario = new Usuario();

        // Asigna la información personal y de acceso del usuario.
        usuario.setNombre(datos.nombre());
        usuario.setApellido(datos.apellido());
        usuario.setTipoDocumento(datos.tipoDocumento());
        usuario.setNumeroDocumento(datos.numeroDocumento());
        usuario.setTelefono(datos.telefono());
        usuario.setCorreo(datos.correo());
        usuario.setNombreUsuario(datos.nombreUsuario());

        // La contraseña se almacena cifrada mediante BCrypt.
        usuario.setContrasena(
                passwordEncoder.encode(datos.contrasena())
        );

        return usuarioRepository.save(usuario);
    }

    /**
     * Busca el usuario por correo y verifica su contraseña.
     *
     * @param correo correo ingresado por el usuario
     * @param contrasena contraseña ingresada por el usuario
     * @return usuario autenticado
     */
    public Usuario autenticar(
            String correo,
            String contrasena) {

        // Busca el usuario registrado con el correo recibido.
        Usuario usuario = usuarioRepository
                .findByCorreo(correo)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Credenciales incorrectas"
                ));

        // Compara la contraseña ingresada con la contraseña cifrada.
        if (!passwordEncoder.matches(
                contrasena,
                usuario.getContrasena())) {

            throw new IllegalArgumentException(
                    "Credenciales incorrectas"
            );
        }

        return usuario;
    }

    /**
     * Contiene los datos necesarios para registrar un usuario.
     *
     * @param nombre nombre del usuario
     * @param apellido apellido del usuario
     * @param tipoDocumento tipo de documento
     * @param numeroDocumento número de documento
     * @param telefono teléfono de contacto
     * @param correo correo electrónico
     * @param nombreUsuario nombre de usuario
     * @param contrasena contraseña de acceso
     */
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