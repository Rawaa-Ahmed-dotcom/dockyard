import { TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { formatNumber } from "@/lib/utils"
import type { DashboardSummary } from "@/types"

interface TopMovingProductsCardProps {
  topMovingProducts: DashboardSummary["topMovingProducts"]
  loading?: boolean
}

export function TopMovingProductsCard({ topMovingProducts, loading }: TopMovingProductsCardProps) {
  const max = Math.max(1, ...topMovingProducts.map((p) => p.unitsMoved))

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Top Moving Products</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
        ) : topMovingProducts.length === 0 ? (
          <EmptyState
            icon={TrendingUp}
            title="No movement data yet"
            description="Products with the most stock activity will show up here."
          />
        ) : (
          topMovingProducts.map(({ product, unitsMoved }) => (
            <div key={product.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <p className="truncate text-small font-medium text-foreground">{product.name}</p>
                <p className="shrink-0 text-caption font-medium text-muted-foreground">
                  {formatNumber(unitsMoved)} units
                </p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-info transition-[width] duration-700 ease-out"
                  style={{ width: `${(unitsMoved / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
