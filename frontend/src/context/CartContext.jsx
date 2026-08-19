import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const storageKey = user ? `campusbite_cart_${user.id}` : null;
  const [items, setItems] = useState([]);
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [pickupSlot, setPickupSlot] = useState(null);
  const [hydratedKey, setHydratedKey] = useState(null);

  useEffect(() => {
    if (!storageKey) {
      setItems([]);
      setPickupSlot(null);
      setHydratedKey(null);
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      setItems((saved?.items ?? []).map((item) => ({ ...item, price: Number(item.price) })));
      setPickupDate(saved?.pickupDate ?? new Date().toISOString().slice(0, 10));
      setPickupSlot(saved?.pickupSlot ?? null);
      setHydratedKey(storageKey);
    } catch {
      setItems([]);
      setPickupSlot(null);
      setHydratedKey(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if (storageKey && hydratedKey === storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ items, pickupDate, pickupSlot }));
    }
  }, [items, pickupDate, pickupSlot, storageKey, hydratedKey]);

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i));
      }
      return [...prev, { ...item, price: Number(item.price), qty: item.qty ?? 1 }];
    });
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, qty) => {
    if (qty <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, qty } : i)));
  };

  const clearCart = () => {
    setItems([]);
    setPickupSlot(null);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    pickupDate,
    setPickupDate,
    pickupSlot,
    setPickupSlot,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
