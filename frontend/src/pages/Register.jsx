import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [localError, setLocalError] = useState(null);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords don't match");
      return;
    }
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate("/menu");
    } catch {
      // error surfaced via AuthContext's `error` state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: PAPER }}>
      <div className="w-full max-w-sm bg-white rounded-lg border shadow-sm p-6" style={{ borderColor: BORDER }}>
        <h1 className="text-xl font-bold mb-1" style={{ color: INK }}>
          Create your account
        </h1>
        <p className="text-xs mb-5" style={{ color: STEEL }}>
          Order ahead, skip the line at every counter.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Full name
            </label>
            <input
              required
              value={form.name}
              onChange={handleChange("name")}
              className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={handleChange("email")}
              className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={handleChange("password")}
                className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Confirm
              </label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
              />
            </div>
          </div>

          {(localError || error) && (
            <p className="text-xs rounded-md px-3 py-2" style={{ background: "#FBEAE6", color: RED }}>
              {localError || error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: MUSTARD }}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-xs text-center mt-4" style={{ color: STEEL }}>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold" style={{ color: MUSTARD }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
