import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Transparent over the hero field, solidifies once the page scrolls past it —
 * legibility-driven, not decorative: the same nav has to read on a dark
 * gradient and on white.
 */
export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-colors duration-300 md:px-8",
        scrolled ? "border-b border-border bg-surface" : "border-b border-transparent bg-transparent"
      )}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src="/favicon.svg" alt="" className="size-7" />
        <span className={cn("text-small font-semibold tracking-tight", scrolled ? "text-foreground" : "text-white")}>
          DockYard
        </span>
      </Link>

      <Link
        to="/app"
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-small font-medium transition-colors",
          scrolled
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "bg-white text-primary hover:bg-white/90"
        )}
      >
        Open Dashboard
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </header>
  )
}
