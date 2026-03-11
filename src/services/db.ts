import { movements as seedMovements, products as seedProducts, suppliers as seedSuppliers, warehouses as seedWarehouses } from "@/services/seed-data"
import type { InventoryMovement, Product, Supplier, Warehouse } from "@/types"

/**
 * In-memory mock database. Mirrors the shape of the future Supabase tables so
 * services can be swapped for real Supabase calls without touching feature code.
 */
export const db = {
  products: [...seedProducts] as Product[],
  warehouses: [...seedWarehouses] as Warehouse[],
  suppliers: [...seedSuppliers] as Supplier[],
  movements: [...seedMovements] as InventoryMovement[],
}

export function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export function statusForQuantity(quantity: number, reorderThreshold: number): Product["status"] {
  if (quantity <= 0) return "out-of-stock"
  if (quantity <= reorderThreshold) return "low-stock"
  return "in-stock"
}

export function nextId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}
