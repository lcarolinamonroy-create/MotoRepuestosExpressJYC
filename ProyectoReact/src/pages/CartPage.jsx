import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../cart.css";
import { createOrder } from "../services/productService";

// Muestra el contenido del carrito y permite finalizar la compra.
export default function CartPage() {
  // Obtiene los productos y las acciones disponibles en el carrito global.
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    cartTotal
  } = useCart();

  // Indica si el pedido está siendo enviado al backend.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convierte el contenido del carrito al formato requerido por la API de pedidos.
  async function handleCheckout() {
    try {
      setIsSubmitting(true);

      const items = cartItems.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad
      }));

      // Registra el pedido y descuenta el stock en el backend.
      const order = await createOrder(items);

      // Limpia el carrito después de registrar correctamente el pedido.
      clearCart();

      alert(`Pedido #${order.id} registrado correctamente.`);
    } catch (error) {
      // Muestra el mensaje cuando ocurre un error al registrar el pedido.
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Renderiza los productos, cantidades, totales y acciones del carrito.
  return (
    <main>
      <h1>Carrito de compras</h1>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart">
            {cartItems.map(product => (
              <li key={product.id}>
                <div>
                  <strong>{product.nombre}</strong>
                  <span>
                    $ {product.precio.toLocaleString("es-CO")} por unidad
                  </span>
                </div>

                <div className="cart-controls">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(product.id, product.cantidad - 1)
                    }
                  >
                    −
                  </button>

                  <span>{product.cantidad}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(product.id, product.cantidad + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Eliminar
                  </button>
                </div>

                <strong>
                  $ {(product.precio * product.cantidad).toLocaleString("es-CO")}
                </strong>
              </li>
            ))}
          </ul>

          <h2>Total: $ {cartTotal.toLocaleString("es-CO")}</h2>

          <button type="button" onClick={clearCart}>
            Vaciar carrito
          </button>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Finalizar compra"}
          </button>
        </>
      )}
    </main>
  );
}