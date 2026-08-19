// Mock user directory for admin/Users.jsx. Broader than data/authMockData.js
// (which only holds the 3 login demo accounts) — this represents the full
// platform user base an admin would manage.

export const MOCK_PLATFORM_USERS = [
  { id: "pu-1", name: "Priya Sharma", email: "student@campusbite.com", role: "student", status: "ACTIVE", joinedAt: "2026-01-14" },
  { id: "pu-2", name: "Ramesh Kumar", email: "staff@campusbite.com", role: "staff", status: "ACTIVE", joinedAt: "2025-11-02" },
  { id: "pu-3", name: "Anjali Desai", email: "admin@campusbite.com", role: "admin", status: "ACTIVE", joinedAt: "2025-08-20" },
  { id: "pu-4", name: "Aditi Rao", email: "aditi.rao@campus.edu", role: "student", status: "ACTIVE", joinedAt: "2026-02-03" },
  { id: "pu-5", name: "Rohan Mehta", email: "rohan.mehta@campus.edu", role: "student", status: "ACTIVE", joinedAt: "2026-02-10" },
  { id: "pu-6", name: "Sneha Iyer", email: "sneha.iyer@campus.edu", role: "student", status: "SUSPENDED", joinedAt: "2026-01-28" },
  { id: "pu-7", name: "Karthik Nair", email: "karthik.nair@campus.edu", role: "student", status: "ACTIVE", joinedAt: "2026-03-01" },
  { id: "pu-8", name: "Meera Pillai", email: "meera.counter@campusbite.com", role: "staff", status: "ACTIVE", joinedAt: "2025-12-15" },
];