import { BarChart3 } from "lucide-react"
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Skeleton } from "@/components/ui/skeleton"
import { CHART_CHROME, colorForCategory } from "@/lib/chart-colors"
import { PRODUCT_CATEGORIES } from "@/features/products/constants"
import { formatNumber } from "@/lib/utils"
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics"
import { ModuleTile } from "./ModuleTile"

export function ModuleAnalytics({ className }: { className?: string }) {
  const { data, isLoading } = useAnalytics()

  return (
    <ModuleTile
      icon={BarChart3}
      title="Analytics"
      description="Where the value sits, how fast it moves, and which categories carry the most risk."
      className={className}
    >
      {isLoading ? (
        <Skeleton className="h-52 w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={208}>
          <BarChart data={data?.distribution} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <XAxis type="number" hide allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="category"
              tickLine={false}
              axisLine={false}
              width={110}
              tick={{ fill: CHART_CHROME.text, fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--surface-muted)" }}
              formatter={(value) => [`${formatNumber(Number(value))} products`, ""]}
              contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={16}>
              {data?.distribution.map((entry) => (
                <Cell key={entry.category} fill={colorForCategory(entry.category, PRODUCT_CATEGORIES)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ModuleTile>
  )
}
