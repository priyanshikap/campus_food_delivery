import { getAvailableActions } from "../../utils/orderTransitions";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const STATUS_STYLES = {
  PENDING: { bg: "#FBF1DD", color: MUSTARD },
  CONFIRMED: { bg: "#E7EEF0", color: "#2A6F77" },
  PREPARING: { bg: "#FDEFE3", color: "#B25E1F" },
  READY: { bg: "#EAF4EC", color: GREEN },
  COLLECTED: { bg: "#EFEFEF", color: STEEL },
  REJECTED: { bg: "#FBEAE6", color: RED },
};

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

export default function OrderQueueItem({ order, onTransition }) {
  const actions = getAvailableActions(order.status);
  const statusStyle = STATUS_STYLES[order.status] ?? { bg: "#EFEFEF", color: STEEL };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4" style={{ borderColor: BORDER }}>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold" style={{ color: INK }}>
              {order.id}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: statusStyle.bg, color: statusStyle.color }}
            >
              {order.status}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: STEEL }}>
            {order.customer} · placed {formatTime(order.placedAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold" style={{ color: INK }}>
            {order.pickupSlot.time}
          </p>
          <p className="text-[11px]" style={{ color: STEEL }}>
            Counter {order.pickupSlot.counter}
          </p>
        </div>
      </div>

      <div className="rounded-md px-3 py-2 mb-3" style={{ background: PAPER }}>
        {order.items.map((it, i) => (
          <div key={i} className="flex justify-between text-xs py-0.5">
            <span style={{ color: INK }}>{it.name}</span>
            <span className="font-mono" style={{ color: STEEL }}>
              × {it.qty}
            </span>
          </div>
        ))}
      </div>

      {actions.length > 0 ? (
        <div className="flex gap-2">
          {actions.map((action) => (
            <button
              key={action.nextStatus}
              onClick={() => onTransition(order.id, action.nextStatus)}
              className="flex-1 py-2 rounded-md text-xs font-semibold transition-opacity hover:opacity-90"
              style={
                action.variant === "danger"
                  ? { border: `1.5px solid ${RED}`, color: RED, background: "#FFFFFF" }
                  : { background: MUSTARD, color: "#FFFFFF" }
              }
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-center py-1" style={{ color: STEEL }}>
          No further action — order is {order.status.toLowerCase()}.
        </p>
      )}
    </div>
  );
}
