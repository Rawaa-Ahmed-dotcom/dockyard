import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { DashboardPreview } from "./DashboardPreview"

export function HeroSection() {
  return (
    <section className="landing-hero-field landing-grain relative overflow-hidden pt-32 pb-24 md:pt-40">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-6 md:px-8">
        <div className="landing-reveal landing-reveal-1 flex max-w-2xl flex-col items-center gap-5 text-center">
          <h1 className="text-[40px] font-bold leading-[1.08] tracking-tight text-white sm:text-[52px] md:text-[64px]">
            Stop guessing what's on the shelf.
          </h1>
          <p className="max-w-xl text-body text-white/70 md:text-[18px]">
            DockYard tracks every product, movement, and reorder risk in one fast, calm interface — built for teams
            who run warehouses, not spreadsheets.
          </p>
        </div>

        <div className="landing-reveal landing-reveal-2 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/app"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-small font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Open the dashboard
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <a
            href="#modules"
            className="inline-flex h-12 items-center gap-1.5 rounded-full px-6 text-small font-medium text-white/80 transition-colors hover:text-white"
          >
            See what's inside
          </a>
        </div>

        <div className="landing-reveal landing-reveal-3 w-full pt-6">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}
