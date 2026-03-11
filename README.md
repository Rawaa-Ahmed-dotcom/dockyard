<div align="center">

<img src="./public/readme-banner.svg" alt="DockYard — the operational command center for inventory" width="100%" />

<br/>

[![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-package_manager-f69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/new)
[![License](https://img.shields.io/badge/license-private-6b6663?style=flat-square)](#license)

</div>

<br/>

## What is DockYard?

DockYard is an inventory and warehouse operations platform for small and medium
businesses. It replaces the spreadsheet-and-guesswork approach to stock
management with a single, fast interface for the day-to-day work of running a
warehouse: knowing what you have, where it is, what's running low, and what
happened to it.

It isn't a generic CRUD dashboard. Every screen is built around one question —
*what does this user need to decide or do right now?* — with the visual
density and speed of tools like Linear, Stripe Dashboard, and Shopify Admin:
calm, information-dense, but never cluttered.

## Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Data layer](#data-layer)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [License](#license)

## Screenshots

<table>
<tr>
<td width="50%"><img src="./docs/screenshots/dashboard.png" alt="DockYard dashboard — stat cards, recent transactions, top moving products" width="100%" /><p align="center"><sub>Dashboard</sub></p></td>
<td width="50%"><img src="./docs/screenshots/products.png" alt="DockYard products table — search, filters, status badges" width="100%" /><p align="center"><sub>Products</sub></p></td>
</tr>
</table>

## Features

| Module | Purpose |
|---|---|
| 📊 **Dashboard** | Operational overview — total products, inventory value (with a real 7-day delta), low-stock items, recent transactions, warehouse summary, top movers. No vanity metrics. |
| 📦 **Products** | The product catalog — name, SKU, category, cost/selling price, quantity, reorder threshold, description, image. Deep-linkable filters (`?status=low-stock`). |
| 🔁 **Inventory** | Every stock movement: stock in, stock out, adjustments, transfers between warehouses — fully tracked. |
| 🚚 **Suppliers** | Supplier directory with contact person, email, phone, and address. |
| 🏭 **Warehouses** | Warehouse records — name, location, capacity, manager, live utilization. |
| 📈 **Analytics** | Inventory value trends, product distribution, stock movement trends, and low-stock reports as simple, actionable charts. |

Every table supports search, sort, filters, pagination, bulk actions, and
keyboard navigation, with a consistent **In Stock / Low Stock / Out of Stock**
status model throughout. A public [landing page](#screenshots) at `/`
showcases the real, live app — not mockups — before sending visitors into
the dashboard at `/app`.

## Tech stack

**Frontend** — React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn-style components on Radix primitives · React Router · TanStack Query · TanStack Table · React Hook Form · Zod · Recharts · Lucide icons · Figtree (self-hosted)

**Backend (target)** — Supabase (PostgreSQL, Auth, Row Level Security, Storage)

**Deployment** — Vercel · **Package manager** — pnpm

## Getting started

```bash
pnpm install
pnpm dev       # start the dev server
pnpm build     # type-check + production build
pnpm preview   # preview the production build
```

## Deployment

Deployed on [Vercel](https://vercel.com). [vercel.json](./vercel.json) sets
the build command, output directory, and the SPA rewrite required for
client-side routing (React Router) so deep links and page refreshes resolve
correctly.

1. Push the repo to GitHub/GitLab/Bitbucket
2. Import it in Vercel — framework preset **Vite**, build command `pnpm build`, output directory `dist`
3. Deploy

No environment variables are required yet — see [Data layer](#data-layer).

## Data layer

The app currently runs on an **in-memory mock data layer**
([src/services](./src/services)) seeded with realistic sample data — no
backend required to run it. Every service function (`listProducts`,
`createMovement`, etc.) mirrors the shape a real Supabase query would return,
so swapping in Supabase later means replacing the contents of
`src/services/*.service.ts` without touching feature code, hooks, or
components.

> **Note:** state resets on page reload — this is a prototype data layer, not persistence.

## Project structure

```
src/
  features/            # dashboard, products, inventory, suppliers, warehouses, analytics, landing
    <feature>/
      pages/            # route-level page components
      components/       # feature-scoped UI
      hooks/             # TanStack Query hooks
  components/
    ui/                 # shadcn-style primitives (button, dialog, table, ...)
    layout/             # Topbar (top pill-nav), PageHeader, AppLayout shell
    shared/             # EmptyState, StatusBadge, ConfirmDialog
  services/             # mock data layer (swap for Supabase later)
  types/                 # shared domain types
  lib/                   # utils, chart color tokens
```

## Design system

Full design tokens, component conventions, and motion patterns are recorded
in [DESIGN.md](./DESIGN.md), generated from the shipped code. Product goals,
users, and durable constraints are in [PRODUCT.md](./PRODUCT.md). Original
product-spec prose lives at
[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md).

**Brand:** Figtree · purple `#7c55fb` primary · pink `#f871d8` accent (public landing page only) · warm lavender-tinted neutrals · pill-shaped interactive elements throughout.

## License

Private project — all rights reserved.
