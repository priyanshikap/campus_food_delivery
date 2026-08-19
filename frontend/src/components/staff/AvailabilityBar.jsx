const PAPER = "#EFE7D8";
const GREEN = "#2F7D4F";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const COLOR_BY_STATUS = {
  AVAILABLE: GREEN,
  "LOW STOCK": MUSTARD,
  "SOLD OUT": RED,
  "TEMPORARILY UNAVAILABLE": STEEL,
};

export default function AvailabilityBar({ percent, status }) {
  const color = COLOR_BY_STATUS[status] ?? STEEL;
  return (
    <div className="w-full">
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: PAPER }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  );
}
