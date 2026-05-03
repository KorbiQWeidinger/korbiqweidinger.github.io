# korbiqweidinger.github.io

Personal site at [korbiqweidinger.github.io](https://korbiqweidinger.github.io/).

Built from the [vite-shadcn](https://github.com/KorbiQWeidinger/vite-shadcn) template. Deploys to GitHub Pages from `master` via `.github/workflows/pages.yml`.

## Development

```sh
pnpm install
pnpm run prepare   # set up Husky pre-commit hooks (one-time)
pnpm run dev
```

## Scripts

- `pnpm run dev` — start the dev server
- `pnpm run build` — typecheck and build to `dist/`
- `pnpm run lint` — ESLint
- `pnpm run typecheck` — `tsc -b --noEmit`
- `pnpm run test` — Vitest
- `pnpm run prettier:check` / `pnpm run prettier:write`
