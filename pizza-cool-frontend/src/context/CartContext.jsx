import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("pc_cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("pc_cart", JSON.stringify(items));
  }, [items]);

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const found = prev.find((i) => i._id === product._id);
      if (found) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((i) => i._id !== productId));
  }

  function updateQty(productId, qty) {
    setItems((prev) =>
      prev.map((i) => (i._id === productId ? { ...i, qty } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
