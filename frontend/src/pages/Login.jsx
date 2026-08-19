import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const ROLE_HOME = { student: "/menu", staff: "/staff", admin: "/admin" };

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = await login(email, password);
      const from = location.state?.from?.pathname;
      navigate(from || ROLE_HOME[session.role] || "/");
    } catch {
      // error is already surfaced via AuthContext's `error` state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: PAPER }}>
      <div className="w-full max-w-sm bg-white rounded-lg border shadow-sm p-6" style={{ borderColor: BORDER }}>
        <h1 className="text-xl font-bold mb-1" style={{ color: INK }}>
          Sign in
        </h1>
        <p className="text-xs mb-5" style={{ color: STEEL }}>
          Welcome back to CampusBite.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
            />
          </div>

          {error && (
            <p className="text-xs rounded-md px-3 py-2" style={{ background: "#FBEAE6", color: RED }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: MUSTARD }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 rounded-md px-3 py-2.5 text-[11px] leading-relaxed" style={{ background: PAPER, color: STEEL }}>
          Demo accounts (password: <span className="font-mono">password123</span>):<br />
          student@campusbite.com · staff@campusbite.com · admin@campusbite.com
        </div>

        <p className="text-xs text-center mt-4" style={{ color: STEEL }}>
          New here?{" "}
          <Link to="/register" className="font-semibold" style={{ color: MUSTARD }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
