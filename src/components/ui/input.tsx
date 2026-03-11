import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-1 text-small text-foreground shadow-none transition-colors outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger aria-invalid:focus-visible:ring-[color-mix(in_oklch,var(--danger)_50%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
