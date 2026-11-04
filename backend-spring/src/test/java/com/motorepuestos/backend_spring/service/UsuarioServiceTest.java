package com.motorepuestos.backend_spring.service;

import com.motorepuestos.backend_spring.model.Usuario;
import com.motorepuestos.backend_spring.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    void debeRegistrarUsuarioConContrasenaCifrada() {
        UsuarioService.RegistroRequest datos = datosRegistro();
        when(usuarioRepository.existsByCorreo(datos.correo())).thenReturn(false);
        when(usuarioRepository.existsByNombreUsuario(datos.nombreUsuario())).thenReturn(false);
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Usuario resultado = usuarioService.registrar(datos);

        assertNotEquals(datos.contrasena(), resultado.getContrasena());
        assertTrue(passwordEncoder.matches(datos.contrasena(), resultado.getContrasena()));
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void noDebeRegistrarCorreoDuplicado() {
        UsuarioService.RegistroRequest datos = datosRegistro();
        when(usuarioRepository.existsByCorreo(datos.correo())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> usuarioService.registrar(datos));
    }

    @Test
    void debeAutenticarUsuarioConCredencialesCorrectas() {
        Usuario usuario = new Usuario();
        usuario.setCorreo("usuario@correo.com");
        usuario.setContrasena(passwordEncoder.encode("Moto12345"));
        when(usuarioRepository.findByCorreo(usuario.getCorreo())).thenReturn(Optional.of(usuario));

        Usuario resultado = usuarioService.autenticar(usuario.getCorreo(), "Moto12345");

        assertTrue(resultado == usuario);
    }

    @Test
    void debeRechazarContrasenaIncorrecta() {
        Usuario usuario = new Usuario();
        usuario.setCorreo("usuario@correo.com");
        usuario.setContrasena(passwordEncoder.encode("Moto12345"));
        when(usuarioRepository.findByCorreo(usuario.getCorreo())).thenReturn(Optional.of(usuario));

        assertThrows(
                IllegalArgumentException.class,
                () -> usuarioService.autenticar(usuario.getCorreo(), "incorrecta")
        );
    }

    private UsuarioService.RegistroRequest datosRegistro() {
        return new UsuarioService.RegistroRequest(
                "Usuario", "Prueba", "CC", "1000000001",
                "3000000000", "usuario@correo.com", "usuario2026", "Moto12345"
        );
    }
}
