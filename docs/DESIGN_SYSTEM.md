# DockYard — Design System

This document defines the product vision, personality, and design standards
that every screen in DockYard is built against.

---

## Product Vision

DockYard is the operational command center for inventory.

Users should be able to:

* Track inventory in real time
* Monitor stock health
* Manage products
* Manage suppliers
* Manage warehouses
* Record stock movements
* Identify low-stock risks
* Analyze inventory performance

Every screen must help users make a decision or complete an action.

---

## Product Personality

DockYard should feel:

* Professional
* Calm
* Fast
* Reliable
* Focused
* Industrial
* Modern

Inspired by:

* Linear
* Stripe Dashboard
* Shopify Admin
* Notion
* Vercel

Avoid:

* Bootstrap admin templates
* ThemeForest dashboards
* Dribbble concept UIs
* Generic SaaS layouts

---

## Core Modules

### Dashboard

Operational overview.

Widgets:

* Total Products
* Inventory Value
* Low Stock Items
* Recent Transactions
* Warehouse Summary
* Top Moving Products

No vanity metrics.

### Products

Fields:

* Product Name
* SKU
* Category
* Cost Price
* Selling Price
* Quantity
* Reorder Threshold
* Description
* Image

### Inventory

Functions:

* Stock In
* Stock Out
* Adjustments
* Transfers

Track every movement.

### Suppliers

Fields:

* Supplier Name
* Contact Person
* Email
* Phone
* Address

### Warehouses

Fields:

* Warehouse Name
* Location
* Capacity
* Manager

### Analytics

Visualize:

* Inventory Value Trends
* Product Distribution
* Stock Movement Trends
* Low Stock Reports

Keep charts simple and actionable.

---

## Design Principles

**Rule 1 — Every element must have a purpose.**
If a component does not help the user make a decision or complete an action, remove it.

**Rule 2 — Information hierarchy over visual effects.**
Prioritize typography, layout, and spacing before colors, animations, and effects.

**Rule 3 — Understandable within 5 seconds.**
A user should instantly know where they are, what they're seeing, and what they can do next.

**Rule 4 — Use whitespace aggressively.**
Whitespace improves readability more than visual decoration.

**Rule 5 — Design for operations, not aesthetics.**
The product should help people work faster.

---

## ADHD-Friendly Design Standards

Requirements:

* One primary action per screen
* Clear visual hierarchy
* Minimal distractions
* Predictable layouts
* Consistent interactions
* Progressive disclosure

Avoid:

* Information overload
* Deep nesting
* Hidden actions
* Complex forms

---

## Layout System

8px spacing system. Allowed values: `4, 8, 12, 16, 24, 32, 48, 64`. Never use arbitrary spacing values.

## Typography

Font: **Figtree** (switched from Inter; see [DESIGN.md](../DESIGN.md))

| Level | Size |
|---|---|
| H1 | 36px |
| H2 | 30px |
| H3 | 24px |
| Body | 16px |
| Small | 14px |
| Caption | 12px |

Maximum five font sizes in the app. The public landing page gets one additive
display size (40–64px) for its hero/final-CTA headlines only — see DESIGN.md.

## Color System

Colors must communicate meaning — never used as decoration.

| Meaning | Color |
|---|---|
| Success | Green |
| Warning | Amber |
| Danger | Red |
| Info | Blue |
| Neutral | Warm lavender-gray (not slate — see DESIGN.md) |

The brand accent is purple (`#7c55fb`), used for primary actions and active
state; a pink accent (`#f871d8`) exists but is reserved for the public
landing page's hero/final-CTA gradient fields and never appears inside the
app. Exact tokens live in [DESIGN.md](../DESIGN.md), generated from the
shipped code — treat it as the source of truth over this prose.

## Component Design

Use: clean cards, soft borders, minimal shadows, consistent padding,
pill-shaped buttons/badges/nav items.

Avoid: glassmorphism, excessive gradients outside the landing page's gradient
fields, neon colors, heavy shadows, decorative effects.

Navigation is a top pill-nav bar, not a sidebar — active route renders as a
solid dark pill.

## Tables

Inventory tables are the heart of the application.

Required: search, sort, filters, pagination, bulk actions, keyboard navigation.

Columns: SKU, Product Name, Category, Quantity, Warehouse, Status.

Statuses: In Stock, Low Stock, Out of Stock.

## Forms

Every form must validate instantly, preserve user input, display helpful
errors, and support keyboard navigation.

| Bad | Good |
|---|---|
| "Something went wrong" | "A product with SKU \"PRD-1042\" already exists" |

## Empty States

Every empty state must explain why it's empty, explain what happens next, and
provide a primary action.

> "No products yet" → **Add Product**

## Loading States

Prefer skeleton loaders and optimistic updates. Avoid full-screen spinners.

## Accessibility

Required: keyboard support, proper labels, focus indicators, accessible color contrast.

## Performance Targets

* Lighthouse score > 90
* Initial load < 2 seconds
* Fast page transitions
* Cached API requests

Achieved via lazy loading, query caching, and optimistic UI.

## Code Standards

Never ship: dead code, TODO comments, unused files, massive components.

Preferred: feature-based architecture, small reusable components, strong
typing, clear naming.

* Component target: < 250 lines
* Page target: < 400 lines

## Folder Structure

```
src/
  features/
    dashboard/
    products/
    inventory/
    suppliers/
    warehouses/
    analytics/
  components/
  layouts/
  hooks/
  services/
  types/
  lib/
```

Each feature owns its pages, components, hooks, and services.
