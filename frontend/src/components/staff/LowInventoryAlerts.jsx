import { AlertTriangle } from "lucide-react";

const RED = "#C1442D";

export default function LowInventoryAlerts({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 mb-6" style={{ borderColor: "#D9CBAA" }}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={15} color={RED} />
        <h3 className="font-semibold text-sm" style={{ color: "#1E1B16" }}>
          Low inventory alerts
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.name}
            className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: "#FBEAE6", color: RED }}
          >
            {item.name} — {item.available === 0 ? "sold out" : `${item.available} left`}
          </span>
        ))}
      </div>
    </div>
  );
}
