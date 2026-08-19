import { http } from "./api";

export async function getMenuItems() {
  return http.get("/menu");
}

export async function getMenuItemById(id) {
  const items = await getMenuItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function getCategories() {
  const items = await getMenuItems();
  return [...new Set(items.map((item) => item.category))];
}

export async function getPickupSlots() {
  return http.get("/slots");
}
