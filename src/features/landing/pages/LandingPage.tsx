/**
 * DIRECTION CONTRACT
 * THESIS: the proof is the product — the hero shows the real dashboard, live, framed like a browser
 *   tab, instead of a mood board or claims about the software.
 * OWN-WORLD: DockYard's true brand (purple/blue mark, Inter) gets page-scale permission it doesn't have
 *   inside the app — two dark gradient-field "bookends" (hero, final CTA) around a calm light section
 *   that reuses the app's real Operate-mode components and live data.
 * STORY: an SMB ops lead sees the actual dashboard in five seconds, sees the other five modules proven
 *   with their own live data, and clicks straight into the running app — no signup, no fabricated proof.
 * FIRST VIEWPORT: transparent nav over a dark purple/blue gradient field; centered headline + CTA; the
 *   real DashboardPreview bleeding past the fold below it.
 * FORM: precisely-specified, brief-pinned (reference screenshots + locked brand commitments) — shaped
 *   directly per new-work.md rather than run through the concept-seed roulette.
 */
import { LandingNav } from "@/features/landing/components/LandingNav"
import { HeroSection } from "@/features/landing/components/HeroSection"
import { ModulesSection } from "@/features/landing/components/ModulesSection"
import { FinalCtaSection } from "@/features/landing/components/FinalCtaSection"
import { LandingFooter } from "@/features/landing/components/LandingFooter"

export function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <LandingNav />
      <main>
        <HeroSection />
        <ModulesSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
