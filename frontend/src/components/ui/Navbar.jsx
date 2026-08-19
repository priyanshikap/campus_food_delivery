import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Ticket } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Pickup slots', href: '#slots' },
  { label: 'How it works', href: '#how-it-works' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper">
            <Ticket size={17} strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            CampusBite
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated && (
            <Link
              to="/orders"
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              My orders
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {user?.name || 'Profile'}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              Log in
            </Link>
          )}
          <Link
            to="/menu"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            Order now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-ink/5 bg-paper px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            {isAuthenticated && (
              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                My orders
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {user?.name || 'Profile'}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                Log in
              </Link>
            )}
            <Link
              to="/menu"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-paper"
            >
              Order now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
