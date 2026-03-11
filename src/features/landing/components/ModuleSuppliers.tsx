import { Truck } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { useSuppliers } from "@/features/suppliers/hooks/useSuppliers"
import { ModuleTile } from "./ModuleTile"

export function ModuleSuppliers({ className }: { className?: string }) {
  const { data, isLoading } = useSuppliers()

  return (
    <ModuleTile
      icon={Truck}
      title="Suppliers"
      description="Who supplies what, and how to reach them when stock runs low."
      className={className}
    >
      <div className="flex flex-col">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="my-1 h-9 w-full" />)
          : data?.slice(0, 3).map((supplier) => (
              <div key={supplier.id} className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
                <div className="flex min-w-0 flex-col">
                  <p className="truncate text-small font-medium text-foreground">{supplier.name}</p>
                  <p className="text-caption text-muted-foreground">{supplier.contactPerson}</p>
                </div>
                <p className="shrink-0 text-caption text-muted-foreground">{supplier.productsSupplied} products</p>
              </div>
            ))}
      </div>
    </ModuleTile>
  )
}
