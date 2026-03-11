import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="app-enter flex flex-col items-center justify-center gap-5 rounded-[var(--radius-lg)] bg-gradient-to-b from-surface-muted/70 to-transparent py-20 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
        <Icon className="size-6 text-primary" aria-hidden />
      </div>
      <div className="flex max-w-sm flex-col gap-1.5">
        <h3 className="text-body font-semibold text-foreground">{title}</h3>
        <p className="text-small text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}
