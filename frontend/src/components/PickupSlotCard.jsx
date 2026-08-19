import { Check } from 'lucide-react'

/**
 * Displays a single pickup slot with a live capacity indicator,
 * styled after a departure-board row.
 *
 * Renders as a static row by default (used on the Home preview).
 * Pass `onSelect` to make it an interactive, selectable slot picker
 * (used on the Menu page) \u2014 existing callers that omit it are unaffected.
 *
 * @param {{
 *   slot: { id: string, time: string, window: string, capacity: number, reserved: number },
 *   selected?: boolean,
 *   onSelect?: (slotId: string) => void,
 * }} props
 */
function PickupSlotCard({ slot, selected = false, onSelect }) {
  const pct = Math.min(100, Math.round((slot.reserved / slot.capacity) * 100))
  const full = slot.reserved >= slot.capacity
  const statusLabel = full ? 'Full' : pct >= 75 ? 'Filling fast' : 'Open'
  const statusColor = full ? 'text-rust' : pct >= 75 ? 'text-brass-dark' : 'text-pine'
  const barColor = full ? 'bg-rust' : pct >= 75 ? 'bg-brass' : 'bg-pine'
  const isSelectable = typeof onSelect === 'function'

  const content = (
    <>
      <div className="flex items-center gap-2.5">
        {isSelectable && (
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
              selected ? 'border-ink bg-ink text-paper' : 'border-ink/20 text-transparent'
            }`}
          >
            <Check size={12} strokeWidth={3} />
          </span>
        )}
        <div>
          <p className="font-mono text-base font-semibold text-ink">{slot.time}</p>
          <p className="mt-0.5 font-mono text-xs text-ink/40">{slot.window}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-end gap-1.5">
        <span className={`flex items-center gap-1.5 text-xs font-medium ${statusColor}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${barColor} ${!full ? 'animate-pulse-dot' : ''}`} />
          {statusLabel}
        </span>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink/8 sm:w-32">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </>
  )

  if (isSelectable) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        disabled={full}
        onClick={() => onSelect(slot.id)}
        className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50 ${
          selected
            ? 'border-ink bg-ink/[0.03] shadow-card'
            : 'border-ink/8 bg-white hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-card'
        }`}
      >
        {content}
      </button>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-ink/8 bg-white px-5 py-4 transition-colors hover:border-ink/15">
      {content}
    </div>
  )
}

export default PickupSlotCard
