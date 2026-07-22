import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

// Lightweight cart for the rental request flow. Each entry is keyed by the
// catalog item's english name (unique per item) and holds a quantity.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const inc = useCallback((key) => {
    setCart((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));
  }, []);

  const dec = useCallback((key) => {
    setCart((c) => {
      const next = { ...c };
      const n = (c[key] || 0) - 1;
      if (n <= 0) delete next[key];
      else next[key] = n;
      return next;
    });
  }, []);

  const setQty = useCallback((key, qty) => {
    setCart(() => {
      const next = {};
      if (qty > 0) next[key] = qty;
      return next;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);

  const total = useMemo(
    () => Object.values(cart).reduce((s, n) => s + n, 0),
    [cart]
  );

  const value = useMemo(
    () => ({ cart, inc, dec, setQty, clear, total }),
    [cart, inc, dec, setQty, clear, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}