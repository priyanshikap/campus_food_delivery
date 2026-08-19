import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingBag, IndianRupee, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import KPICard from "../../components/shared/KPICard";
import { getAdminAnalytics } from "../../services/adminService";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

export default function AdminDashboard() {
  const [kpis, setKpis] = useState({ totalOrders: 0, revenue: 0, completionRate: 0 });
  useEffect(() => {
    getAdminAnalytics("TODAY").then((result) => setKpis(result.kpis)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: INK }}>
          Admin Overview
        </h1>
        <p className="text-sm mb-6" style={{ color: STEEL }}>
          Campus-wide snapshot for today
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <KPICard label="Orders Today" value={kpis.totalOrders} icon={ShoppingBag} accent={INK} />
          <KPICard label="Revenue Today" value={`₹${kpis.revenue.toLocaleString("en-IN")}`} icon={IndianRupee} accent={MUSTARD} />
          <KPICard label="Completion Rate" value={`${kpis.completionRate}%`} icon={CheckCircle2} accent={GREEN} />
          <KPICard label="Low Stock Items" value="0" icon={AlertTriangle} accent={RED} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/admin/analytics"
            className="bg-white rounded-lg border shadow-sm p-5 flex items-center justify-between hover:-translate-y-0.5 transition-transform"
            style={{ borderColor: BORDER }}
          >
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: INK }}>
                Analytics
              </p>
              <p className="text-xs" style={{ color: STEEL }}>
                Orders, revenue, popular items & slot demand
              </p>
            </div>
            <ArrowRight size={16} color={STEEL} />
          </Link>

          <Link
            to="/admin/users"
            className="bg-white rounded-lg border shadow-sm p-5 flex items-center justify-between hover:-translate-y-0.5 transition-transform"
            style={{ borderColor: BORDER }}
          >
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: INK }}>
                Users
              </p>
              <p className="text-xs" style={{ color: STEEL }}>
                Manage student, staff & admin accounts
              </p>
            </div>
            <ArrowRight size={16} color={STEEL} />
          </Link>
        </div>
      </div>
    </div>
  );
}
