import { Clock } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

/**
 * Displays a single popular food item.
 * @param {{ food: { id: string, name: string, category: string, price: number, prepTime: string, tag: string, remaining: number } }} props
 */
function FoodCard({ food }) {
  const lowStock = food.remaining <= 8

  return (
    <div className="group rounded-2xl border border-ink/8 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-brass/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brass-dark">
          {food.tag}
        </span>
        <span className="font-mono text-xs text-ink/40">{food.category}</span>
      </div>

      <div className="mt-6 flex aspect-[4/3] items-center justify-center rounded-xl bg-paper-dim text-ink/15">
        <span className="font-display text-3xl">{food.name.charAt(0)}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{food.name}</h3>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-base font-semibold text-ink">
          {formatCurrency(food.price)}
        </span>
        <span className="flex items-center gap-1 text-xs text-ink/50">
          <Clock size={13} />
          {food.prepTime}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <span
          className={`h-1.5 w-1.5 rounded-full ${lowStock ? 'bg-rust' : 'bg-pine'}`}
        />
        <span className={lowStock ? 'text-rust' : 'text-ink/50'}>
          {food.remaining} left this slot
        </span>
      </div>
    </div>
  )
}

export default FoodCard
