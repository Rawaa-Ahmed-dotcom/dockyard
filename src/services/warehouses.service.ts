import { db, delay, nextId } from "@/services/db"
import type { Warehouse } from "@/types"

export type WarehouseInput = Omit<Warehouse, "id" | "utilized">

export async function listWarehouses(): Promise<Warehouse[]> {
  return delay([...db.warehouses].sort((a, b) => a.name.localeCompare(b.name)))
}

export async function createWarehouse(input: WarehouseInput): Promise<Warehouse> {
  const warehouse: Warehouse = { id: nextId("wh"), utilized: 0, ...input }
  db.warehouses = [warehouse, ...db.warehouses]
  return delay(warehouse)
}

export async function updateWarehouse(id: string, input: WarehouseInput): Promise<Warehouse> {
  const existing = db.warehouses.find((w) => w.id === id)
  if (!existing) throw new Error("Warehouse not found")
  const updated: Warehouse = { ...existing, ...input }
  db.warehouses = db.warehouses.map((w) => (w.id === id ? updated : w))
  return delay(updated)
}

export async function deleteWarehouse(id: string): Promise<void> {
  db.warehouses = db.warehouses.filter((w) => w.id !== id)
  return delay(undefined)
}
