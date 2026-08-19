import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu as MenuIcon, X, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import CartDrawer from "./CartDrawer";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const STEEL = "#5C6B66";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/orders", label: "My Orders" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? MUSTARD : STEEL,
    fontWeight: isActive ? 700 : 500,
  });

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg tracking-tight" style={{ color: INK }}>
            Campus<span style={{ color: MUSTARD }}>Bite</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} style={linkStyle} className="text-sm">
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative p-2 rounded-md hover:bg-black/5"
            >
              <ShoppingBag size={19} color={INK} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                  style={{ background: MUSTARD }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md hover:bg-black/5"
                  style={{ color: INK }}
                >
                  <User size={14} /> {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  aria-label="Log out"
                  className="p-2 rounded-md hover:bg-black/5"
                >
                  <LogOut size={15} color={STEEL} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block text-xs font-semibold px-3 py-2 rounded-md text-white"
                style={{ background: MUSTARD }}
              >
                Sign in
              </Link>
            )}

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-md hover:bg-black/5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={19} color={INK} /> : <MenuIcon size={19} color={INK} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t px-4 py-3 space-y-2" style={{ borderColor: BORDER, background: PAPER }}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={linkStyle}
                className="block text-sm py-1.5"
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block text-sm py-1.5" style={{ color: STEEL }}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                    navigate("/");
                  }}
                  className="block text-sm py-1.5 text-left"
                  style={{ color: STEEL }}
                >
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm py-1.5 font-semibold" style={{ color: MUSTARD }}>
                Sign in
              </Link>
            )}
          </div>
        )}
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
