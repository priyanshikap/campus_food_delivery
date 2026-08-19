// Pure validation for the menu item form — no React, no JSX.

export function validateMenuItem(values) {
  const errors = {};

  if (!values.name || !values.name.trim()) errors.name = "Name is required";
  if (!values.category) errors.category = "Category is required";
  if (values.price === "" || values.price === null || values.price === undefined) {
    errors.price = "Price is required";
  } else if (Number(values.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
