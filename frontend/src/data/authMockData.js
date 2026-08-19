// Demo accounts for the mock auth service. Real signup/login replaces this
// entirely once the backend is wired up — authService.js is the only file
// that reads from here.

export const MOCK_USERS = [
  { id: "u-1", name: "Priya Sharma", email: "student@campusbite.com", password: "password123", role: "student" },
  { id: "u-2", name: "Ramesh Kumar", email: "staff@campusbite.com", password: "password123", role: "staff" },
  { id: "u-3", name: "Anjali Desai", email: "admin@campusbite.com", password: "password123", role: "admin" },
];