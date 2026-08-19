// Pure validation for pickup slot management — no React, no JSX.

export function validateSlot(values) {
  const errors = {};

  if (!values.time || !values.time.trim()) errors.time = "Time is required";
  if (!values.counter) errors.counter = "Counter is required";
  if (values.capacity === "" || values.capacity === null || Number(values.capacity) <= 0) {
    errors.capacity = "Capacity must be greater than 0";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/** A slot with active bookings can't be deleted outright — only deactivated. */
export function canDeleteSlot(slot) {
  return slot.ordersPlaced === 0;
}
