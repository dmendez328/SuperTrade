import React, { createContext, useContext, useEffect, useState } from 'react';

// A context for managing the shopping cart. Cart items are persisted
// to localStorage under the key 'st_cart' so that page reloads do not
// clear the cart. Each item should have an id, title, price and qty
// property. Additional properties can be stored as needed.

const CartContext = createContext();

function readCart() {
  try {
    const raw = localStorage.getItem('st_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read cart from localStorage', err);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readCart());

  // Persist the cart whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem('st_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to write cart to localStorage', err);
    }
  }, [cart]);

  // Add an item to the cart. If the item already exists it
  // increments the quantity. Otherwise it pushes a new item.
  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, { ...item }];
    });
  };

  // Update the quantity for a given item id. Quantities below 1 are
  // coerced to 1.
  const updateQty = (id, qty) => {
    const next = Math.max(1, Number(qty) || 1);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: next } : i)));
  };

  // Remove an item from the cart.
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Empty the cart completely.
  const clearCart = () => setCart([]);

  // Compute the subtotal by summing price*qty for each item.
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, updateQty, removeItem, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook for consuming the cart context. Throws an error if used outside
// the provider. Consumers can access cart state and helper
// functions.
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}