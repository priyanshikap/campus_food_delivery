import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, X } from 'lucide-react'
import CategoryFilter from '../components/CategoryFilter.jsx'
import PickupSlotCard from '../components/PickupSlotCard.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import useDebounce from '../hooks/useDebounce.js'
import { formatCurrency } from '../utils/formatCurrency.js'
import { getAvailability, clampQuantity, AVAILABILITY_STATUS } from '../utils/availability.js'
import { pickupDates } from '../data/menuData.js'
import { useCart } from '../context/CartContext.jsx'
import { getMenuItems, getPickupSlots } from '../services/menuService.js'

const SKELETON_COUNT = 8

function MenuItemSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-ink/8 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="h-5 w-16 rounded-full bg-ink/8" />
        <div className="h-4 w-10 rounded bg-ink/8" />
      </div>
      <div className="mt-5 aspect-[4/3] rounded-xl bg-ink/8" />
      <div className="mt-4 h-4 w-3/4 rounded bg-ink/8" />
      <div className="mt-2 h-3 w-full rounded bg-ink/8" />
      <div className="mt-1.5 h-3 w-2/3 rounded bg-ink/8" />
      <div className="mt-4 h-4 w-1/3 rounded bg-ink/8" />
      <div className="mt-5 h-9 w-full rounded-full bg-ink/8" />
    </div>
  )
}

function Menu() {
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState([])
  const [pickupSlots, setPickupSlots] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [dateId, setDateId] = useState(pickupDates[0].id)
  const [slotId, setSlotId] = useState('s3')
  const [quantities, setQuantities] = useState({})
  const [justAddedId, setJustAddedId] = useState(null)
  const { items, addItem, pickupDate, setPickupDate, pickupSlot, setPickupSlot } = useCart()

  const debouncedSearch = useDebounce(searchTerm, 250)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([getMenuItems(), getPickupSlots()])
      .then(([items, slots]) => {
        setMenuItems(items)
        const liveSlots = slots.map((slot) => ({ ...slot, reserved: slot.ordersPlaced }))
        setPickupSlots(liveSlots)
        setSlotId((currentSlotId) =>
          liveSlots.some((slot) => slot.id === currentSlotId) ? currentSlotId : liveSlots[0]?.id ?? null,
        )
      })
      .finally(() => setIsLoading(false))
  }, [])

  const selectedDate = pickupDates.find((d) => d.id === dateId)
  const selectedSlot = pickupSlots.find((s) => s.id === slotId)

  useEffect(() => {
    if (selectedDate?.id) setPickupDate(selectedDate.id)
  }, [selectedDate, setPickupDate])

  const categories = useMemo(() => ['All', ...new Set(menuItems.map((item) => item.category))], [menuItems])

  const filteredItems = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase()
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
  }, [menuItems, debouncedSearch, activeCategory])

  function getQuantity(itemId) {
    return quantities[itemId] ?? 1
  }

  function handleQuantityChange(itemId, requestedQty, remaining) {
    const clamped = clampQuantity(requestedQty, remaining)
    setQuantities((prev) => ({ ...prev, [itemId]: clamped || 1 }))
  }

  function handleAddToCart(itemId, qty) {
    const item = menuItems.find((menuItem) => menuItem.id === itemId)
    if (item) addItem({ ...item, qty, emoji: item.emoji ?? item.name.charAt(0) })
    setJustAddedId(itemId)
    setTimeout(() => setJustAddedId((current) => (current === itemId ? null : current)), 1400)
  }

  function handleDateChange(id) {
    setDateId(id)
    setQuantities({})
    setPickupDate(id)
  }

  function handleSlotSelect(id) {
    setSlotId(id)
    setQuantities({})
    const slot = pickupSlots.find((item) => item.id === id)
    if (slot) setPickupSlot({ ...slot, counter: 'A1', ordersPlaced: slot.reserved })
  }

  function resetFilters() {
    setSearchTerm('')
    setActiveCategory('All')
  }

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="min-h-screen bg-paper pb-28">
      {/* ---------- Header ---------- */}
      <section className="border-b border-ink/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
            Main Canteen
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Menu</h1>
          <p className="mt-2 max-w-xl text-sm text-ink/55">
            Availability shown below reflects{' '}
            <span className="font-medium text-ink">
              {selectedDate?.label}, {selectedSlot?.time}
            </span>
            . Pick a different slot to see what's in stock then.
          </p>

          {/* Search */}
          <div className="relative mt-6 max-w-md">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search the menu\u2026"
              aria-label="Search the menu"
              className="w-full rounded-full border border-ink/12 bg-paper py-2.5 pl-11 pr-10 text-sm text-ink placeholder:text-ink/35 focus:border-ink/30 focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-ink/40 hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* ---------- Pickup date selector ---------- */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40">Pickup date</p>
          <div className="mt-3 flex gap-2">
            {pickupDates.map((date) => {
              const isActive = date.id === dateId
              return (
                <button
                  key={date.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleDateChange(date.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    isActive
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/12 bg-white text-ink/65 hover:border-ink/25 hover:text-ink'
                  }`}
                >
                  {date.label}
                  <span className={`ml-1.5 font-mono text-xs ${isActive ? 'text-paper/60' : 'text-ink/35'}`}>
                    {date.date}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ---------- Pickup slot selector ---------- */}
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40">Pickup slot</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {pickupSlots.map((slot) => (
              <PickupSlotCard
                key={slot.id}
                slot={slot}
                selected={slot.id === slotId}
                onSelect={handleSlotSelect}
              />
            ))}
          </div>
        </div>

        {/* ---------- Category filter ---------- */}
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40">Category</p>
          <div className="mt-3">
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>

        {/* ---------- Results ---------- */}
        <div className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <MenuItemSkeleton key={i} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <EmptyState
              icon={Search}
              title="Nothing matches your search"
              description="Try a different keyword or clear your filters to see the full menu."
              actionLabel="Clear filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredItems.map((item) => {
                const availability = getAvailability(item, dateId, slotId)
                const quantity = getQuantity(item.id)
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    availability={availability}
                    quantity={quantity}
                    justAdded={justAddedId === item.id}
                    onQuantityChange={(itemId, requestedQty) =>
                      handleQuantityChange(itemId, requestedQty, availability.remaining ?? 0)
                    }
                    onAddToCart={(itemId) => handleAddToCart(itemId, quantity)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ---------- Floating cart bar ---------- */}
      {cartCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <ShoppingBag size={17} />
              {cartCount} item{cartCount > 1 ? 's' : ''} &middot; {formatCurrency(cartTotal)}
            </span>
            <Link
              to="/cart"
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              View cart
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
