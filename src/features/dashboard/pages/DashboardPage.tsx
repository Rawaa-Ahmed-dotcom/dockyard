import { AlertTriangle, DollarSign, Package } from "lucide-react"

import { PageHeader } from "@/components/layout/PageHeader"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary"
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { RecentTransactionsCard } from "@/features/dashboard/components/RecentTransactionsCard"
import { WarehouseSummaryCard } from "@/features/dashboard/components/WarehouseSummaryCard"
import { TopMovingProductsCard } from "@/features/dashboard/components/TopMovingProductsCard"

export function DashboardPage() {
  const { data, isLoading } = useDashboardSummary()
  const { data: analytics } = useAnalytics()

  const valueWeekAgo = analytics?.valueTrend.at(-8)?.value
  const valueDelta =
    valueWeekAgo && valueWeekAgo > 0 && data
      ? { percent: ((data.inventoryValue - valueWeekAgo) / valueWeekAgo) * 100, comparedTo: "vs. 7 days ago" }
      : undefined

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" description="Your operational overview for today." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Products"
          value={data ? formatNumber(data.totalProducts) : "—"}
          icon={Package}
          loading={isLoading}
          href="/app/products"
        />
        <StatCard
          label="Inventory Value"
          value={data ? formatCurrency(data.inventoryValue) : "—"}
          icon={DollarSign}
          loading={isLoading}
          delta={valueDelta}
          href="/app/analytics"
        />
        <StatCard
          label="Low Stock Items"
          value={data ? formatNumber(data.lowStockCount) : "—"}
          icon={AlertTriangle}
          tone="warning"
          loading={isLoading}
          href="/app/products?status=low-stock"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentTransactionsCard transactions={data?.recentTransactions ?? []} loading={isLoading} />
        </div>
        <TopMovingProductsCard topMovingProducts={data?.topMovingProducts ?? []} loading={isLoading} />
      </div>

      <WarehouseSummaryCard warehouseSummary={data?.warehouseSummary ?? []} loading={isLoading} />
    </div>
  )
}
