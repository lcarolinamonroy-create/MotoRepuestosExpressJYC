import {useCart} from "../context/CartContext";

export default function CartPage(){
  const {cartItems, removeFromCart, clearCart, cartTotal} = useCart();

  function handleCheckout() {
    alert("Pedido registrado como demostración front-end.");
  }

  return <main><h1>Carrito de compras</h1>
    {cartItems.length === 0 ? <p>Tu carrito está vacío.</p> : <>
      <ul className="cart">{cartItems.map((product, index) => <li key={`${product.id}-${index}`}>
        {product.nombre} - $ {product.precio.toLocaleString("es-CO")}
        <button onClick={() => removeFromCart(index)}>Eliminar</button>
      </li>)}</ul>
      <h2>Total: $ {cartTotal.toLocaleString("es-CO")}</h2>
      <button onClick={clearCart}>Vaciar carrito</button>
      <button onClick={handleCheckout}>Finalizar compra</button>
    </>}
  </main>;
}
