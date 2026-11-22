import { ArrowDownLeft, ArrowUpRight, RefreshCw, Repeat } from "lucide-react"
import type { MovementType } from "@/types"


export const MOVEMENT_CONFIG: Record<MovementType, { label: string; icon: typeof ArrowUpRight; className: string }> = {
  "stock-in": { label: "Stock In", icon: ArrowDownLeft, className: "text-success bg-success-bg" },
  "stock-out": { label: "Stock Out", icon: ArrowUpRight, className: "text-danger bg-danger-bg" },
  adjustment: { label: "Adjustment", icon: RefreshCw, className: "text-info bg-info-bg" },
  transfer: { label: "Transfer", icon: Repeat, className: "text-warning bg-warning-bg" },
}