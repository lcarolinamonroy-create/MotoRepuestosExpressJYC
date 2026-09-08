import { createContext, useContext, useMemo, useState } from "react";

// El contexto permite que el menú, el catálogo y el carrito compartan la misma información.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
  });

  function saveCart(nextItems) {
    setCartItems(nextItems);
    localStorage.setItem("carrito", JSON.stringify(nextItems));
  }

  function addToCart(product) {
    saveCart([...cartItems, product]);
  }

  function removeFromCart(index) {
    saveCart(cartItems.filter((_, itemIndex) => itemIndex !== index));
  }

  function clearCart() {
    saveCart([]);
  }

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount: cartItems.length,
    cartTotal: cartItems.reduce((total, item) => total + item.precio, 0)
  }), [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
