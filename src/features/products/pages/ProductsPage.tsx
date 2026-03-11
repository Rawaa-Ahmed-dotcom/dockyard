import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { RowSelectionState } from "@tanstack/react-table"
import { Package, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { useDeleteProduct, useDeleteProducts, useProducts } from "@/features/products/hooks/useProducts"
import { useWarehouses } from "@/features/warehouses/hooks/useWarehouses"
import { ProductFilters } from "@/features/products/components/ProductFilters"
import { ProductsTable } from "@/features/products/components/ProductsTable"
import { ProductFormDialog } from "@/features/products/components/ProductFormDialog"
import type { Product } from "@/types"

export function ProductsPage() {
  const { data: products, isLoading } = useProducts()
  const { data: warehouses } = useWarehouses()
  const deleteProduct = useDeleteProduct()
  const deleteProducts = useDeleteProducts()

  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState(searchParams.get("status") ?? "all")
  const [selection, setSelection] = useState<RowSelectionState>({})

  function handleStatusChange(value: string) {
    setStatus(value)
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === "all") next.delete("status")
        else next.set("status", value)
        return next
      },
      { replace: true }
    )
  }

  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)

  const warehousesById = useMemo(() => new Map((warehouses ?? []).map((w) => [w.id, w])), [warehouses])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    const query = search.trim().toLowerCase()
    return products.filter((p) => {
      const matchesSearch = !query || p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)
      const matchesCategory = category === "all" || p.category === category
      const matchesStatus = status === "all" || p.status === status
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, search, category, status])

  const selectedIds = Object.keys(selection).filter((id) => selection[id])

  function openCreateForm() {
    setEditingProduct(null)
    setFormOpen(true)
  }

  function openEditForm(product: Product) {
    setEditingProduct(product)
    setFormOpen(true)
  }

  async function handleDeleteConfirm() {
    if (!productToDelete) return
    await deleteProduct.mutateAsync(productToDelete.id)
    toast.success(`"${productToDelete.name}" deleted`)
    setProductToDelete(null)
  }

  async function handleBulkDeleteConfirm() {
    await deleteProducts.mutateAsync(selectedIds)
    toast.success(`${selectedIds.length} product${selectedIds.length === 1 ? "" : "s"} deleted`)
    setSelection({})
    setBulkDeleteOpen(false)
  }

  const hasNoProductsAtAll = !isLoading && (products?.length ?? 0) === 0
  const hasNoFilterResults = !isLoading && !hasNoProductsAtAll && filteredProducts.length === 0

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog, pricing, and stock levels."
        action={
          <Button onClick={openCreateForm}>
            <Plus className="size-4" /> Add Product
          </Button>
        }
      />

      {!hasNoProductsAtAll && (
        <ProductFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={handleStatusChange}
        />
      )}

      {selectedIds.length > 0 && (
        <div className="app-enter flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-primary/20 bg-primary/5 px-4 py-2.5">
          <p className="text-small font-medium text-foreground">
            {selectedIds.length} product{selectedIds.length === 1 ? "" : "s"} selected
          </p>
          <Button variant="danger" size="sm" onClick={() => setBulkDeleteOpen(true)}>
            <Trash2 className="size-4" /> Delete Selected
          </Button>
        </div>
      )}

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : hasNoProductsAtAll ? (
            <EmptyState
              icon={Package}
              title="No products yet"
              description="Add your first product to start tracking stock, pricing, and availability."
              action={
                <Button onClick={openCreateForm}>
                  <Plus className="size-4" /> Add Product
                </Button>
              }
            />
          ) : hasNoFilterResults ? (
            <EmptyState
              icon={Package}
              title="No products match your filters"
              description="Try adjusting your search or clearing filters to see more results."
            />
          ) : (
            <ProductsTable
              products={filteredProducts}
              warehousesById={warehousesById}
              selection={selection}
              onSelectionChange={setSelection}
              onEdit={openEditForm}
              onDelete={setProductToDelete}
            />
          )}
        </CardContent>
      </Card>

      <ProductFormDialog open={formOpen} onOpenChange={setFormOpen} product={editingProduct} />

      <ConfirmDialog
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
        title="Delete product?"
        description={`This will permanently remove "${productToDelete?.name}" from your catalog. This can't be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleteProduct.isPending}
        onConfirm={handleDeleteConfirm}
      />

      <ConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title={`Delete ${selectedIds.length} product${selectedIds.length === 1 ? "" : "s"}?`}
        description="This will permanently remove the selected products from your catalog. This can't be undone."
        confirmLabel="Delete"
        destructive
        loading={deleteProducts.isPending}
        onConfirm={handleBulkDeleteConfirm}
      />
    </div>
  )
}
