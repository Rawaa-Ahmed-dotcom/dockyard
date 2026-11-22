import { cva } from "class-variance-authority"


export const badgeVariants = cva(
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