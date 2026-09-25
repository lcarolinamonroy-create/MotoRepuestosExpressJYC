import { createContext, useContext, useMemo, useState } from "react";

// El contexto permite que el menú, el catálogo y el carrito compartan la misma información.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem("carrito") || "[]");
      return savedItems.map(item => ({
        ...item,
        cantidad: Number(item.cantidad) > 0 ? Number(item.cantidad) : 1
      }));
    } catch {
      return [];
    }
  });

  function saveCart(nextItems) {
    setCartItems(nextItems);
    localStorage.setItem("carrito", JSON.stringify(nextItems));
  }

  function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const nextItems = cartItems.map(item => {
        if (item.id !== product.id) return item;

        const stock = Number(item.stock) || Number(product.stock) || Infinity;
        return { ...item, cantidad: Math.min(item.cantidad + 1, stock) };
      });
      saveCart(nextItems);
      return;
    }

    saveCart([{ ...product, cantidad: 1 }, ...cartItems]);
  }

  function removeFromCart(productId) {
    saveCart(cartItems.filter(item => item.id !== productId));
  }

  function clearCart() {
    saveCart([]);
  }

  function updateQuantity(productId, nextQuantity) {
    const nextItems = cartItems
      .map(item => {
        if (item.id !== productId) return item;

        const stock = Number(item.stock) || Infinity;
        return {
          ...item,
          cantidad: Math.min(Math.max(nextQuantity, 0), stock)
        };
      })
      .filter(item => item.cantidad > 0);

    saveCart(nextItems);
  }

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    cartCount: cartItems.reduce((total, item) => total + item.cantidad, 0),
    cartTotal: cartItems.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    )
  }), [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
