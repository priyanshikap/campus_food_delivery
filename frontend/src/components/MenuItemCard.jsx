import { Minus, Plus, Clock, Check, Ban } from 'lucide-react'
import { formatCurrency } from '../utils/formatCurrency'
import { AVAILABILITY_STATUS } from '../utils/availability'
import InventoryBadge from './InventoryBadge.jsx'

/**
 * Menu item card: shows availability for the selected date/slot, a
 * quantity stepper bounded by what's in stock, and an Add to Cart action.
 * Contains no inventory math itself \u2014 it only renders values it's given
 * and calls back up to the page for any state changes.
 *
 * @param {{
 *   item: object,
 *   availability: { status: string, remaining: number|null },
 *   quantity: number,
 *   onQuantityChange: (itemId: string, quantity: number) => void,
 *   onAddToCart: (itemId: string) => void,
 *   justAdded: boolean,
 * }} props
 */
function MenuItemCard({ item, availability, quantity, onQuantityChange, onAddToCart, justAdded }) {
  const { status, remaining } = availability
  const isBlocked = status === AVAILABILITY_STATUS.SOLD_OUT || status === AVAILABILITY_STATUS.UNAVAILABLE
  const needsSlot = status === AVAILABILITY_STATUS.SELECT_SLOT
  const canAdjust = !isBlocked && !needsSlot
  const atMax = canAdjust && quantity >= Math.min(remaining ?? 0, 6)

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white p-5 shadow-card transition-all duration-300 ${
        isBlocked ? 'border-ink/8' : 'border-ink/8 hover:-translate-y-1 hover:shadow-card-hover'
      }`}
    >
      <div className="flex items-start justify-between">
        {item.tag ? (
          <span className="rounded-full bg-brass/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brass-dark">
            {item.tag}
          </span>
        ) : (
          <span />
        )}
        <span className="font-mono text-xs text-ink/40">{item.category}</span>
      </div>

      <div
        className={`relative mt-5 flex aspect-[4/3] items-center justify-center rounded-xl bg-paper-dim text-ink/15 ${
          isBlocked ? 'grayscale' : ''
        }`}
      >
        <span className="font-display text-3xl">{item.name.charAt(0)}</span>
        {isBlocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-paper/70">
            <span className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper">
              <Ban size={13} />
              {status === AVAILABILITY_STATUS.SOLD_OUT ? 'Sold out' : 'Unavailable'}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink/55">{item.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-base font-semibold text-ink">
          {formatCurrency(item.price)}
        </span>
        <span className="flex items-center gap-1 text-xs text-ink/50">
          <Clock size={13} />
          {item.prepTime}
        </span>
      </div>

      <div className="mt-3">
        <InventoryBadge status={status} remaining={remaining} />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <div
          className={`flex items-center rounded-full border ${
            canAdjust ? 'border-ink/15' : 'border-ink/8 opacity-40'
          }`}
        >
          <button
            type="button"
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={!canAdjust || quantity <= 1}
            onClick={() => onQuantityChange(item.id, quantity - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={14} />
          </button>
          <span
            aria-live="polite"
            className="w-6 text-center font-mono text-sm font-semibold text-ink"
          >
            {canAdjust ? quantity : 0}
          </span>
          <button
            type="button"
            aria-label={`Increase quantity of ${item.name}`}
            disabled={!canAdjust || atMax}
            onClick={() => onQuantityChange(item.id, quantity + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          type="button"
          disabled={!canAdjust}
          aria-label={`Add ${item.name} to cart`}
          onClick={() => onAddToCart(item.id)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed ${
            !canAdjust
              ? 'bg-ink/8 text-ink/35'
              : justAdded
                ? 'bg-pine text-white'
                : 'bg-ink text-paper hover:-translate-y-0.5 hover:shadow-card'
          }`}
        >
          {justAdded ? (
            <>
              <Check size={15} />
              Added
            </>
          ) : needsSlot ? (
            'Pick a slot'
          ) : (
            'Add to cart'
          )}
        </button>
      </div>
    </div>
  )
}

export default MenuItemCard
