import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  ScanLine,
  CalendarClock,
  PackageCheck,
  Radio,
  ShieldCheck,
  Timer,
  Fingerprint,
  Ticket,
} from 'lucide-react'
import FoodCard from '../components/ui/FoodCard.jsx'
import PickupSlotCard from '../components/PickupSlotCard.jsx'
import { popularFoods, pickupSlots, howItWorks, benefits } from '../data/mockData.js'

const STEP_ICONS = [ScanLine, CalendarClock, Fingerprint, PackageCheck]

function Home() {
  return (
    <div className="min-h-screen bg-paper">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-paper-glow bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-28 lg:pt-24">
          {/* Left: copy */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink/60">
              <Radio size={12} className="text-pine" />
              Live across 4 campus counters
            </span>

            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[64px]">
              Skip the queue.
              <br />
              <span className="italic text-brass-dark">Pick up smarter.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
              Order between classes, reserve a pickup slot, and walk straight
              to the counter. CampusBite holds your food the moment you check out
              &mdash; no line, no guessing.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                Order now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-transparent px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
              >
                View menu
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-8 border-t border-ink/8 pt-6">
              <div>
                <p className="font-display text-2xl font-semibold text-ink">6&ndash;9 min</p>
                <p className="mt-0.5 text-xs text-ink/50">avg. wait, gate to grab</p>
              </div>
              <div className="h-8 w-px bg-ink/10" />
              <div>
                <p className="font-display text-2xl font-semibold text-ink">98%</p>
                <p className="mt-0.5 text-xs text-ink/50">orders ready on time</p>
              </div>
            </div>
          </div>

          {/* Right: signature Pickup Pass ticket */}
          <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:150ms]">
            <div className="relative overflow-hidden rounded-[28px] bg-ticket-fade p-7 text-paper shadow-ticket">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-display text-base font-semibold">
                  <Ticket size={16} className="text-brass" />
                  Pickup Pass
                </span>
                <span className="rounded-full border border-paper/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/80">
                  Reserved
                </span>
              </div>

              <div className="mt-7 space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Order</p>
                  <p className="mt-1 font-display text-lg">Paneer Tikka Wrap &times;1</p>
                  <p className="font-display text-lg">Cold Coffee &times;1</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Slot</p>
                    <p className="mt-1 font-mono text-xl">12:30 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Counter</p>
                    <p className="mt-1 font-mono text-xl">B2</p>
                  </div>
                </div>
              </div>

              {/* perforation */}
              <div className="relative my-6 h-px w-full bg-paper/15">
                <span className="absolute -left-7 -top-3 h-6 w-6 rounded-full bg-paper" />
                <span className="absolute -right-7 -top-3 h-6 w-6 rounded-full bg-paper" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-6 w-[3px] rounded-sm bg-paper/70"
                      style={{ opacity: i % 3 === 0 ? 0.9 : 0.35 }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] text-paper/50">#CB-4471</span>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-ink/40">
              Your pass, generated the moment inventory is reserved.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Live availability preview ---------- */}
      <section id="slots" className="border-y border-ink/8 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Today &middot; Main Canteen
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                Live pickup availability
              </h2>
            </div>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-ink"
            >
              How reservations work
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pickupSlots.map((slot) => (
              <PickupSlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-lg">
            <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
              The workflow
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Four steps between you and lunch
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <div
                  key={item.step}
                  className="group relative rounded-2xl border border-ink/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper transition-colors group-hover:bg-brass">
                      <Icon size={17} />
                    </span>
                    <span className="font-mono text-3xl font-semibold text-ink/10">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Popular food ---------- */}
      <section className="border-y border-ink/8 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
                From the counter
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Popular right now
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-ink"
            >
              View full menu
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Benefits ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Why CampusBite
              </span>
              <h2 className="mt-2 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
                Built around your timetable, not the other way around.
              </h2>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-5">
                <ShieldCheck size={20} className="shrink-0 text-pine" />
                <p className="text-sm text-ink/60">
                  Every reservation locks real inventory &mdash; what you see
                  is what gets made.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-ink/8 bg-white p-6 transition-colors hover:border-brass/40"
                >
                  <Timer size={18} className="text-brass-dark" />
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ticket-fade px-8 py-16 text-center text-paper sm:px-16">
          <span className="font-mono text-xs uppercase tracking-widest text-paper/50">
            Ready when you are
          </span>
          <h2 className="mx-auto mt-4 max-w-xl text-balance font-display text-3xl font-semibold sm:text-4xl">
            Your next lunch break just got a lot shorter.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Order now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              View menu
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-ink/8 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
            <div className="max-w-xs">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper">
                  <Ticket size={15} />
                </span>
                <span className="font-display text-base font-semibold text-ink">
                  CampusBite
                </span>
              </span>
              <p className="mt-3 text-sm text-ink/50">
                Pre-order and pickup for campus dining &mdash; no line, ever.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">Product</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/60">
                  <li><a href="#slots" className="hover:text-ink">Pickup slots</a></li>
                  <li><Link to="/menu" className="hover:text-ink">Menu</Link></li>
                  <li><a href="#how-it-works" className="hover:text-ink">How it works</a></li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">Campus</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/60">
                  <li><Link to="/register" className="hover:text-ink">Student sign up</Link></li>
                  <li><Link to="/login" className="hover:text-ink">Staff login</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">Support</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/60">
                  <li><a href="mailto:hello@campusbite.app" className="hover:text-ink">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-ink/8 pt-6 text-xs text-ink/40 sm:flex-row sm:justify-between">
            <span>&copy; {new Date().getFullYear()} CampusBite. Built for campus dining.</span>
            <span>Footprints on fewer lines, one slot at a time.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
