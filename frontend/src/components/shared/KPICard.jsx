    const INK = "#1E1B16";
const BORDER = "#D9CBAA";
const STEEL = "#5C6B66";

/**
 * @param {{ label: string, value: string | number, sub?: string, icon?: React.ComponentType, accent?: string }} props
 */
export default function KPICard({ label, value, sub, icon: Icon, accent = INK }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4" style={{ borderColor: BORDER }}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: STEEL }}>
          {label}
        </p>
        {Icon && (
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ background: `${accent}1A` }}
          >
            <Icon size={14} color={accent} />
          </div>
        )}
      </div>
      <p className="font-mono text-2xl font-bold" style={{ color: INK }}>
        {value}
      </p>
      {sub && (
        <p className="text-[11px] mt-1" style={{ color: STEEL }}>
          {sub}
        </p>
      )}
    </div>
  );
}
