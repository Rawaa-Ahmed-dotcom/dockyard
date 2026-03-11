import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CHART_CHROME, CHART_DIVERGING } from "@/lib/chart-colors"
import { formatNumber } from "@/lib/utils"
import type { MovementTrendPoint } from "@/services/analytics.service"

interface StockMovementTrendChartProps {
  data: MovementTrendPoint[]
  loading?: boolean
}

export function StockMovementTrendChart({ data, loading }: StockMovementTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Movement Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={2}>
              <CartesianGrid vertical={false} stroke={CHART_CHROME.grid} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={{ stroke: CHART_CHROME.grid }}
                tick={{ fill: CHART_CHROME.axis, fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: CHART_CHROME.axis, fontSize: 12 }} width={40} />
              <Tooltip
                formatter={(value, name) => [`${formatNumber(Number(value))} units`, name]}
                contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: CHART_CHROME.text }}
              />
              <Bar dataKey="stockIn" name="Stock In" fill={CHART_DIVERGING.positive} radius={[4, 4, 0, 0]} maxBarSize={16} />
              <Bar dataKey="stockOut" name="Stock Out" fill={CHART_DIVERGING.negative} radius={[4, 4, 0, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
