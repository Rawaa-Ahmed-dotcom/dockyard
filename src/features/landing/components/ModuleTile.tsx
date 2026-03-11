import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ModuleTileProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  children: ReactNode
}

export function ModuleTile({ icon: Icon, title, description, className, children }: ModuleTileProps) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-6 rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_16px_32px_-16px_rgba(34,20,50,0.14)]",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-4" aria-hidden />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-small font-semibold text-foreground">{title}</h3>
          <p className="text-caption text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  )
}
