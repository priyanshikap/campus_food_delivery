// Pure date formatting helpers — no React.

export function formatDate(input, opts = {}) {
  const d = input instanceof Date ? input : new Date(input);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", ...opts });
}

export function formatDateShort(input) {
  const d = input instanceof Date ? input : new Date(input);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export function formatTime(input) {
  const d = input instanceof Date ? input : new Date(input);
  return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

export function formatDateTime(input) {
  const d = input instanceof Date ? input : new Date(input);
  return `${formatDateShort(d)}, ${formatTime(d)}`;
}

/** "5 min ago", "2 hr ago", falls back to a short date beyond a day. */
export function formatRelativeTime(input) {
  const d = input instanceof Date ? input : new Date(input);
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  return formatDateShort(d);
}

export function isToday(input) {
  const d = input instanceof Date ? input : new Date(input);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

export function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}