# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are operations and warehouse staff at small and medium
businesses — the people who manage products, stock levels, suppliers, and
warehouses day to day. The landing page's audience is a prospective
buyer/decision-maker at an SMB (owner, ops manager) evaluating whether to try
the product, arriving with no account and no prior context.

## Product Purpose

DockYard is an inventory and warehouse operations platform. It replaces
spreadsheet-and-guesswork stock management with one fast, focused interface
for tracking inventory in real time, monitoring stock health, managing
products/suppliers/warehouses, recording stock movements, and spotting
low-stock risk before it costs the business money.

## Positioning

Not a generic CRUD admin dashboard. Every screen is built around one
question — what does this user need to decide or do right now — with the
density and speed of tools like Linear, Stripe Dashboard, and Shopify Admin,
rather than the look of template-driven admin dashboards.

## Operating Context

The live product ([src/features](./src/features)) is the app itself:
Dashboard, Products, Inventory, Suppliers, Warehouses, Analytics — reached via
a persistent sidebar shell ([src/layouts/AppLayout](./src/layouts)). The
landing page is a new, separate marketing surface in front of that app, not
part of the authenticated shell.

## Capabilities and Constraints

- Frontend-only right now: data comes from an in-memory mock service layer
  ([src/services](./src/services)), no real backend/auth exists yet.
- **The landing page's CTA routes straight into the live dashboard** — no
  sign-in/sign-up gate, since there is nothing real to authenticate against.
- **No fabricated social proof.** No invented testimonials, customer logos,
  user counts, or pricing — none of that is real yet and none should be
  implied as real. The landing page sells the product on what it actually
  does, using its real UI as evidence.
- Deployed as a static SPA on Vercel ([vercel.json](./vercel.json)).

## Brand Commitments

- Name: **DockYard**.
- Personality: professional, calm, fast, reliable, focused, warm, confident.
  Explicitly not a Bootstrap/ThemeForest/Dribbble-concept look.
- Typeface: **Figtree** (switched from Inter in this pass, at the user's
  explicit direction), five-size type scale in the app, 8px spacing system.
- Palette: purple `#7c55fb` primary, pink `#f871d8` secondary accent (public
  landing surface only), warm lavender-tinted neutrals — switched from the
  original slate/Inter system at the user's explicit direction, inspired by
  reference screenshots they supplied.
- Color *meaning* is still fixed: green = success, amber = warning, red =
  danger, blue = info — status colors are never decorative, even though the
  neutral base and brand accent changed.
- Brand mark ([public/favicon.svg](./public/favicon.svg)): purple, close in
  hue to the new primary.
- Full design system recorded at [DESIGN.md](./DESIGN.md) (visual system,
  ground truth from the shipped code) and
  [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) (original product-spec
  prose — its Typography/Color sections predate this rebrand; DESIGN.md is
  the current source of truth for tokens).

## Evidence on Hand

- The real product UI (all six feature modules, fully built) is the only
  legitimate proof material available. No customer testimonials, logos, case
  studies, or real pricing exist — future work must not invent them.

## Product Principles

1. Every element must help the user decide or act — nothing decorative.
2. Information hierarchy (typography, layout, spacing) before visual effects.
3. A user should understand where they are and what to do next within 5 seconds.
4. Whitespace and restraint over density-for-its-own-sake.
5. ADHD-friendly: one primary action per screen, predictable, no hidden actions.
