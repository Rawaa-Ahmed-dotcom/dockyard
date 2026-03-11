import { lazy, Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { ModuleProducts } from "./ModuleProducts"
import { ModuleInventory } from "./ModuleInventory"
import { ModuleWarehouses } from "./ModuleWarehouses"
import { ModuleSuppliers } from "./ModuleSuppliers"

// Code-split: recharts is heavy and this tile sits below the fold, so it
// shouldn't cost anything on the landing page's initial paint.
const ModuleAnalytics = lazy(() => import("./ModuleAnalytics").then((m) => ({ default: m.ModuleAnalytics })))

export function ModulesSection() {
  return (
    <section id="modules" className="mx-auto w-full max-w-[1200px] scroll-mt-16 px-6 py-16 md:px-8">
      <div className="flex flex-col gap-1 pb-8">
        <h2 className="text-h2 font-semibold tracking-tight text-foreground">
          Everything a warehouse team touches, in one place.
        </h2>
        <p className="max-w-xl text-body text-muted-foreground">
          Five connected modules, one shared source of truth. Every number below is live — the same data your team
          would see the moment they log in.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        <ModuleProducts className="lg:col-span-3" />
        <Suspense fallback={<Skeleton className="h-[276px] w-full lg:col-span-3" />}>
          <ModuleAnalytics className="lg:col-span-3" />
        </Suspense>
        <ModuleInventory className="lg:col-span-2" />
        <ModuleWarehouses className="lg:col-span-2" />
        <ModuleSuppliers className="lg:col-span-2" />
      </div>
    </section>
  )
}
