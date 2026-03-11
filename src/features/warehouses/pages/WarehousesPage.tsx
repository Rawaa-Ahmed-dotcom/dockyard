import { useMemo, useState } from "react"
import { Plus, Warehouse as WarehouseIcon } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { useDeleteWarehouse, useWarehouses } from "@/features/warehouses/hooks/useWarehouses"
import { useProducts } from "@/features/products/hooks/useProducts"
import { WarehouseFormDialog } from "@/features/warehouses/components/WarehouseFormDialog"
import { WarehouseCard } from "@/features/warehouses/components/WarehouseCard"
import type { Warehouse } from "@/types"

export function WarehousesPage() {
  const { data: warehouses, isLoading } = useWarehouses()
  const { data: products } = useProducts()
  const deleteWarehouse = useDeleteWarehouse()

  const [formOpen, setFormOpen] = useState(false)
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null)
  const [warehouseToDelete, setWarehouseToDelete] = useState<Warehouse | null>(null)

  const itemCountByWarehouse = useMemo(() => {
    const map = new Map<string, number>()
    for (const product of products ?? []) {
      map.set(product.warehouseId, (map.get(product.warehouseId) ?? 0) + product.quantity)
    }
    return map
  }, [products])

  function openCreateForm() {
    setEditingWarehouse(null)
    setFormOpen(true)
  }

  async function handleDeleteConfirm() {
    if (!warehouseToDelete) return
    await deleteWarehouse.mutateAsync(warehouseToDelete.id)
    toast.success(`"${warehouseToDelete.name}" removed`)
    setWarehouseToDelete(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Warehouses"
        description="Track capacity and utilization across every location."
        action={
          <Button onClick={openCreateForm}>
            <Plus className="size-4" /> Add Warehouse
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : warehouses?.length === 0 ? (
        <EmptyState
          icon={WarehouseIcon}
          title="No warehouses yet"
          description="Add a warehouse to start assigning products and tracking capacity."
          action={
            <Button onClick={openCreateForm}>
              <Plus className="size-4" /> Add Warehouse
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {warehouses?.map((warehouse) => (
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              itemCount={itemCountByWarehouse.get(warehouse.id) ?? 0}
              onEdit={(w) => {
                setEditingWarehouse(w)
                setFormOpen(true)
              }}
              onDelete={setWarehouseToDelete}
            />
          ))}
        </div>
      )}

      <WarehouseFormDialog open={formOpen} onOpenChange={setFormOpen} warehouse={editingWarehouse} />

      <ConfirmDialog
        open={!!warehouseToDelete}
        onOpenChange={(open) => !open && setWarehouseToDelete(null)}
        title="Delete warehouse?"
        description={`This will permanently remove "${warehouseToDelete?.name}". Products assigned to it will need to be reassigned.`}
        confirmLabel="Delete"
        destructive
        loading={deleteWarehouse.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
