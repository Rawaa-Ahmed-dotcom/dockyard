import { PageHeader } from "@/components/layout/PageHeader"
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics"
import { InventoryValueTrendChart } from "@/features/analytics/components/InventoryValueTrendChart"
import { ProductDistributionChart } from "@/features/analytics/components/ProductDistributionChart"
import { StockMovementTrendChart } from "@/features/analytics/components/StockMovementTrendChart"
import { LowStockReportCard } from "@/features/analytics/components/LowStockReportCard"

export function AnalyticsPage() {
  const { data, isLoading } = useAnalytics()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Analytics" description="Trends and reports to help you plan ahead." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <InventoryValueTrendChart data={data?.valueTrend ?? []} loading={isLoading} />
        <ProductDistributionChart data={data?.distribution ?? []} loading={isLoading} />
      </div>

      <StockMovementTrendChart data={data?.movementTrend ?? []} loading={isLoading} />

      <LowStockReportCard products={data?.lowStockProducts ?? []} loading={isLoading} />
    </div>
  )
}
