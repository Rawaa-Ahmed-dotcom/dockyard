import { Badge } from "@/components/ui/badge"
import type { StockStatus } from "@/types"

const STATUS_CONFIG: Record<StockStatus, { label: string; variant: "success" | "warning" | "danger" }> = {
  "in-stock": { label: "In Stock", variant: "success" },
  "low-stock": { label: "Low Stock", variant: "warning" },
  "out-of-stock": { label: "Out of Stock", variant: "danger" },
}

export function StatusBadge({ status }: { status: StockStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <Badge variant={config.variant} dot>
      {config.label}
    </Badge>
  )
}
