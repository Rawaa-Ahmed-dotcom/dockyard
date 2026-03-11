import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "skeleton-shimmer relative overflow-hidden rounded-[var(--radius-sm)] bg-surface-muted",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
