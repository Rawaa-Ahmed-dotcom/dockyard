import { db, delay, nextId } from "@/services/db"
import type { Supplier } from "@/types"

export type SupplierInput = Omit<Supplier, "id" | "productsSupplied">

export async function listSuppliers(): Promise<Supplier[]> {
  return delay([...db.suppliers].sort((a, b) => a.name.localeCompare(b.name)))
}

export async function createSupplier(input: SupplierInput): Promise<Supplier> {
  const supplier: Supplier = { id: nextId("sup"), productsSupplied: 0, ...input }
  db.suppliers = [supplier, ...db.suppliers]
  return delay(supplier)
}

export async function updateSupplier(id: string, input: SupplierInput): Promise<Supplier> {
  const existing = db.suppliers.find((s) => s.id === id)
  if (!existing) throw new Error("Supplier not found")
  const updated: Supplier = { ...existing, ...input }
  db.suppliers = db.suppliers.map((s) => (s.id === id ? updated : s))
  return delay(updated)
}

export async function deleteSupplier(id: string): Promise<void> {
  db.suppliers = db.suppliers.filter((s) => s.id !== id)
  return delay(undefined)
}
