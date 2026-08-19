import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { cancelOrder as cancelOrderApi, getMyOrders, placeOrder } from "../services/orderService";

const OrderContext = createContext(null);

function generateOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `CB-${n}`;
}

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    setLoading(true);
    getMyOrders().then(setOrders).finally(() => setLoading(false));
    const refresh = setInterval(() => getMyOrders().then(setOrders).catch(() => {}), 5000);
    return () => clearInterval(refresh);
  }, [user]);

  const addOrder = async ({ items, total: _total, pickupDate, pickupSlot, payment }) => {
    const order = await placeOrder({
      items,
      pickupDate,
      pickupSlotId: pickupSlot.id,
      paymentMethod: payment?.method ?? "CARD",
    });
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrder = (orderId) => orders.find((o) => o.id === orderId);

  const cancelOrder = async (orderId) => {
    const updated = await cancelOrderApi(orderId);
    setOrders((prev) => prev.map((order) => order.id === orderId ? updated : order));
  };

  const value = { orders, loading, addOrder, getOrder, cancelOrder };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within an OrderProvider");
  return ctx;
}
