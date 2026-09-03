// Navegación desde las tarjetas de categorías del inicio.
document.querySelectorAll(".btn-producto").forEach(boton => {
  boton.addEventListener("click", () => {
    const categoria = boton.dataset.categoria;
    window.location.href = `productos.html?categoria=${encodeURIComponent(categoria)}`;
  });
});

// Mantiene visible la cantidad de artículos del carrito en todas las páginas
// que tengan un elemento .cart-count.
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  document.querySelectorAll(".cart-count").forEach(contador => {
    contador.textContent = carrito.length;
  });
}

actualizarContadorCarrito();
