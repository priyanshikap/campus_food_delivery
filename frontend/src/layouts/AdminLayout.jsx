import { Outlet } from "react-router-dom";
import { LayoutDashboard, BarChart3, Users as UsersIcon, UtensilsCrossed } from "lucide-react";
import Sidebar from "../components/ui/Sidebar";

const PAPER = "#EFE7D8";

const ADMIN_NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/users", label: "Users", icon: UsersIcon },
  { to: "/admin/menu", label: "Manage Menu", icon: UtensilsCrossed },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex" style={{ background: PAPER }}>
      <Sidebar title="Admin Console" navItems={ADMIN_NAV_ITEMS} />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
