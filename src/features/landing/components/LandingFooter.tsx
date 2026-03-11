import { Box } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 text-center sm:flex-row sm:text-left md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-[var(--radius-sm)] bg-primary text-primary-foreground">
            <Box className="size-3.5" />
          </div>
          <span className="text-small font-medium text-foreground">DockYard</span>
        </div>
        <p className="text-caption text-muted-foreground">
          The operational command center for inventory. Running on demo data — changes reset on reload.
        </p>
      </div>
    </footer>
  )
}
