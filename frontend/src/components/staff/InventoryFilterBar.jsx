import { Search } from "lucide-react";

const INK = "#1E1B16";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const STEEL = "#5C6B66";

const selectStyle = {
  borderColor: BORDER,
  color: INK,
};

export default function InventoryFilterBar({
  search,
  onSearchChange,
  dateFilter,
  onDateFilterChange,
  dates,
  slotFilter,
  onSlotFilterChange,
  slots,
  categoryFilter,
  onCategoryFilterChange,
  categories,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 mb-5">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color={STEEL} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search food item…"
          className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2"
          style={{ ...selectStyle, "--tw-ring-color": MUSTARD }}
        />
      </div>

      <select
        value={dateFilter}
        onChange={(e) => onDateFilterChange(e.target.value)}
        className="rounded-md border px-3 py-2.5 text-sm bg-white"
        style={selectStyle}
      >
        <option value="ALL">All dates</option>
        {dates.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={slotFilter}
        onChange={(e) => onSlotFilterChange(e.target.value)}
        className="rounded-md border px-3 py-2.5 text-sm bg-white"
        style={selectStyle}
      >
        <option value="ALL">All slots</option>
        {slots.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryFilterChange(e.target.value)}
        className="rounded-md border px-3 py-2.5 text-sm bg-white"
        style={selectStyle}
      >
        <option value="ALL">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
