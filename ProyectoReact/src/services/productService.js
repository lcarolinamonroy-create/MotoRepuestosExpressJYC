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

/** Registra un pedido y descuenta las cantidades del inventario. */
export async function createOrder(items) {
  const response = await fetch("http://localhost:8080/api/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(items)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "No fue posible registrar el pedido.");
  }

  return response.json();
}
