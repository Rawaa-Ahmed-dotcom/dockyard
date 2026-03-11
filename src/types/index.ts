export type StockStatus = "in-stock" | "low-stock" | "out-of-stock"

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  costPrice: number
  sellingPrice: number
  quantity: number
  reorderThreshold: number
  description: string
  imageUrl: string | null
  warehouseId: string
  status: StockStatus
  updatedAt: string
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  productsSupplied: number
}

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  utilized: number
  manager: string
}

export type MovementType = "stock-in" | "stock-out" | "adjustment" | "transfer"

export interface InventoryMovement {
  id: string
  type: MovementType
  productId: string
  productName: string
  sku: string
  quantity: number
  fromWarehouseId: string | null
  toWarehouseId: string | null
  reason: string
  createdAt: string
  createdBy: string
}

export interface DashboardSummary {
  totalProducts: number
  inventoryValue: number
  lowStockCount: number
  recentTransactions: InventoryMovement[]
  warehouseSummary: { warehouse: Warehouse; itemCount: number; value: number }[]
  topMovingProducts: { product: Product; unitsMoved: number }[]
}
