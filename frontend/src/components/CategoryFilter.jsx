/**
 * Horizontal, scrollable category filter chip row.
 * @param {{ categories: string[], active: string, onChange: (category: string) => void }} props
 */
function CategoryFilter({ categories, active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filter menu by category"
      className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
              isActive
                ? 'border-ink bg-ink text-paper'
                : 'border-ink/12 bg-white text-ink/65 hover:border-ink/25 hover:text-ink'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
