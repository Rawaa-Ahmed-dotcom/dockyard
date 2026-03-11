import { ArrowDown, ArrowRight, ArrowUp, type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface StatCardDelta {
  /** Percentage change vs. the comparison point, e.g. 4.2 or -1.8. */
  percent: number
  /** What the delta is measured against, e.g. "vs. 7 days ago". */
  comparedTo: string
}

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  tone?: "default" | "warning"
  loading?: boolean
  delta?: StatCardDelta
  /** When set, the whole card becomes a link — used on the real dashboard, never in the decorative landing preview. */
  href?: string
}

export function StatCard({ label, value, icon: Icon, tone = "default", loading, delta, href }: StatCardProps) {
  if (loading) {
    return (
      <Card className="flex flex-col gap-3 p-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20" />
      </Card>
    )
  }

  const isPositive = (delta?.percent ?? 0) >= 0

  const body = (
    <>
      <div className="flex flex-col gap-1.5">
        <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-h2 font-semibold tracking-tight text-foreground">{value}</p>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-caption font-medium",
                isPositive ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
              )}
            >
              {isPositive ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
              {Math.abs(delta.percent).toFixed(1)}%
            </span>
          )}
        </div>
        {delta && <p className="text-caption text-muted-foreground">{delta.comparedTo}</p>}
      </div>
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] transition-colors",
          tone === "warning" ? "bg-warning-bg text-warning" : "bg-primary/10 text-primary"
        )}
      >
        <Icon className="size-5" aria-hidden />
      </div>
    </>
  )

  if (href) {
    return (
      <Card hoverable className="group relative flex items-start justify-between gap-4 p-6" asChild>
        <Link to={href} aria-label={`${label}: view details`}>
          {body}
          <ArrowRight
            className="pointer-events-none absolute bottom-4 right-4 size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
        </Link>
      </Card>
    )
  }

  return <Card className="flex items-start justify-between gap-4 p-6">{body}</Card>
}
