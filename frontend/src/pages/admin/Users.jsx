import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getAdminUsers, updateUserStatus } from "../../services/adminService";
import { formatDate } from "../../utils/formatDate";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const ROLE_FILTERS = ["ALL", "student", "staff", "admin"];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    getAdminUsers().then(setUsers).catch(() => setUsers([]));
  }, []);

  const toggleStatus = async (id) => {
    const user = users.find((entry) => entry.id === id);
    if (!user) return;
    const updated = await updateUserStatus(id, user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE");
    setUsers((prev) => prev.map((entry) => entry.id === id ? updated : entry));
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchesSearch = term === "" || u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: INK }}>
          Users
        </h1>
        <p className="text-sm mb-6" style={{ color: STEEL }}>
          {users.length} accounts on the platform
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color={STEEL} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email…"
              className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, color: INK, "--tw-ring-color": MUSTARD }}
            />
          </div>
          <div className="flex gap-1.5">
            {ROLE_FILTERS.map((r) => {
              const active = roleFilter === r;
              return (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className="px-3 py-2 rounded-md text-xs font-semibold capitalize"
                  style={{
                    background: active ? MUSTARD : "#FFFFFF",
                    color: active ? "#FFFFFF" : STEEL,
                    border: `1px solid ${active ? MUSTARD : BORDER}`,
                  }}
                >
                  {r === "ALL" ? "All" : r}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden" style={{ borderColor: BORDER }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: PAPER }}>
                {["Name", "Email", "Role", "Joined", "Status", ""].map((h) => (
                  <th key={h} className="text-left font-semibold text-[11px] uppercase tracking-wide px-4 py-3" style={{ color: STEEL }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} style={{ borderTop: `1px solid ${BORDER}` }}>
                  <td className="px-4 py-3 font-medium" style={{ color: INK }}>
                    {u.name}
                  </td>
                  <td className="px-4 py-3" style={{ color: STEEL }}>
                    {u.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ background: PAPER, color: STEEL }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: STEEL }}>
                    {formatDate(u.joinedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: u.status === "ACTIVE" ? "#EAF4EC" : "#FBEAE6",
                        color: u.status === "ACTIVE" ? GREEN : RED,
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-md border"
                      style={{ borderColor: BORDER, color: u.status === "ACTIVE" ? RED : GREEN }}
                    >
                      {u.status === "ACTIVE" ? "Suspend" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-sm py-8" style={{ color: STEEL }}>
              No users match your search or filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
