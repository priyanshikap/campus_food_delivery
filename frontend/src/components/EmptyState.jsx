import { SearchX } from 'lucide-react'

/**
 * Generic empty state block for lists with no results.
 * @param {{ icon?: React.ComponentType, title: string, description?: string, actionLabel?: string, onAction?: () => void }} props
 */
function EmptyState({ icon: Icon = SearchX, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/50 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-ink/40">
        <Icon size={20} />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink/50">{description}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
