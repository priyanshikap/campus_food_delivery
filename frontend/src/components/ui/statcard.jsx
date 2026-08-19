import '../styles/dashboard.css';

/**
 * @param {{ label: string, value: string|number, icon?: string, hint?: string }} props
 */
export default function StatCard({ label, value, icon, hint }) {
  return (
    <div className="stat-card">
      <span className="stat-card-icon" aria-hidden="true">{icon}</span>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
        {hint && <span className="stat-card-hint">{hint}</span>}
      </div>
    </div>
  );
}
