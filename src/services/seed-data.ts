import type { InventoryMovement, MovementType, Product, Supplier, Warehouse } from "@/types"

export const warehouses: Warehouse[] = [
  { id: "wh-1", name: "Main Distribution Center", location: "Chicago, IL", capacity: 20000, utilized: 14200, manager: "Dana Reyes" },
  { id: "wh-2", name: "West Coast Hub", location: "Reno, NV", capacity: 12000, utilized: 6900, manager: "Marcus Lee" },
  { id: "wh-3", name: "East Coast Hub", location: "Newark, NJ", capacity: 15000, utilized: 11800, manager: "Priya Nandakumar" },
  { id: "wh-4", name: "Retail Overflow", location: "Austin, TX", capacity: 6000, utilized: 1650, manager: "Sam O'Connell" },
]

export const suppliers: Supplier[] = [
  { id: "sup-1", name: "Northline Components", contactPerson: "Ravi Patel", email: "ravi@northline.co", phone: "(312) 555-0148", address: "882 Freight Rd, Chicago, IL", productsSupplied: 6 },
  { id: "sup-2", name: "Cedar & Co. Textiles", contactPerson: "Elena Marsh", email: "elena@cedarco.com", phone: "(415) 555-0122", address: "44 Loom St, Oakland, CA", productsSupplied: 5 },
  { id: "sup-3", name: "Brightware Supply", contactPerson: "Tomasz Nowak", email: "tomasz@brightware.io", phone: "(646) 555-0199", address: "12 Harbor Ave, Newark, NJ", productsSupplied: 4 },
  { id: "sup-4", name: "Summit Outdoor Goods", contactPerson: "Casey Whitfield", email: "casey@summitgoods.com", phone: "(720) 555-0110", address: "310 Ridge Blvd, Denver, CO", productsSupplied: 4 },
  { id: "sup-5", name: "Pure Form Health", contactPerson: "Nadia Hassan", email: "nadia@pureform.com", phone: "(512) 555-0177", address: "58 Wellness Way, Austin, TX", productsSupplied: 3 },
  { id: "sup-6", name: "Anchor Office Co.", contactPerson: "Ben Ortiz", email: "ben@anchoroffice.com", phone: "(212) 555-0163", address: "901 Ledger Ln, New York, NY", productsSupplied: 3 },
]

type ProductSeed = Omit<Product, "status" | "updatedAt">

function statusFor(quantity: number, reorderThreshold: number): Product["status"] {
  if (quantity <= 0) return "out-of-stock"
  if (quantity <= reorderThreshold) return "low-stock"
  return "in-stock"
}

const rawProducts: ProductSeed[] = [
  { id: "p-1", name: "Wireless Barcode Scanner", sku: "ELE-1001", category: "Electronics", costPrice: 42, sellingPrice: 89, quantity: 340, reorderThreshold: 60, description: "2.4GHz cordless scanner with 200m range and USB dock.", imageUrl: null, warehouseId: "wh-1" },
  { id: "p-2", name: "Thermal Label Printer", sku: "ELE-1002", category: "Electronics", costPrice: 78, sellingPrice: 149, quantity: 52, reorderThreshold: 40, description: "4-inch direct thermal printer for shipping labels.", imageUrl: null, warehouseId: "wh-1" },
  { id: "p-3", name: "Rugged Tablet Mount", sku: "ELE-1003", category: "Electronics", costPrice: 21, sellingPrice: 45, quantity: 0, reorderThreshold: 30, description: "Forklift-mount tablet cradle with vibration dampening.", imageUrl: null, warehouseId: "wh-2" },
  { id: "p-4", name: "USB-C Power Bank 20K", sku: "ELE-1004", category: "Electronics", costPrice: 14, sellingPrice: 34, quantity: 610, reorderThreshold: 100, description: "20,000mAh fast-charge power bank, dual output.", imageUrl: null, warehouseId: "wh-3" },
  { id: "p-5", name: "Bluetooth Ring Scanner", sku: "ELE-1005", category: "Electronics", costPrice: 55, sellingPrice: 119, quantity: 28, reorderThreshold: 35, description: "Wearable ring-style scanner for hands-free picking.", imageUrl: null, warehouseId: "wh-1" },

  { id: "p-6", name: "Canvas Work Apron", sku: "APP-2001", category: "Apparel", costPrice: 9, sellingPrice: 22, quantity: 420, reorderThreshold: 80, description: "Heavy-duty canvas apron with 4 tool pockets.", imageUrl: null, warehouseId: "wh-2" },
  { id: "p-7", name: "Hi-Vis Safety Vest", sku: "APP-2002", category: "Apparel", costPrice: 6, sellingPrice: 15, quantity: 65, reorderThreshold: 100, description: "ANSI Class 2 reflective vest, mesh back.", imageUrl: null, warehouseId: "wh-3" },
  { id: "p-8", name: "Insulated Work Gloves", sku: "APP-2003", category: "Apparel", costPrice: 8, sellingPrice: 19, quantity: 300, reorderThreshold: 60, description: "Thermal-lined gloves rated to -20°F.", imageUrl: null, warehouseId: "wh-1" },
  { id: "p-9", name: "Steel-Toe Boots (Pair)", sku: "APP-2004", category: "Apparel", costPrice: 32, sellingPrice: 74, quantity: 18, reorderThreshold: 25, description: "ASTM-rated steel toe, slip-resistant sole.", imageUrl: null, warehouseId: "wh-4" },

  { id: "p-10", name: "Stackable Storage Bin 40L", sku: "HOM-3001", category: "Home & Kitchen", costPrice: 7, sellingPrice: 18, quantity: 850, reorderThreshold: 150, description: "Ventilated stackable bin, food-safe plastic.", imageUrl: null, warehouseId: "wh-1" },
  { id: "p-11", name: "Vacuum Sealed Jar Set", sku: "HOM-3002", category: "Home & Kitchen", costPrice: 11, sellingPrice: 26, quantity: 40, reorderThreshold: 50, description: "Set of 6 airtight glass storage jars.", imageUrl: null, warehouseId: "wh-2" },
  { id: "p-12", name: "Commercial Shelving Unit", sku: "HOM-3003", category: "Home & Kitchen", costPrice: 64, sellingPrice: 139, quantity: 22, reorderThreshold: 20, description: "5-tier wire shelving, 800lb capacity.", imageUrl: null, warehouseId: "wh-3" },

  { id: "p-13", name: "Ergonomic Desk Chair", sku: "OFF-4001", category: "Office Supplies", costPrice: 95, sellingPrice: 210, quantity: 46, reorderThreshold: 30, description: "Mesh back chair with lumbar support, adjustable arms.", imageUrl: null, warehouseId: "wh-4" },
  { id: "p-14", name: "Standing Desk Converter", sku: "OFF-4002", category: "Office Supplies", costPrice: 58, sellingPrice: 129, quantity: 12, reorderThreshold: 20, description: "Dual-tier riser, gas-spring height adjust.", imageUrl: null, warehouseId: "wh-4" },
  { id: "p-15", name: "Heavy-Duty Shipping Tape (Case)", sku: "OFF-4003", category: "Office Supplies", costPrice: 18, sellingPrice: 39, quantity: 210, reorderThreshold: 50, description: "36 rolls, 2mil acrylic adhesive.", imageUrl: null, warehouseId: "wh-1" },
  { id: "p-16", name: "Pallet Wrap Film", sku: "OFF-4004", category: "Office Supplies", costPrice: 24, sellingPrice: 52, quantity: 0, reorderThreshold: 40, description: "20-inch stretch wrap, 80 gauge, 6 rolls.", imageUrl: null, warehouseId: "wh-3" },

  { id: "p-17", name: "Folding Utility Cart", sku: "SPT-5001", category: "Sporting Goods", costPrice: 29, sellingPrice: 68, quantity: 88, reorderThreshold: 40, description: "150lb capacity folding cart with wide wheels.", imageUrl: null, warehouseId: "wh-2" },
  { id: "p-18", name: "Insulated Cooler 40qt", sku: "SPT-5002", category: "Sporting Goods", costPrice: 33, sellingPrice: 79, quantity: 55, reorderThreshold: 35, description: "Roto-molded cooler, 5-day ice retention.", imageUrl: null, warehouseId: "wh-2" },
  { id: "p-19", name: "Adjustable Camping Table", sku: "SPT-5003", category: "Sporting Goods", costPrice: 19, sellingPrice: 45, quantity: 6, reorderThreshold: 20, description: "Aluminum folding table, 4 height settings.", imageUrl: null, warehouseId: "wh-4" },

  { id: "p-20", name: "Nitrile Gloves (Box of 100)", sku: "HLT-6001", category: "Health & Beauty", costPrice: 5, sellingPrice: 13, quantity: 1200, reorderThreshold: 200, description: "Powder-free, textured fingertips, food-safe.", imageUrl: null, warehouseId: "wh-1" },
  { id: "p-21", name: "First Aid Kit — Industrial", sku: "HLT-6002", category: "Health & Beauty", costPrice: 22, sellingPrice: 48, quantity: 34, reorderThreshold: 30, description: "OSHA-compliant kit for up to 50 employees.", imageUrl: null, warehouseId: "wh-3" },
  { id: "p-22", name: "Hand Sanitizer Station", sku: "HLT-6003", category: "Health & Beauty", costPrice: 40, sellingPrice: 89, quantity: 15, reorderThreshold: 15, description: "Touch-free floor stand dispenser, 1L refill.", imageUrl: null, warehouseId: "wh-4" },
  { id: "p-23", name: "N95 Respirator (Box of 20)", sku: "HLT-6004", category: "Health & Beauty", costPrice: 26, sellingPrice: 58, quantity: 3, reorderThreshold: 25, description: "NIOSH-approved particulate respirator.", imageUrl: null, warehouseId: "wh-1" },
  { id: "p-24", name: "Ear Protection Muffs", sku: "HLT-6005", category: "Health & Beauty", costPrice: 8, sellingPrice: 20, quantity: 190, reorderThreshold: 60, description: "27dB NRR noise-reducing ear muffs.", imageUrl: null, warehouseId: "wh-2" },
]

export const products: Product[] = rawProducts.map((p, i) => ({
  ...p,
  status: statusFor(p.quantity, p.reorderThreshold),
  updatedAt: new Date(Date.now() - i * 6 * 60 * 60 * 1000).toISOString(),
}))

const movementReasons: Record<MovementType, string[]> = {
  "stock-in": ["Purchase order received", "Supplier restock", "Return to inventory"],
  "stock-out": ["Customer order fulfilled", "Damaged goods removed", "Sample shipped"],
  adjustment: ["Cycle count correction", "Damage write-off", "System reconciliation"],
  transfer: ["Rebalance between warehouses", "Regional demand shift"],
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

export const movements: InventoryMovement[] = Array.from({ length: 36 }).map((_, i) => {
  const types: MovementType[] = ["stock-in", "stock-out", "adjustment", "transfer"]
  const type = pick(types, i)
  const product = pick(products, i * 3 + 1)
  const daysAgo = Math.floor(i / 2) + (i % 3)
  const fromWarehouse = type === "transfer" || type === "stock-out" ? product.warehouseId : null
  const toWarehouse =
    type === "transfer"
      ? pick(warehouses.filter((w) => w.id !== product.warehouseId), i)?.id ?? null
      : type === "stock-in"
        ? product.warehouseId
        : null

  return {
    id: `mv-${i + 1}`,
    type,
    productId: product.id,
    productName: product.name,
    sku: product.sku,
    quantity: 5 + ((i * 7) % 60),
    fromWarehouseId: fromWarehouse,
    toWarehouseId: toWarehouse,
    reason: pick(movementReasons[type], i),
    createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - i * 60 * 1000).toISOString(),
    createdBy: pick(["Dana Reyes", "Marcus Lee", "Priya Nandakumar", "Sam O'Connell"], i),
  }
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
