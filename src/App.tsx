import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

import { AppLayout } from "@/layouts/AppLayout"
import { NotFoundPage } from "@/components/layout/NotFoundPage"
import { LandingPage } from "@/features/landing/pages/LandingPage"

const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })))
const ProductsPage = lazy(() => import("@/features/products/pages/ProductsPage").then((m) => ({ default: m.ProductsPage })))
const InventoryPage = lazy(() => import("@/features/inventory/pages/InventoryPage").then((m) => ({ default: m.InventoryPage })))
const SuppliersPage = lazy(() => import("@/features/suppliers/pages/SuppliersPage").then((m) => ({ default: m.SuppliersPage })))
const WarehousesPage = lazy(() => import("@/features/warehouses/pages/WarehousesPage").then((m) => ({ default: m.WarehousesPage })))
const AnalyticsPage = lazy(() => import("@/features/analytics/pages/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage })))

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="warehouses" element={<WarehousesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
