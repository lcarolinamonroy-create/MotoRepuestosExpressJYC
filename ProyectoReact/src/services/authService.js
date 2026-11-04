// URL base de los endpoints de registro y autenticación de usuarios.
const API_URL = "http://localhost:8080/api/usuarios";

/**
 * Registra un usuario nuevo mediante una solicitud POST.
 *
 * @param {Object} user - Datos del usuario enviados desde el formulario.
 * @returns {Promise<Object>} Respuesta del backend.
 */
export async function registerUser(user) {
  const response = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  // Convierte la respuesta del servidor en un objeto JavaScript.
  const data = await response.json();

  // Si el backend devuelve un error, se informa al componente que realizó la solicitud.
  if (!response.ok) {
    throw new Error(
      data.error || "No fue posible registrar el usuario."
    );
  }

  return data;
}

/**
 * Autentica un usuario utilizando su correo y contraseña.
 *
 * @param {Object} credentials - Credenciales ingresadas por el usuario.
 * @returns {Promise<Object>} Respuesta con el resultado de la autenticación.
 */
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  // Obtiene el mensaje o los datos enviados por el backend.
  const data = await response.json();

  // Maneja credenciales incorrectas u otros errores de autenticación.
  if (!response.ok) {
    throw new Error(
      data.error || "No fue posible iniciar sesión."
    );
  }

  return data;
}
