import { MapPin, MoreHorizontal, Pencil, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatNumber } from "@/lib/utils"
import type { Warehouse } from "@/types"

interface WarehouseCardProps {
  warehouse: Warehouse
  itemCount: number
  onEdit: (warehouse: Warehouse) => void
  onDelete: (warehouse: Warehouse) => void
}

export function WarehouseCard({ warehouse, itemCount, onEdit, onDelete }: WarehouseCardProps) {
  const utilizationPct = Math.min(100, Math.round((warehouse.utilized / warehouse.capacity) * 100))
  const tone = utilizationPct >= 90 ? "bg-danger" : utilizationPct >= 70 ? "bg-warning" : "bg-primary"

  return (
    <Card hoverable>
      <CardHeader>
        <CardTitle>{warehouse.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={`Actions for ${warehouse.name}`}>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(warehouse)}>
              <Pencil className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="danger" onClick={() => onDelete(warehouse)}>
              <Trash2 className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 text-caption text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {warehouse.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5" /> {warehouse.manager}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-caption text-muted-foreground">
            <span>{formatNumber(itemCount)} units on hand</span>
            <span className="font-medium text-foreground">{utilizationPct}% of capacity</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className={`h-full rounded-full transition-[width] duration-700 ease-out ${tone}`}
              style={{ width: `${utilizationPct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
