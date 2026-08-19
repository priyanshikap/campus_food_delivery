// Pure, presentation-only availability helpers for the Menu page.
// These read mock stock numbers and describe what the UI should show.
// They do NOT reserve, decrement, or otherwise mutate inventory \u2014
// that belongs to the backend once order submission is implemented.

export const MAX_QTY_PER_ORDER = 6
export const LOW_STOCK_THRESHOLD = 5

export const AVAILABILITY_STATUS = {
  SELECT_SLOT: 'select-slot',
  AVAILABLE: 'available',
  LOW: 'low',
  SOLD_OUT: 'sold-out',
  UNAVAILABLE: 'unavailable',
}

/**
 * Resolves what a menu item's availability looks like for a given
 * date + pickup slot.
 * @param {object} item - a menuData item (may include temporarilyUnavailable, stockBySlot)
 * @param {string|null} dateId
 * @param {string|null} slotId
 * @returns {{ status: string, remaining: number|null }}
 */
export function getAvailability(item, dateId, slotId) {
  if (!dateId || !slotId) {
    return { status: AVAILABILITY_STATUS.SELECT_SLOT, remaining: null }
  }

  if (item.temporarilyUnavailable) {
    return { status: AVAILABILITY_STATUS.UNAVAILABLE, remaining: 0 }
  }

  const stock = item.stockBySlot?.[`${dateId}:${slotId}`]
  if (!stock) {
    return { status: AVAILABILITY_STATUS.UNAVAILABLE, remaining: 0 }
  }

  const remaining = Math.max(0, stock.total - stock.reserved)
  if (remaining === 0) {
    return { status: AVAILABILITY_STATUS.SOLD_OUT, remaining: 0 }
  }
  if (remaining <= LOW_STOCK_THRESHOLD) {
    return { status: AVAILABILITY_STATUS.LOW, remaining }
  }
  return { status: AVAILABILITY_STATUS.AVAILABLE, remaining }
}

/**
 * Clamps a requested quantity so the UI never lets someone select more
 * than what's remaining for the slot, or more than the per-order cap.
 * @param {number} requestedQty
 * @param {number} remaining
 * @returns {number}
 */
export function clampQuantity(requestedQty, remaining) {
  const ceiling = Math.min(remaining, MAX_QTY_PER_ORDER)
  if (ceiling <= 0) return 0
  return Math.min(Math.max(1, requestedQty), ceiling)
}
