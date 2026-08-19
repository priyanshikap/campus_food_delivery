import { useEffect, useMemo, useState } from "react";
import { createMenuItem, deleteMenuItem, getManageMenuItems, updateMenuItem } from "../services/staffService";

function generateId(name) {
  return `item-${name.toLowerCase().trim().replace(/\s+/g, "-")}-${Math.floor(Math.random() * 1000)}`;
}

export function useMenuItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  useEffect(() => {
    getManageMenuItems().then(setItems).catch(() => setItems([]));
  }, []);

  const addItem = async (values) => {
    const item = {
      id: generateId(values.name),
      name: values.name.trim(),
      category: values.category,
      price: Number(values.price),
      description: values.description?.trim() || "",
      emoji: values.emoji || "🍽️",
      available: true,
    };
    const created = await createMenuItem(item);
    setItems((prev) => [created, ...prev]);
  };

  const updateItem = async (id, values) => {
    const updated = await updateMenuItem(id, { ...values, price: Number(values.price) });
    setItems((prev) => prev.map((it) => it.id === id ? updated : it));
  };

  const deleteItem = async (id) => {
    await deleteMenuItem(id);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const toggleAvailability = async (id) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    const updated = await updateMenuItem(id, { ...item, available: !item.available });
    setItems((prev) => prev.map((it) => it.id === id ? updated : it));
  };

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((it) => {
      const matchesSearch = term === "" || it.name.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === "ALL" || it.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, categoryFilter]);

  return {
    items: filteredItems,
    totalCount: items.length,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    addItem,
    updateItem,
    deleteItem,
    toggleAvailability,
  };
}
