/**
 * Formats a number as Indian Rupees for display across the app.
 * @param {number} amount
 * @returns {string} e.g. "\u20b9120"
 */
export function formatCurrency(amount) {
  const numericAmount = Number(amount)
  if (Number.isNaN(numericAmount)) return '\u20b90'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericAmount)
}
