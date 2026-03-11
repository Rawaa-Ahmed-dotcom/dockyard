import { db, delay } from "@/services/db"
import type { Product } from "@/types"

export interface ValueTrendPoint {
  date: string
  value: number
}

export interface CategoryDistributionPoint {
  category: string
  count: number
  value: number
}

export interface MovementTrendPoint {
  date: string
  stockIn: number
  stockOut: number
}

export interface AnalyticsData {
  valueTrend: ValueTrendPoint[]
  distribution: CategoryDistributionPoint[]
  movementTrend: MovementTrendPoint[]
  lowStockProducts: Product[]
}

function dayLabel(daysAgo: number): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const currentValue = db.products.reduce((sum, p) => sum + p.quantity * p.costPrice, 0)

  // Synthetic 14-day trend that resolves to the current inventory value.
  const days = 14
  const valueTrend: ValueTrendPoint[] = Array.from({ length: days }).map((_, i) => {
    const daysAgo = days - 1 - i
    const wave = Math.sin(i / 2.3) * 0.035 + Math.cos(i / 4) * 0.02
    const drift = (i / days) * 0.06 - 0.03
    const factor = 1 - drift + wave
    return { date: dayLabel(daysAgo), value: Math.max(0, Math.round(currentValue * factor)) }
  })
  valueTrend[valueTrend.length - 1] = { date: dayLabel(0), value: Math.round(currentValue) }

  const distributionMap = new Map<string, { count: number; value: number }>()
  for (const product of db.products) {
    const entry = distributionMap.get(product.category) ?? { count: 0, value: 0 }
    entry.count += 1
    entry.value += product.quantity * product.costPrice
    distributionMap.set(product.category, entry)
  }
  const distribution: CategoryDistributionPoint[] = [...distributionMap.entries()]
    .map(([category, v]) => ({ category, ...v }))
    .sort((a, b) => b.value - a.value)

  const movementByDay = new Map<string, { stockIn: number; stockOut: number }>()
  for (let i = 13; i >= 0; i--) {
    movementByDay.set(dayLabel(i), { stockIn: 0, stockOut: 0 })
  }
  for (const movement of db.movements) {
    const daysAgo = Math.floor((Date.now() - new Date(movement.createdAt).getTime()) / (24 * 60 * 60 * 1000))
    if (daysAgo < 0 || daysAgo > 13) continue
    const label = dayLabel(daysAgo)
    const entry = movementByDay.get(label)
    if (!entry) continue
    if (movement.type === "stock-in") entry.stockIn += movement.quantity
    if (movement.type === "stock-out") entry.stockOut += movement.quantity
  }
  const movementTrend: MovementTrendPoint[] = [...movementByDay.entries()].map(([date, v]) => ({ date, ...v }))

  const lowStockProducts = db.products
    .filter((p) => p.status === "low-stock" || p.status === "out-of-stock")
    .sort((a, b) => a.quantity - b.quantity)

  return delay({ valueTrend, distribution, movementTrend, lowStockProducts }, 450)
}
