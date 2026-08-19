import { useEffect, useMemo, useState } from "react";
import { getStaffOrders } from "../services/staffService";

export function useOrderHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getStaffOrders().then((data) => setOrders(data.map((order) => ({ ...order, placedAt: order.createdAt })))).catch(() => setOrders([]));
  }, []);

  const dates = useMemo(() => {
    const unique = new Set(orders.map((o) => o.createdAt.slice(0, 10)));
    return [...unique].sort().reverse();
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
      const matchesDate = dateFilter === "ALL" || o.createdAt.slice(0, 10) === dateFilter;
      const matchesSearch =
        term === "" ||
        o.id.toLowerCase().includes(term) ||
        o.customer.toLowerCase().includes(term) ||
        o.items.some((it) => it.name.toLowerCase().includes(term));
      return matchesStatus && matchesDate && matchesSearch;
    }).sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
  }, [orders, search, statusFilter, dateFilter]);

  const summary = useMemo(() => {
    const totalRevenue = filteredOrders
      .filter((o) => o.status === "COLLECTED")
      .reduce((sum, o) => sum + o.total, 0);
    return { count: filteredOrders.length, totalRevenue };
  }, [filteredOrders]);

  return {
    orders: filteredOrders,
    dates,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    summary,
  };
}
