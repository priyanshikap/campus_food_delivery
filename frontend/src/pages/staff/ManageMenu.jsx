import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useMenuItems } from "../../hooks/useMenuItems";
import { MENU_CATEGORIES } from "../../data/menuMockData";
import MenuItemRow from "../../components/staff/MenuItemRow";
import MenuItemForm from "../../components/staff/MenuItemForm";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const STEEL = "#5C6B66";

export default function ManageMenu() {
  const {
    items,
    totalCount,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    addItem,
    updateItem,
    deleteItem,
    toggleAvailability,
  } = useMenuItems();

  const [formMode, setFormMode] = useState(null); // null | 'add' | item being edited

  const handleSubmit = (values) => {
    if (formMode === "add") {
      addItem(values);
    } else if (formMode) {
      updateItem(formMode.id, values);
    }
    setFormMode(null);
  };

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>
            Manage Menu
          </h1>
          <button
            onClick={() => setFormMode("add")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white"
            style={{ background: MUSTARD }}
          >
            <Plus size={14} /> Add item
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: STEEL }}>
          {totalCount} items in the catalog
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color={STEEL} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu items…"
              className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, color: INK, "--tw-ring-color": MUSTARD }}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border px-3 py-2.5 text-sm bg-white"
            style={{ borderColor: BORDER, color: INK }}
          >
            <option value="ALL">All categories</option>
            {MENU_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <MenuItemRow
              key={item.id}
              item={item}
              onEdit={(it) => setFormMode(it)}
              onDelete={deleteItem}
              onToggleAvailability={toggleAvailability}
            />
          ))}
          {items.length === 0 && (
            <div className="bg-white rounded-lg border shadow-sm p-8 text-center" style={{ borderColor: BORDER }}>
              <p className="text-sm" style={{ color: STEEL }}>
                No menu items match your search or filter.
              </p>
            </div>
          )}
        </div>

        {formMode && (
          <MenuItemForm
            initialValues={formMode === "add" ? null : formMode}
            onSubmit={handleSubmit}
            onCancel={() => setFormMode(null)}
          />
        )}
      </div>
    </div>
  );
}
