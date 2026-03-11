import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CHART_CHROME, colorForCategory } from "@/lib/chart-colors"
import { PRODUCT_CATEGORIES } from "@/features/products/constants"
import { formatNumber } from "@/lib/utils"
import type { CategoryDistributionPoint } from "@/services/analytics.service"

interface ProductDistributionChartProps {
  data: CategoryDistributionPoint[]
  loading?: boolean
}

export function ProductDistributionChart({ data, loading }: ProductDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke={CHART_CHROME.grid} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: CHART_CHROME.axis, fontSize: 12 }}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="category"
                tickLine={false}
                axisLine={false}
                width={110}
                tick={{ fill: CHART_CHROME.text, fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [`${formatNumber(Number(value))} products`, ""]}
                contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={24}>
                {data.map((entry) => (
                  <Cell key={entry.category} fill={colorForCategory(entry.category, PRODUCT_CATEGORIES)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
