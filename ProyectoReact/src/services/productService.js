// Servicio encargado de comunicarse con la API de productos.
const API_URL = "http://localhost:8080/api/productos";

/**
 * Consulta los productos registrados en Spring Boot.
 */
export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No fue posible consultar los productos.");
  }

  return response.json();
}