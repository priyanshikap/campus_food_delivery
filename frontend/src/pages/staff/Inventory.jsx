import { useEffect, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import InventoryFilterBar from "../../components/staff/InventoryFilterBar";
import AvailabilityBar from "../../components/staff/AvailabilityBar";
import { getInventory, updateInventory } from "../../services/staffService";
import { deriveInventoryRow, isLowOrOut, INVENTORY_STATUS } from "../../utils/inventoryCalculations";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const GREEN = "#2F7D4F";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const STATUS_STYLES = {
  [INVENTORY_STATUS.AVAILABLE]: { bg: "#EAF4EC", color: GREEN },
  [INVENTORY_STATUS.LOW_STOCK]: { bg: "#FBF1DD", color: MUSTARD },
  [INVENTORY_STATUS.SOLD_OUT]: { bg: "#FBEAE6", color: RED },
  [INVENTORY_STATUS.TEMPORARILY_UNAVAILABLE]: { bg: "#EFEFEF", color: STEEL },
};

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [slotFilter, setSlotFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [rawRows, setRawRows] = useState([]);

  useEffect(() => {
    getInventory().then(setRawRows).catch(() => setRawRows([]));
  }, []);

  const rows = useMemo(() => rawRows.map((row) => deriveInventoryRow({ ...row, id: `${row.menuItemId}-${row.slotId}-${row.pickupDate}` })), [rawRows]);
  const categories = useMemo(() => [...new Set(rows.map((row) => row.category))].sort(), [rows]);
  const dates = useMemo(() => [...new Set(rows.map((row) => row.pickupDate))].sort(), [rows]);
  const slots = useMemo(() => [...new Set(rows.map((row) => row.pickupSlot))].sort(), [rows]);

  const saveTotal = async (row) => {
    const total = Number(window.prompt("Total stock", row.total));
    if (!Number.isInteger(total) || total < row.reserved) return;
    const updated = await updateInventory(row, total);
    setRawRows((prev) => prev.map((entry) => entry.menuItemId === row.menuItemId && entry.slotId === row.slotId && entry.pickupDate === row.pickupDate ? { ...entry, ...updated } : entry));
  };

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((r) => {
      return (
        (term === "" || r.name.toLowerCase().includes(term)) &&
        (dateFilter === "ALL" || r.pickupDate === dateFilter) &&
        (slotFilter === "ALL" || r.pickupSlot === slotFilter) &&
        (categoryFilter === "ALL" || r.category === categoryFilter)
      );
    });
  }, [rows, search, dateFilter, slotFilter, categoryFilter]);

  const lowStockItems = useMemo(() => rows.filter(isLowOrOut), [rows]);

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: INK }}>
          Inventory
        </h1>
        <p className="text-sm mb-6" style={{ color: STEEL }}>
          Stock levels across every pickup slot and date
        </p>

        {lowStockItems.length > 0 && (
          <div className="bg-white rounded-lg border shadow-sm p-4 mb-6" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} color={RED} />
              <h3 className="font-semibold text-sm" style={{ color: INK }}>
                Low-stock warnings
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {lowStockItems.map((item) => (
                <span
                  key={item.id}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: STATUS_STYLES[item.status].bg,
                    color: STATUS_STYLES[item.status].color,
                  }}
                >
                  {item.name} ({item.pickupSlot}) — {item.status.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        <InventoryFilterBar
          search={search}
          onSearchChange={setSearch}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          dates={dates}
          slotFilter={slotFilter}
          onSlotFilterChange={setSlotFilter}
          slots={slots}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categories={categories}
        />

        {/* Table — desktop */}
        <div className="hidden md:block bg-white rounded-lg border shadow-sm overflow-hidden" style={{ borderColor: BORDER }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: PAPER }}>
                {["Food Item", "Category", "Pickup Date", "Pickup Slot", "Total", "Reserved", "Available", "Status", ""].map(
                  (h) => (
                    <th key={h} className="text-left font-semibold text-[11px] uppercase tracking-wide px-4 py-3" style={{ color: STEEL }}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const style = STATUS_STYLES[row.status];
                return (
                  <tr key={row.id} style={{ borderTop: `1px solid ${BORDER}` }}>
                    <td className="px-4 py-3 font-medium" style={{ color: INK }}>
                      {row.name}
                    </td>
                    <td className="px-4 py-3" style={{ color: STEEL }}>
                      {row.category}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: STEEL }}>
                      {row.pickupDate}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: STEEL }}>
                      {row.pickupSlot}
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: INK }}>
                      <button onClick={() => saveTotal(row)} className="underline" title="Edit stock total">{row.total}</button>
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: INK }}>
                      {row.reserved}
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold" style={{ color: INK }}>
                      {row.available}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
                        style={{ background: style.bg, color: style.color }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-28">
                      <AvailabilityBar percent={row.availabilityPercent} status={row.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredRows.length === 0 && (
            <p className="text-center text-sm py-8" style={{ color: STEEL }}>
              No items match your filters.
            </p>
          )}
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-3">
          {filteredRows.map((row) => {
            const style = STATUS_STYLES[row.status];
            return (
              <div key={row.id} className="bg-white rounded-lg border shadow-sm p-4" style={{ borderColor: BORDER }}>
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-sm" style={{ color: INK }}>
                    {row.name}
                  </p>
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {row.status}
                  </span>
                </div>
                <p className="text-xs mb-3" style={{ color: STEEL }}>
                  {row.category} · {row.pickupDate} · {row.pickupSlot}
                </p>
                <div className="flex justify-between text-xs font-mono mb-2" style={{ color: STEEL }}>
                  <span>Total {row.total}</span>
                  <span>Reserved {row.reserved}</span>
                  <span style={{ color: INK, fontWeight: 600 }}>Available {row.available}</span>
                </div>
                <AvailabilityBar percent={row.availabilityPercent} status={row.status} />
              </div>
            );
          })}
          {filteredRows.length === 0 && (
            <p className="text-center text-sm py-8" style={{ color: STEEL }}>
              No items match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
