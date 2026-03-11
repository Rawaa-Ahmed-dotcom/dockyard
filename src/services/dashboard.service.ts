import { db, delay } from "@/services/db"
import type { DashboardSummary } from "@/types"

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const totalProducts = db.products.length
  const inventoryValue = db.products.reduce((sum, p) => sum + p.quantity * p.costPrice, 0)
  const lowStockCount = db.products.filter((p) => p.status === "low-stock" || p.status === "out-of-stock").length

  const recentTransactions = [...db.movements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  const warehouseSummary = db.warehouses.map((warehouse) => {
    const items = db.products.filter((p) => p.warehouseId === warehouse.id)
    return {
      warehouse,
      itemCount: items.reduce((sum, p) => sum + p.quantity, 0),
      value: items.reduce((sum, p) => sum + p.quantity * p.costPrice, 0),
    }
  })

  const movementCountByProduct = new Map<string, number>()
  for (const m of db.movements) {
    if (m.type === "stock-out" || m.type === "transfer") {
      movementCountByProduct.set(m.productId, (movementCountByProduct.get(m.productId) ?? 0) + m.quantity)
    }
  }
  const topMovingProducts = [...movementCountByProduct.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([productId, unitsMoved]) => ({
      product: db.products.find((p) => p.id === productId)!,
      unitsMoved,
    }))
    .filter((entry) => entry.product)

  return delay(
    {
      totalProducts,
      inventoryValue,
      lowStockCount,
      recentTransactions,
      warehouseSummary,
      topMovingProducts,
    },
    450
  )
}
