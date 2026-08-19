import { Outlet } from "react-router-dom";
import { LayoutDashboard, ClipboardList, UtensilsCrossed, Clock, Warehouse } from "lucide-react";
import Sidebar from "../components/ui/Sidebar";

const PAPER = "#EFE7D8";

const STAFF_NAV_ITEMS = [
  { to: "/staff", label: "Dashboard", icon: LayoutDashboard },
  { to: "/staff/orders", label: "Order History", icon: ClipboardList },
  { to: "/staff/menu", label: "Manage Menu", icon: UtensilsCrossed },
  { to: "/staff/slots", label: "Manage Slots", icon: Clock },
  { to: "/staff/inventory", label: "Inventory", icon: Warehouse },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex" style={{ background: PAPER }}>
      <Sidebar title="Staff Console" navItems={STAFF_NAV_ITEMS} />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
