import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const STEEL = "#5C6B66";

/**
 * @param {{ title: string, navItems: Array<{ to: string, label: string, icon?: React.ComponentType }> }} props
 */
export default function Sidebar({ title = "CampusBite", navItems = [] }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className="w-56 shrink-0 h-screen sticky top-0 flex flex-col border-r"
      style={{ background: "#FFFFFF", borderColor: BORDER }}
    >
      <div className="px-5 py-5 border-b" style={{ borderColor: BORDER }}>
        <p className="font-bold text-base" style={{ color: INK }}>
          Campus<span style={{ color: MUSTARD }}>Bite</span>
        </p>
        <p className="text-[11px]" style={{ color: STEEL }}>
          {title}
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.split("/").length <= 3}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "" : "hover:bg-black/5"
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? PAPER : "transparent",
                color: isActive ? MUSTARD : STEEL,
                fontWeight: isActive ? 700 : 500,
              })}
            >
              {Icon && <Icon size={16} />}
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t" style={{ borderColor: BORDER }}>
        <p className="px-3 text-xs font-medium mb-2" style={{ color: INK }}>
          {user?.name}
        </p>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium w-full hover:bg-black/5"
          style={{ color: STEEL }}
        >
          <LogOut size={14} /> Log out
        </button>
      </div>
    </aside>
  );
}
