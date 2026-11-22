import {  Receipt } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { formatDateTime } from "@/lib/utils"
import type { InventoryMovement } from "@/types"
import { MOVEMENT_CONFIG } from "./movementConfig"

interface RecentTransactionsCardProps {
  transactions: InventoryMovement[]
  loading?: boolean
}

export function RecentTransactionsCard({ transactions, loading }: RecentTransactionsCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
        ) : transactions.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="No transactions yet"
            description="Stock movements will appear here as they happen."
          />
        ) : (
          transactions.map((tx) => {
            const config = MOVEMENT_CONFIG[tx.type]
            const Icon = config.icon
            return (
              <div
                key={tx.id}
                className="-mx-2 flex items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2.5 transition-colors hover:bg-accent/50"
              >
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${config.className}`}>
                  <Icon className="size-4" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-small font-medium text-foreground">{tx.productName}</p>
                  <p className="text-caption text-muted-foreground">
                    {config.label} · {tx.sku}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-small font-medium text-foreground">{tx.quantity} units</p>
                  <p className="text-caption text-muted-foreground">{formatDateTime(tx.createdAt)}</p>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
