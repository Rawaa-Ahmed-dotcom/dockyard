/**
 * Validated chart palette (light surface). See the dataviz skill's
 * references/palette.md — categorical order is fixed, never reassigned by rank.
 */
export const CHART_CATEGORICAL = [
  "#2a78d6", // blue
  "#eb6834", // orange
  "#1baf7a", // aqua
  "#eda100", // yellow
  "#e87ba4", // magenta
  "#008300", // green
] as const

export const CHART_DIVERGING = {
  positive: "#2a78d6", // blue — stock in
  negative: "#e34948", // red — stock out
} as const

export const CHART_CHROME = {
  grid: "#e1e0d9",
  axis: "#898781",
  text: "#52514e",
} as const

export function colorForCategory(category: string, categories: readonly string[]): string {
  const index = categories.indexOf(category)
  return CHART_CATEGORICAL[index % CHART_CATEGORICAL.length]
}
