import { useMemo } from "react"
import { Package } from "lucide-react"

import { StatusBadge } from "@/components/shared/StatusBadge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import { useProducts } from "@/features/products/hooks/useProducts"
import { ModuleTile } from "./ModuleTile"

export function ModuleProducts({ className }: { className?: string }) {
  const { data, isLoading } = useProducts()

  const rows = useMemo(() => {
    if (!data) return []
    const outOfStock = data.filter((p) => p.status === "out-of-stock").slice(0, 1)
    const lowStock = data.filter((p) => p.status === "low-stock").slice(0, 1)
    const inStock = data.filter((p) => p.status === "in-stock").slice(0, 3)
    return [...outOfStock, ...lowStock, ...inStock]
  }, [data])

  return (
    <ModuleTile
      icon={Package}
      title="Products"
      description="The catalog every other module reads from — SKU, pricing, and live stock in one record."
      className={className}
    >
      <div className="flex flex-col">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="my-1 h-9 w-full" />)
          : rows.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0"
              >
                <div className="flex min-w-0 flex-col">
                  <p className="truncate text-small font-medium text-foreground">{product.name}</p>
                  <p className="text-caption text-muted-foreground">{product.sku}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-small text-muted-foreground">{formatCurrency(product.sellingPrice)}</span>
                  <StatusBadge status={product.status} />
                </div>
              </div>
            ))}
      </div>
    </ModuleTile>
  )
}
