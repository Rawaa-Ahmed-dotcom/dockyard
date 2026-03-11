import { useMemo, useState } from "react"
import { Plus, Search, Truck } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { useDeleteSupplier, useSuppliers } from "@/features/suppliers/hooks/useSuppliers"
import { SupplierFormDialog } from "@/features/suppliers/components/SupplierFormDialog"
import { SuppliersTable } from "@/features/suppliers/components/SuppliersTable"
import type { Supplier } from "@/types"

export function SuppliersPage() {
  const { data: suppliers, isLoading } = useSuppliers()
  const deleteSupplier = useDeleteSupplier()

  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null)

  const filteredSuppliers = useMemo(() => {
    if (!suppliers) return []
    const query = search.trim().toLowerCase()
    if (!query) return suppliers
    return suppliers.filter(
      (s) => s.name.toLowerCase().includes(query) || s.contactPerson.toLowerCase().includes(query)
    )
  }, [suppliers, search])

  const hasNoSuppliersAtAll = !isLoading && (suppliers?.length ?? 0) === 0
  const hasNoFilterResults = !isLoading && !hasNoSuppliersAtAll && filteredSuppliers.length === 0

  function openCreateForm() {
    setEditingSupplier(null)
    setFormOpen(true)
  }

  async function handleDeleteConfirm() {
    if (!supplierToDelete) return
    await deleteSupplier.mutateAsync(supplierToDelete.id)
    toast.success(`"${supplierToDelete.name}" removed`)
    setSupplierToDelete(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Suppliers"
        description="Keep your supplier directory up to date."
        action={
          <Button onClick={openCreateForm}>
            <Plus className="size-4" /> Add Supplier
          </Button>
        }
      />

      {!hasNoSuppliersAtAll && (
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers…"
            className="pl-9"
            aria-label="Search suppliers"
          />
        </div>
      )}

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : hasNoSuppliersAtAll ? (
            <EmptyState
              icon={Truck}
              title="No suppliers yet"
              description="Add a supplier to start linking them to products and purchase orders."
              action={
                <Button onClick={openCreateForm}>
                  <Plus className="size-4" /> Add Supplier
                </Button>
              }
            />
          ) : hasNoFilterResults ? (
            <EmptyState icon={Truck} title="No suppliers match your search" description="Try a different search term." />
          ) : (
            <SuppliersTable
              suppliers={filteredSuppliers}
              onEdit={(supplier) => {
                setEditingSupplier(supplier)
                setFormOpen(true)
              }}
              onDelete={setSupplierToDelete}
            />
          )}
        </CardContent>
      </Card>

      <SupplierFormDialog open={formOpen} onOpenChange={setFormOpen} supplier={editingSupplier} />

      <ConfirmDialog
        open={!!supplierToDelete}
        onOpenChange={(open) => !open && setSupplierToDelete(null)}
        title="Remove supplier?"
        description={`This will remove "${supplierToDelete?.name}" from your supplier directory.`}
        confirmLabel="Remove"
        destructive
        loading={deleteSupplier.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
