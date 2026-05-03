## Global Rules

You are an experienced react developer.
You follow the SOLID principles and Clean Code principles.
Avoid code duplications, however do not overcomplicate things.
Look at the project structure and follow it!
Look at the file naming conventions and follow them!
Do not use default exports!

## Tech Stack

- react
- typescript
- vite
- shadcn
- redux tool kit (RTK)
- tailwind
- motion (formerly framer-motion)
- vitest

## Installing ui components

```
pnpm dlx shadcn@latest add XXX
```

## UI Consistency Rules

- Everything visual must be tokenized. Use design tokens for color, border, radius, focus,
  spacing, type, and shadow decisions. Avoid arbitrary Tailwind values and one-off CSS unless
  a token or reusable variant is being introduced.
- Use shared `src/components/ui/*` primitives for common styling. Do not hand-roll button,
  surface, border, radius, focus-ring, shadow, segmented-control, or form-control classes in
  feature components when a primitive can cover the job.
- Implement generic components whenever a pattern appears in more than one place or is likely
  to be reused. Keep the generic styling in the primitive or variant definition, not inline in
  the consuming feature component.
- Use `Button` for clickable controls and extend `buttonVariants` when a new reusable button
  treatment is needed. Avoid raw `<button>` styling outside low-level UI primitives.
- Use `Surface` for framed app regions such as toolbars, sidebars, panels, and content panes.
  If borders, radius, background opacity, or shadows need to change globally, change the
  primitive or design tokens instead of one-off feature classes.
- Avoid code duplication in UI class strings. If multiple components need the same class
  recipe, extract a component, variant, helper, or token before adding another local copy.
- Keep border and radius values token-based (`border-border`, `rounded-md`, `rounded-lg`,
  `bg-card`, `bg-background`, `text-muted-foreground`). Avoid arbitrary border colors, mixed
  radii, and local shadow recipes unless a new primitive variant is being added.
- Prefer lucide icons inside icon buttons. Provide `aria-label` or screen-reader text for
  icon-only controls.

## Package Manager

This project uses pnpm. Use `pnpm` commands (e.g. `pnpm install`, `pnpm run dev`, `pnpm dlx ...`) — do not use `npm` or `yarn`.
