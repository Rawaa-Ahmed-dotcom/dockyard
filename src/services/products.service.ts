import { db, delay, nextId, statusForQuantity } from "@/services/db"
import type { Product } from "@/types"

export interface ProductInput {
  name: string
  sku: string
  category: string
  costPrice: number
  sellingPrice: number
  quantity: number
  reorderThreshold: number
  description: string
  warehouseId: string
}

export async function listProducts(): Promise<Product[]> {
  return delay([...db.products].sort((a, b) => a.name.localeCompare(b.name)))
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return delay(db.products.find((p) => p.id === id))
}

export async function createProduct(input: ProductInput): Promise<Product> {
  if (db.products.some((p) => p.sku.toLowerCase() === input.sku.toLowerCase())) {
    throw new Error(`A product with SKU "${input.sku}" already exists`)
  }
  const product: Product = {
    id: nextId("p"),
    ...input,
    imageUrl: null,
    status: statusForQuantity(input.quantity, input.reorderThreshold),
    updatedAt: new Date().toISOString(),
  }
  db.products = [product, ...db.products]
  return delay(product)
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  const existing = db.products.find((p) => p.id === id)
  if (!existing) throw new Error("Product not found")
  if (db.products.some((p) => p.id !== id && p.sku.toLowerCase() === input.sku.toLowerCase())) {
    throw new Error(`A product with SKU "${input.sku}" already exists`)
  }
  const updated: Product = {
    ...existing,
    ...input,
    status: statusForQuantity(input.quantity, input.reorderThreshold),
    updatedAt: new Date().toISOString(),
  }
  db.products = db.products.map((p) => (p.id === id ? updated : p))
  return delay(updated)
}

export async function deleteProduct(id: string): Promise<void> {
  db.products = db.products.filter((p) => p.id !== id)
  return delay(undefined)
}

export async function deleteProducts(ids: string[]): Promise<void> {
  const idSet = new Set(ids)
  db.products = db.products.filter((p) => !idSet.has(p.id))
  return delay(undefined)
}
