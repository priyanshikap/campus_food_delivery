import { AVAILABILITY_STATUS } from '../utils/availability'

const CONFIG = {
  [AVAILABILITY_STATUS.SELECT_SLOT]: {
    dot: 'bg-ink/25',
    text: 'text-ink/45',
    label: 'Select a pickup slot',
  },
  [AVAILABILITY_STATUS.AVAILABLE]: {
    dot: 'bg-pine animate-pulse-dot',
    text: 'text-ink/55',
    label: (remaining) => `${remaining} left this slot`,
  },
  [AVAILABILITY_STATUS.LOW]: {
    dot: 'bg-brass animate-pulse-dot',
    text: 'text-brass-dark',
    label: (remaining) => `Only ${remaining} left`,
  },
  [AVAILABILITY_STATUS.SOLD_OUT]: {
    dot: 'bg-rust',
    text: 'text-rust',
    label: 'Sold out for this slot',
  },
  [AVAILABILITY_STATUS.UNAVAILABLE]: {
    dot: 'bg-ink/25',
    text: 'text-ink/45',
    label: 'Temporarily unavailable',
  },
}

/**
 * Small status indicator showing an item's live availability.
 * @param {{ status: string, remaining: number|null }} props
 */
function InventoryBadge({ status, remaining }) {
  const config = CONFIG[status] ?? CONFIG[AVAILABILITY_STATUS.UNAVAILABLE]
  const label = typeof config.label === 'function' ? config.label(remaining) : config.label

  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {label}
    </span>
  )
}

export default InventoryBadge
