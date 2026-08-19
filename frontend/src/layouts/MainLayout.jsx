import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const STEEL = "#5C6B66";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: PAPER }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6 px-4 text-center" style={{ borderColor: BORDER }}>
        <p className="text-xs" style={{ color: STEEL }}>
          © {new Date().getFullYear()} <span style={{ color: INK, fontWeight: 600 }}>CampusBite</span> — order ahead, skip the line.
        </p>
      </footer>
    </div>
  );
}
