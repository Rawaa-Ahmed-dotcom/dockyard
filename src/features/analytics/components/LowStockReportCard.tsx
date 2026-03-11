import { ShieldCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { formatNumber } from "@/lib/utils"
import type { Product } from "@/types"

interface LowStockReportCardProps {
  products: Product[]
  loading?: boolean
}

export function LowStockReportCard({ products, loading }: LowStockReportCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock Report</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={ShieldCheck}
            title="Everything is well stocked"
            description="No products are currently below their reorder threshold."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{product.name}</span>
                      <span className="font-mono text-caption text-muted-foreground">{product.sku}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(product.quantity)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatNumber(product.reorderThreshold)}</TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
