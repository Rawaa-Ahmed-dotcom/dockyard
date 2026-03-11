import { Link, NavLink } from "react-router-dom"
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Box,
  LayoutDashboard,
  Package,
  Search,
  Truck,
  Warehouse as WarehouseIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/products", label: "Products", icon: Package },
  { to: "/app/inventory", label: "Inventory", icon: ArrowLeftRight },
  { to: "/app/suppliers", label: "Suppliers", icon: Truck },
  { to: "/app/warehouses", label: "Warehouses", icon: WarehouseIcon },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
]

export function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-surface px-4 md:px-6">
      <Link to="/" className="flex shrink-0 items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Box className="size-4" />
        </div>
        <span className="hidden text-small font-semibold tracking-tight sm:inline">DockYard</span>
      </Link>

      <nav
        className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"
        aria-label="Primary"
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-2.5 text-small font-medium transition-colors sm:px-4",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )
            }
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Avatar className="size-8">
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
