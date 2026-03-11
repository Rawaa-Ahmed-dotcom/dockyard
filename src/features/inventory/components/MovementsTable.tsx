import { ArrowDownLeft, ArrowUpRight, RefreshCw, Repeat } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDateTime, formatNumber } from "@/lib/utils"
import type { InventoryMovement, MovementType, Warehouse } from "@/types"

const MOVEMENT_CONFIG: Record<
  MovementType,
  { label: string; icon: typeof ArrowUpRight; variant: "success" | "danger" | "info" | "warning" }
> = {
  "stock-in": { label: "Stock In", icon: ArrowDownLeft, variant: "success" },
  "stock-out": { label: "Stock Out", icon: ArrowUpRight, variant: "danger" },
  adjustment: { label: "Adjustment", icon: RefreshCw, variant: "info" },
  transfer: { label: "Transfer", icon: Repeat, variant: "warning" },
}

interface MovementsTableProps {
  movements: InventoryMovement[]
  warehousesById: Map<string, Warehouse>
}

export function MovementsTable({ movements, warehousesById }: MovementsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>When</TableHead>
          <TableHead>By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movements.map((movement) => {
          const config = MOVEMENT_CONFIG[movement.type]
          const Icon = config.icon
          const from = movement.fromWarehouseId ? warehousesById.get(movement.fromWarehouseId)?.name : null
          const to = movement.toWarehouseId ? warehousesById.get(movement.toWarehouseId)?.name : null

          return (
            <TableRow key={movement.id}>
              <TableCell>
                <Badge variant={config.variant}>
                  <Icon className="size-3" /> {config.label}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{movement.productName}</span>
                  <span className="font-mono text-caption text-muted-foreground">{movement.sku}</span>
                </div>
              </TableCell>
              <TableCell>{formatNumber(movement.quantity)}</TableCell>
              <TableCell className="text-caption text-muted-foreground">
                {from && to ? `${from} → ${to}` : from ? `From ${from}` : to ? `To ${to}` : "—"}
              </TableCell>
              <TableCell className="max-w-48 truncate text-caption text-muted-foreground">{movement.reason}</TableCell>
              <TableCell className="text-caption text-muted-foreground">{formatDateTime(movement.createdAt)}</TableCell>
              <TableCell className="text-caption text-muted-foreground">{movement.createdBy}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
