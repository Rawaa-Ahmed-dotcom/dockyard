import { ArrowLeftRight } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { formatDateTime } from "@/lib/utils"
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary"
import { MOVEMENT_CONFIG } from "@/features/dashboard/components/RecentTransactionsCard"
import { ModuleTile } from "./ModuleTile"

export function ModuleInventory({ className }: { className?: string }) {
  const { data, isLoading } = useDashboardSummary()

  return (
    <ModuleTile
      icon={ArrowLeftRight}
      title="Inventory"
      description="Stock in, stock out, adjustments, and transfers — every movement logged."
      className={className}
    >
      <div className="flex flex-col">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="my-1 h-10 w-full" />)
          : data?.recentTransactions.slice(0, 3).map((tx) => {
              const config = MOVEMENT_CONFIG[tx.type]
              const Icon = config.icon
              return (
                <div key={tx.id} className="flex items-center gap-3 border-b border-border py-2.5 last:border-0">
                  <div className={`flex size-7 shrink-0 items-center justify-center rounded-full ${config.className}`}>
                    <Icon className="size-3.5" aria-hidden />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-small font-medium text-foreground">{tx.productName}</p>
                    <p className="text-caption text-muted-foreground">{formatDateTime(tx.createdAt)}</p>
                  </div>
                  <p className="shrink-0 text-caption font-medium text-muted-foreground">{tx.quantity} units</p>
                </div>
              )
            })}
      </div>
    </ModuleTile>
  )
}
