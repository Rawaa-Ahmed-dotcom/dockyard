import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Box,
  DollarSign,
  LayoutDashboard,
  Lock,
  Package,
  Truck,
  Warehouse as WarehouseIcon,
} from "lucide-react"

import { formatCurrency, formatNumber } from "@/lib/utils"
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { RecentTransactionsCard } from "@/features/dashboard/components/RecentTransactionsCard"

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Products", icon: Package, active: false },
  { label: "Inventory", icon: ArrowLeftRight, active: false },
  { label: "Suppliers", icon: Truck, active: false },
  { label: "Warehouses", icon: WarehouseIcon, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
]

/**
 * A truthful proof, not a mockup: this renders the real dashboard stat cards,
 * transaction feed, and top nav, wired to the same live data and shell as
 * /app, inside a decorative browser-chrome frame. Non-interactive — the real
 * thing lives one click away.
 */
export function DashboardPreview() {
  const { data, isLoading } = useDashboardSummary()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none mx-auto w-full max-w-[860px] overflow-hidden rounded-[20px] border border-white/10 bg-surface shadow-[0_30px_80px_-20px_rgba(11,7,16,0.7)]"
    >
      {/* Browser chrome */}
      <div className="flex h-10 items-center gap-3 border-b border-border bg-surface-muted px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="mx-auto flex h-6 w-56 items-center justify-center gap-1.5 rounded-full bg-surface text-caption text-muted-foreground">
          <Lock className="size-3" />
          dockyard.app/app
        </div>
      </div>

      {/* Decorative top nav, mirroring the real Topbar */}
      <div className="hidden items-center gap-1 border-b border-border px-4 py-2 sm:flex">
        <div className="mr-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Box className="size-3.5" />
        </div>
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className={
              active
                ? "flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-caption font-medium text-background"
                : "flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium text-muted-foreground"
            }
          >
            <Icon className="size-3" />
            {label}
          </div>
        ))}
      </div>

      {/* Real dashboard content */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-6">
        <div>
          <p className="text-small font-semibold text-foreground">Dashboard</p>
          <p className="text-caption text-muted-foreground">Your operational overview for today.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Total Products"
            value={data ? formatNumber(data.totalProducts) : "—"}
            icon={Package}
            loading={isLoading}
          />
          <StatCard
            label="Inventory Value"
            value={data ? formatCurrency(data.inventoryValue) : "—"}
            icon={DollarSign}
            loading={isLoading}
          />
          <StatCard
            label="Low Stock Items"
            value={data ? formatNumber(data.lowStockCount) : "—"}
            icon={AlertTriangle}
            tone="warning"
            loading={isLoading}
          />
        </div>

        <RecentTransactionsCard transactions={data?.recentTransactions.slice(0, 4) ?? []} loading={isLoading} />
      </div>
    </div>
  )
}
