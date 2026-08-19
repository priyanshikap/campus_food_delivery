import { useState } from "react";
import { User, CheckCircle2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const STEEL = "#5C6B66";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    // No backend yet — this just simulates a successful save locally.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-md mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ color: INK }}>
          Profile
        </h1>

        <div className="bg-white rounded-lg border shadow-sm p-6" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
              style={{ background: MUSTARD }}
            >
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: INK }}>
                {user.name}
              </p>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                style={{ background: PAPER, color: STEEL }}
              >
                {user.role}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Full name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color={STEEL} />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Email
              </label>
              <input
                disabled
                value={user.email}
                className="w-full px-3 py-2.5 rounded-md border text-sm bg-black/5 cursor-not-allowed"
                style={{ borderColor: BORDER, color: STEEL }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-1.5"
              style={{ background: MUSTARD }}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={15} /> Saved
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
