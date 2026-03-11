import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function FinalCtaSection() {
  return (
    <section className="landing-hero-field landing-grain relative overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 py-24 text-center md:px-8">
        <h2 className="max-w-lg text-[32px] font-bold leading-[1.15] tracking-tight text-white md:text-[40px]">
          Your inventory, one tab away.
        </h2>
        <p className="max-w-md text-body text-white/70">
          No account to create. No setup to finish. The dashboard is already running.
        </p>
        <Link
          to="/app"
          className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-small font-semibold text-primary transition-colors hover:bg-white/90"
        >
          Open the dashboard
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
