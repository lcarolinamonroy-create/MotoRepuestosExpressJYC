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

/**
 * Actualiza un producto existente desde el módulo administrativo.
 */
export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  if (!response.ok) {
    throw new Error("No fue posible actualizar el producto.");
  }

  return response.json();
}

/**
 * Elimina un producto desde el módulo administrativo.
 */
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("No fue posible eliminar el producto.");
  }
}
