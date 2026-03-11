import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-caption font-medium leading-4 border",
  {
    variants: {
      variant: {
        neutral: "bg-surface-muted text-muted-foreground border-border",
        success: "bg-success-bg text-success border-transparent",
        warning: "bg-warning-bg text-warning border-transparent",
        danger: "bg-danger-bg text-danger border-transparent",
        info: "bg-info-bg text-info border-transparent",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot && (
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-current opacity-70"
        />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
