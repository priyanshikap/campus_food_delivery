// Inventory validation — pure functions, no React, no UI.
// Cart.jsx and Checkout.jsx both call these to decide what warnings to render;
// neither page contains availability logic of its own.

/**
 * @param {string} itemId
 * @param {number} requestedQty
 * @param {Record<string, number>} inventoryMap
 * @returns {{ status: 'ok' | 'low' | 'unavailable', availableQty: number, message: string | null }}
 */
export function checkItemAvailability(itemId, requestedQty, inventoryMap) {
  const availableQty = inventoryMap[itemId] ?? 0;

  if (availableQty <= 0) {
    return { status: "unavailable", availableQty, message: "Currently unavailable at this counter" };
  }
  if (availableQty < requestedQty) {
    return {
      status: "low",
      availableQty,
      message: `Only ${availableQty} left — reduce quantity to continue`,
    };
  }
  return { status: "ok", availableQty, message: null };
}

/**
 * Validates every line in a cart against current inventory.
 * @param {{id: string, name: string, qty: number}[]} cartItems
 * @param {Record<string, number>} inventoryMap
 * @returns {Array<{ itemId: string, name: string, requestedQty: number } & ReturnType<typeof checkItemAvailability>>}
 */
export function validateCartAvailability(cartItems, inventoryMap) {
  return cartItems.map((item) => ({
    itemId: item.id,
    name: item.name,
    requestedQty: item.qty,
    ...checkItemAvailability(item.id, item.qty, inventoryMap),
  }));
}

export function validateLiveCartAvailability(cartItems, pickupDate, pickupSlot) {
  const slotId = pickupSlot?.id
  return cartItems.map((item) => {
    const stock = item.stockBySlot?.[`${pickupDate}:${slotId}`]
    const availableQty = stock ? Math.max(0, Number(stock.total) - Number(stock.reserved)) : 0
    const requestedQty = item.qty
    const status = availableQty <= 0 ? "unavailable" : availableQty < requestedQty ? "low" : "ok"
    return {
      itemId: item.id,
      name: item.name,
      requestedQty,
      status,
      availableQty,
      message:
        status === "unavailable"
          ? "Currently unavailable for this pickup slot"
          : status === "low"
            ? `Only ${availableQty} left — reduce quantity to continue`
            : null,
    }
  })
}

/** True if any line in the cart is low or unavailable. */
export function hasBlockingAvailabilityIssues(validationResults) {
  return validationResults.some((r) => r.status !== "ok");
}

/** True if the chosen pickup slot has reached capacity. */
export function isSlotFull(slot) {
  if (!slot) return false;
  return slot.ordersPlaced >= slot.capacity;
}
