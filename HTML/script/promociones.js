// Promociones: agrega al carrito una referencia demostrativa.
const promociones = {
  Aceite: { nombre: 'Aceite 20W50 - promoción', precio: '$24.000' },
  Llanta: { nombre: 'Llanta 90/90-17 - promoción', precio: '$102.000' },
  Frenos: { nombre: 'Pastillas de freno - promoción', precio: '$22.500' }
};

function agregarPromocion(boton) {
  const producto = promociones[boton.dataset.producto];
  if (!producto) return;

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));

  boton.textContent = 'Agregado ✓';
  boton.disabled = true;
  alert(`${producto.nombre} fue agregado al carrito.`);
  setTimeout(() => {
    boton.textContent = 'Comprar';
    boton.disabled = false;
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.promo-card .btn-comprar').forEach((boton) => {
    boton.addEventListener('click', () => agregarPromocion(boton));
  });
});
