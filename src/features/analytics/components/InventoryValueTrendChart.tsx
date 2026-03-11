import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CHART_CHROME, CHART_DIVERGING } from "@/lib/chart-colors"
import { formatCurrency } from "@/lib/utils"
import type { ValueTrendPoint } from "@/services/analytics.service"

interface InventoryValueTrendChartProps {
  data: ValueTrendPoint[]
  loading?: boolean
}

export function InventoryValueTrendChart({ data, loading }: InventoryValueTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Value Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="value-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_DIVERGING.positive} stopOpacity={0.12} />
                  <stop offset="100%" stopColor={CHART_DIVERGING.positive} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={CHART_CHROME.grid} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={{ stroke: CHART_CHROME.grid }}
                tick={{ fill: CHART_CHROME.axis, fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: CHART_CHROME.axis, fontSize: 12 }}
                tickFormatter={(v) => formatCurrency(v)}
                width={72}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Inventory value"]}
                contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={CHART_DIVERGING.positive}
                strokeWidth={2}
                fill="url(#value-fill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
