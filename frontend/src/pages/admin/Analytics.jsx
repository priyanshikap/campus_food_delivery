import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { ShoppingBag, IndianRupee, CheckCircle2, XCircle, Timer } from "lucide-react";
import KPICard from "../../components/shared/KPICard";
import { getAdminAnalytics } from "../../services/adminService";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const TEAL = "#2A6F77";
const STEEL = "#5C6B66";

const RANGES = [
  { key: "TODAY", label: "Today" },
  { key: "7D", label: "7 Days" },
  { key: "30D", label: "30 Days" },
];

function ChartCard({ title, sub, children, height = 240 }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
      <div className="mb-3">
        <h3 className="font-semibold text-sm" style={{ color: INK }}>
          {title}
        </h3>
        {sub && (
          <p className="text-[11px]" style={{ color: STEEL }}>
            {sub}
          </p>
        )}
      </div>
      <div style={{ width: "100%", height }}>{children}</div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-md border shadow-md px-3 py-2 text-xs" style={{ borderColor: BORDER }}>
      <p className="font-semibold mb-1" style={{ color: INK }}>
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: STEEL }}>
          {p.name}: <span className="font-mono font-semibold" style={{ color: INK }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState("TODAY");
  const [data, setData] = useState({ kpis: { totalOrders: 0, revenue: 0, completionRate: 0, cancellationRate: 0, avgPrepTime: 0 }, ordersOverTime: [], popularItems: [], slotDemand: [], inventoryUtilization: [] });
  useEffect(() => {
    getAdminAnalytics(range).then((result) => setData({ ...data, ...result, kpis: { ...data.kpis, ...result.kpis }, popularItems: (result.popularItems || []).map((item) => ({ ...item, orders: item.quantity })) })).catch(() => {});
  }, [range]);
  const { kpis, ordersOverTime, popularItems, slotDemand, inventoryUtilization } = data;

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>
              Analytics
            </h1>
            <p className="text-sm" style={{ color: STEEL }}>
              Campus-wide performance overview
            </p>
          </div>
          <div className="flex gap-1.5 bg-white rounded-md border p-1" style={{ borderColor: BORDER }}>
            {RANGES.map((r) => {
              const active = range === r.key;
              return (
                <button
                  key={r.key}
                  onClick={() => setRange(r.key)}
                  className="px-3 py-1.5 rounded text-xs font-semibold transition-colors"
                  style={{
                    background: active ? MUSTARD : "transparent",
                    color: active ? "#FFFFFF" : STEEL,
                  }}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <KPICard label="Total Orders" value={kpis.totalOrders.toLocaleString("en-IN")} icon={ShoppingBag} accent={INK} />
          <KPICard label="Revenue" value={`₹${kpis.revenue.toLocaleString("en-IN")}`} icon={IndianRupee} accent={MUSTARD} />
          <KPICard label="Completion Rate" value={`${kpis.completionRate}%`} icon={CheckCircle2} accent={GREEN} />
          <KPICard label="Cancellation Rate" value={`${kpis.cancellationRate}%`} icon={XCircle} accent={RED} />
          <KPICard label="Avg Prep Time" value={`${kpis.avgPrepTime}m`} icon={Timer} accent={TEAL} />
        </div>

        {/* Orders over time */}
        <div className="mb-4">
          <ChartCard
            title="Orders over time"
            sub={range === "TODAY" ? "By hour" : "By day"}
            height={260}
          >
            <ResponsiveContainer>
              <AreaChart data={ordersOverTime} margin={{ left: -20, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={MUSTARD} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={MUSTARD} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={BORDER} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: STEEL }} axisLine={{ stroke: BORDER }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: STEEL }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="orders" name="Orders" stroke={MUSTARD} strokeWidth={2} fill="url(#ordersFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Popular items */}
          <ChartCard title="Popular food items" sub="By order count">
            <ResponsiveContainer>
              <BarChart data={popularItems} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid stroke={BORDER} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: STEEL }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: INK }}
                  axisLine={false}
                  tickLine={false}
                  width={110}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" name="Orders" fill={GREEN} radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Pickup slot demand */}
          <ChartCard title="Pickup slot demand" sub="Orders per slot">
            <ResponsiveContainer>
              <BarChart data={slotDemand} margin={{ left: -20, right: 10 }}>
                <CartesianGrid stroke={BORDER} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="slot" tick={{ fontSize: 11, fill: STEEL }} axisLine={{ stroke: BORDER }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: STEEL }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" name="Orders" fill={TEAL} radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Inventory utilization */}
        <ChartCard title="Inventory utilization" sub="% of stock reserved, by category" height={220}>
          <ResponsiveContainer>
            <BarChart data={inventoryUtilization} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid stroke={BORDER} strokeDasharray="4 4" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: STEEL }} axisLine={false} tickLine={false} unit="%" />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fontSize: 11, fill: INK }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="utilization" name="Utilization" fill={MUSTARD} radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
