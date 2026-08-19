import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Ticket } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ title = "Console", navItems = [] }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-ink/10 bg-ink px-4 py-6 text-paper">
      <NavLink to="/" className="flex items-center gap-3 px-3" aria-label="CampusBite home">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass text-ink">
          <Ticket size={19} strokeWidth={2.25} />
        </span>
        <span>
          <span className="block font-display text-lg font-semibold leading-tight">CampusBite</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-paper/45">
            {title}
          </span>
        </span>
      </NavLink>

      <nav className="mt-10 flex-1 space-y-1" aria-label={`${title} navigation`}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin" || to === "/staff"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-paper text-ink shadow-card"
                  : "text-paper/65 hover:bg-paper/10 hover:text-paper"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-paper/10 pt-4">
        <div className="mb-3 px-3">
          <p className="truncate text-sm font-semibold">{user?.name ?? "Team member"}</p>
          <p className="mt-1 truncate text-xs text-paper/45">{user?.email ?? ""}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-paper/65 transition-colors hover:bg-rust/20 hover:text-paper"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
