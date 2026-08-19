import { http } from "./api";

export async function getMyOrders() {
  return http.get("/orders");
}

export async function getOrderById(orderId) {
  return http.get(`/orders/${orderId}`);
}

export async function placeOrder(orderPayload) {
  return http.post("/orders", orderPayload);
}

export async function cancelOrder(orderId) {
  return http.patch(`/orders/${orderId}/status`, { status: "CANCELLED" });
}