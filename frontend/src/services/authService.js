const STORAGE_KEY = "campusbite_auth_user";
import { http } from "./api";

export async function login(email, password) {
  const session = await http.post("/auth/login", { email, password });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export async function register({ name, email, password }) {
  const session = await http.post("/auth/register", { name, email, password });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

/** Reads the persisted session on app load — no network delay needed. */
export function getPersistedSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
