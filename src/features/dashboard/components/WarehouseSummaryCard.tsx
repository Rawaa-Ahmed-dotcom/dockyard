import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatNumber } from "@/lib/utils"
import type { DashboardSummary } from "@/types"

interface WarehouseSummaryCardProps {
  warehouseSummary: DashboardSummary["warehouseSummary"]
  loading?: boolean
}

export function WarehouseSummaryCard({ warehouseSummary, loading }: WarehouseSummaryCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Warehouse Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)
          : warehouseSummary.map(({ warehouse, itemCount, value }) => {
              const utilizationPct = Math.min(100, Math.round((warehouse.utilized / warehouse.capacity) * 100))
              return (
                <div key={warehouse.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-col">
                      <p className="truncate text-small font-medium text-foreground">{warehouse.name}</p>
                      <p className="text-caption text-muted-foreground">
                        {formatNumber(itemCount)} units · {formatCurrency(value)}
                      </p>
                    </div>
                    <span className="shrink-0 text-caption font-medium text-muted-foreground">{utilizationPct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                      style={{ width: `${utilizationPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
      </CardContent>
    </Card>
  )
}
