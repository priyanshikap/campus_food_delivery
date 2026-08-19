import { Search } from "lucide-react";

const INK = "#1E1B16";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const STEEL = "#5C6B66";

const FILTERS = ["ALL", "PENDING", "CONFIRMED", "PREPARING", "READY", "COLLECTED"];

export default function StatusFilterBar({ search, onSearchChange, statusFilter, onStatusFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color={STEEL} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search order ID, customer, or item…"
          className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: BORDER, color: INK, "--tw-ring-color": MUSTARD }}
        />
      </div>
      <div className="flex gap-1.5 overflow-x-auto">
        {FILTERS.map((f) => {
          const active = statusFilter === f;
          return (
            <button
              key={f}
              onClick={() => onStatusFilterChange(f)}
              className="px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
              style={{
                background: active ? MUSTARD : "#FFFFFF",
                color: active ? "#FFFFFF" : STEEL,
                border: `1px solid ${active ? MUSTARD : BORDER}`,
              }}
            >
              {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
