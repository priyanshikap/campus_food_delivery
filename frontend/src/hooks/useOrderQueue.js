import { useEffect, useMemo, useState } from "react";
import { getStaffOrders, updateOrderStatus } from "../services/staffService";
import { isValidTransition } from "../utils/orderTransitions";

const KPI_STATUSES = ["PENDING", "PREPARING", "READY", "COLLECTED"];

export function useOrderQueue() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    getStaffOrders()
      .then((data) => setOrders(data.map((order) => ({ ...order, placedAt: order.createdAt }))))
      .catch(() => setOrders([]));
  }, []);

  const transitionOrder = async (orderId, nextStatus) => {
    const current = orders.find((order) => order.id === orderId);
    if (!current || !isValidTransition(current.status, nextStatus)) return;
    await updateOrderStatus(orderId, nextStatus);
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, status: nextStatus } : order));
  };

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
      const matchesSearch =
        term === "" ||
        o.id.toLowerCase().includes(term) ||
        o.customer.toLowerCase().includes(term) ||
        o.items.some((it) => it.name.toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const kpis = useMemo(() => {
    const counts = Object.fromEntries(KPI_STATUSES.map((s) => [s, 0]));
    orders.forEach((o) => {
      if (counts[o.status] !== undefined) counts[o.status] += 1;
    });
    return {
      total: orders.length,
      pending: counts.PENDING,
      preparing: counts.PREPARING,
      ready: counts.READY,
      completed: counts.COLLECTED,
    };
  }, [orders]);

  return {
    orders: filteredOrders,
    allOrdersCount: orders.length,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    transitionOrder,
    kpis,
  };
}
