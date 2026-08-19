import { ClipboardList, Clock, ChefHat, PackageCheck, CheckCheck } from "lucide-react";
import { useOrderQueue } from "../../hooks/useOrderQueue";
import KPICard from "../../components/shared/KPICard";
import OrderQueueItem from "../../components/staff/OrderQueueItem";
import StatusFilterBar from "../../components/staff/StatusFilterBar";
import LowInventoryAlerts from "../../components/staff/LowInventoryAlerts";
import PickupSlotSummary from "../../components/staff/PickupSlotSummary";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const STEEL = "#5C6B66";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";

export default function StaffDashboard() {
  const { orders, allOrdersCount, search, setSearch, statusFilter, setStatusFilter, transitionOrder, kpis } =
    useOrderQueue();

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>
            Staff Operations
          </h1>
          <p className="text-sm" style={{ color: STEEL }}>
            {allOrdersCount} orders today across all counters
          </p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <KPICard label="Today's Orders" value={kpis.total} icon={ClipboardList} accent={INK} />
          <KPICard label="Pending" value={kpis.pending} icon={Clock} accent={MUSTARD} />
          <KPICard label="Preparing" value={kpis.preparing} icon={ChefHat} accent="#B25E1F" />
          <KPICard label="Ready" value={kpis.ready} icon={PackageCheck} accent={GREEN} />
          <KPICard label="Completed" value={kpis.completed} icon={CheckCheck} accent={STEEL} />
        </div>

        <LowInventoryAlerts items={[]} />

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Live queue */}
          <div>
            <h2 className="font-semibold text-sm mb-3" style={{ color: INK }}>
              Live Order Queue
            </h2>
            <StatusFilterBar
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg border shadow-sm p-8 text-center" style={{ borderColor: "#D9CBAA" }}>
                <p className="text-sm" style={{ color: STEEL }}>
                  No orders match your search or filter.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {orders.map((order) => (
                  <OrderQueueItem key={order.id} order={order} onTransition={transitionOrder} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <PickupSlotSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
