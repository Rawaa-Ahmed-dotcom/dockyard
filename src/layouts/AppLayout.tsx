import { Suspense } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { Topbar } from "@/components/layout/Topbar"
import { PageLoader } from "@/components/layout/PageLoader"

export function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex h-dvh w-full flex-col bg-background">
      <Topbar />
      <main className="app-canvas flex-1 overflow-y-auto">
        <div key={pathname} className="app-enter mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
