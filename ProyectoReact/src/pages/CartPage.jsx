import {useCart} from "../context/CartContext";
import "../cart.css";

export default function CartPage(){
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    cartTotal
  } = useCart();

  function handleCheckout() {
    alert("Pedido registrado como demostración front-end.");
  }

  return <main><h1>Carrito de compras</h1>
    {cartItems.length === 0 ? <p>Tu carrito está vacío.</p> : <>
      <ul className="cart">
        {cartItems.map(product => <li key={product.id}>
          <div>
            <strong>{product.nombre}</strong>
            <span>$ {product.precio.toLocaleString("es-CO")} por unidad</span>
          </div>
          <div className="cart-controls">
            <button type="button" onClick={() => updateQuantity(product.id, product.cantidad - 1)}>−</button>
            <span>{product.cantidad}</span>
            <button type="button" onClick={() => updateQuantity(product.id, product.cantidad + 1)}>+</button>
            <button type="button" onClick={() => removeFromCart(product.id)}>Eliminar</button>
          </div>
          <strong>$ {(product.precio * product.cantidad).toLocaleString("es-CO")}</strong>
        </li>)}
      </ul>
      <h2>Total: $ {cartTotal.toLocaleString("es-CO")}</h2>
      <button onClick={clearCart}>Vaciar carrito</button>
      <button onClick={handleCheckout}>Finalizar compra</button>
    </>}
  </main>;
}
