import { useMemo, useState } from "react"
import { ArrowLeftRight, Plus, Search } from "lucide-react"

import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { useMovements } from "@/features/inventory/hooks/useInventory"
import { useWarehouses } from "@/features/warehouses/hooks/useWarehouses"
import { MovementFormDialog } from "@/features/inventory/components/MovementFormDialog"
import { MovementsTable } from "@/features/inventory/components/MovementsTable"
import type { MovementType } from "@/types"

const TYPE_OPTIONS: { value: MovementType | "all"; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "stock-in", label: "Stock In" },
  { value: "stock-out", label: "Stock Out" },
  { value: "adjustment", label: "Adjustment" },
  { value: "transfer", label: "Transfer" },
]

export function InventoryPage() {
  const { data: movements, isLoading } = useMovements()
  const { data: warehouses } = useWarehouses()
  const [search, setSearch] = useState("")
  const [type, setType] = useState<string>("all")
  const [formOpen, setFormOpen] = useState(false)

  const warehousesById = useMemo(() => new Map((warehouses ?? []).map((w) => [w.id, w])), [warehouses])

  const filteredMovements = useMemo(() => {
    if (!movements) return []
    const query = search.trim().toLowerCase()
    return movements.filter((m) => {
      const matchesSearch = !query || m.productName.toLowerCase().includes(query) || m.sku.toLowerCase().includes(query)
      const matchesType = type === "all" || m.type === type
      return matchesSearch && matchesType
    })
  }, [movements, search, type])

  const hasNoMovementsAtAll = !isLoading && (movements?.length ?? 0) === 0
  const hasNoFilterResults = !isLoading && !hasNoMovementsAtAll && filteredMovements.length === 0

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Inventory"
        description="Record stock in, stock out, adjustments, and transfers."
        action={
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="size-4" /> New Movement
          </Button>
        }
      />

      {!hasNoMovementsAtAll && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product or SKU…"
              className="pl-9"
              aria-label="Search movements"
            />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="sm:w-44" aria-label="Filter by movement type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          ) : hasNoMovementsAtAll ? (
            <EmptyState
              icon={ArrowLeftRight}
              title="No stock movements yet"
              description="Record a stock in, stock out, adjustment, or transfer to start building your inventory history."
              action={
                <Button onClick={() => setFormOpen(true)}>
                  <Plus className="size-4" /> New Movement
                </Button>
              }
            />
          ) : hasNoFilterResults ? (
            <EmptyState
              icon={ArrowLeftRight}
              title="No movements match your filters"
              description="Try a different search term or movement type."
            />
          ) : (
            <MovementsTable movements={filteredMovements} warehousesById={warehousesById} />
          )}
        </CardContent>
      </Card>

      <MovementFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </div>
  )
}
