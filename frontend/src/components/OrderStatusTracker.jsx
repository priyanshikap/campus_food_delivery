import '../styles/dashboard.css';

const STEPS = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COLLECTED'];

/**
 * Punched-ticket style progress rail.
 * @param {{ status: 'PENDING'|'CONFIRMED'|'PREPARING'|'READY'|'COLLECTED' }} props
 */
export default function OrderStatusTracker({ status }) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <ol className="ost-rail" aria-label="Order progress">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'upcoming';
        const isLast = i === STEPS.length - 1;
        return (
          <li key={step} className={`ost-step ost-${state}`}>
            <span className="ost-node">
              <span className="ost-node-inner">{state === 'done' ? '✓' : i + 1}</span>
            </span>
            <span className="ost-label">{step.charAt(0) + step.slice(1).toLowerCase()}</span>
            {!isLast && (
              <span
                className={`ost-connector ${i < currentIndex ? 'ost-connector-done' : ''}`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
