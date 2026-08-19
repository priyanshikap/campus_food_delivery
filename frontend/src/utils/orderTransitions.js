// Order status transition rules — pure, no React/UI.
// Every screen that renders order actions reads from here, so the queue
// can never show a button that leads to an invalid state.

export const ORDER_STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COLLECTED"];
export const TERMINAL_STATUSES = ["COLLECTED", "REJECTED", "CANCELLED"];

/**
 * @param {string} status
 * @returns {Array<{ label: string, nextStatus: string, variant: 'primary' | 'danger' }>}
 */
export function getAvailableActions(status) {
  switch (status) {
    case "PENDING":
      return [
        { label: "Confirm", nextStatus: "CONFIRMED", variant: "primary" },
        { label: "Reject", nextStatus: "REJECTED", variant: "danger" },
      ];
    case "CONFIRMED":
      return [{ label: "Start Preparation", nextStatus: "PREPARING", variant: "primary" }];
    case "PREPARING":
      return [{ label: "Mark Ready", nextStatus: "READY", variant: "primary" }];
    case "READY":
      return [{ label: "Mark Collected", nextStatus: "COLLECTED", variant: "primary" }];
    default:
      // COLLECTED / REJECTED / CANCELLED — terminal, nothing left to do.
      return [];
  }
}

/** Guards hook-level transitions so state can never jump or move backward. */
export function isValidTransition(from, to) {
  const allowed = getAvailableActions(from).map((a) => a.nextStatus);
  return allowed.includes(to);
}

export function isTerminal(status) {
  return TERMINAL_STATUSES.includes(status);
}
