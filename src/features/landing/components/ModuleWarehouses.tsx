import { Warehouse as WarehouseIcon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { useWarehouses } from "@/features/warehouses/hooks/useWarehouses"
import { ModuleTile } from "./ModuleTile"

export function ModuleWarehouses({ className }: { className?: string }) {
  const { data, isLoading } = useWarehouses()

  return (
    <ModuleTile
      icon={WarehouseIcon}
      title="Warehouses"
      description="Capacity and utilization across every site, at a glance."
      className={className}
    >
      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
          : data?.slice(0, 3).map((warehouse) => {
              const pct = Math.min(100, Math.round((warehouse.utilized / warehouse.capacity) * 100))
              return (
                <div key={warehouse.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="truncate text-small font-medium text-foreground">{warehouse.name}</p>
                    <span className="shrink-0 text-caption font-medium text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
      </div>
    </ModuleTile>
  )
}
