import { db, delay, nextId, statusForQuantity } from "@/services/db"
import type { InventoryMovement, MovementType } from "@/types"

export interface MovementInput {
  type: MovementType
  productId: string
  quantity: number
  fromWarehouseId: string | null
  toWarehouseId: string | null
  reason: string
  createdBy: string
}

export async function listMovements(): Promise<InventoryMovement[]> {
  return delay([...db.movements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
}

export async function createMovement(input: MovementInput): Promise<InventoryMovement> {
  const product = db.products.find((p) => p.id === input.productId)
  if (!product) throw new Error("Product not found")

  let nextQuantity = product.quantity
  if (input.type === "stock-in") nextQuantity += input.quantity
  if (input.type === "stock-out") nextQuantity -= input.quantity
  if (input.type === "adjustment") nextQuantity = input.quantity
  if (input.type === "transfer") nextQuantity -= input.quantity

  if (nextQuantity < 0) {
    throw new Error(`Not enough stock for "${product.name}" — only ${product.quantity} available`)
  }

  db.products = db.products.map((p) =>
    p.id === product.id
      ? {
          ...p,
          quantity: nextQuantity,
          status: statusForQuantity(nextQuantity, p.reorderThreshold),
          updatedAt: new Date().toISOString(),
          warehouseId: input.type === "transfer" && input.toWarehouseId ? input.toWarehouseId : p.warehouseId,
        }
      : p
  )

  if (input.type === "transfer" && input.toWarehouseId) {
    const destExisting = db.products.find(
      (p) => p.sku === product.sku && p.warehouseId === input.toWarehouseId && p.id !== product.id
    )
    if (destExisting) {
      db.products = db.products.map((p) =>
        p.id === destExisting.id
          ? {
              ...p,
              quantity: p.quantity + input.quantity,
              status: statusForQuantity(p.quantity + input.quantity, p.reorderThreshold),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    }
  }

  const movement: InventoryMovement = {
    id: nextId("mv"),
    type: input.type,
    productId: product.id,
    productName: product.name,
    sku: product.sku,
    quantity: input.quantity,
    fromWarehouseId: input.fromWarehouseId,
    toWarehouseId: input.toWarehouseId,
    reason: input.reason,
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
  }
  db.movements = [movement, ...db.movements]
  return delay(movement)
}
