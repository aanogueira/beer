# Beer App Polish — Design

**Date:** 2026-05-03
**Status:** Approved (brainstorming complete, awaiting plan)

## Goal

Polish the existing Next.js drink-counter app:

1. Fix correctness issues in the team/drinks logic.
2. Apply a bolder beer-themed visual refresh.
3. Add bilingual (EN/PT) support behind a language toggle.
4. Polish the README.
5. Add CI that builds and publishes the Docker image to GHCR.

The app remains a single-page, client-only, localStorage-backed counter. No backend, no auth, no team deletion.

## Out of scope

- Backend, sync, or auth.
- Removing teams (intentional original behavior — drunk users might delete by accident).
- Test suite (none exists; not part of this polish).
- Tailwind v4 theming overhaul beyond adding beer-color tokens.

---

## 1. Logic & correctness fixes

| Bug | Fix |
| --- | --- |
| `colorPalette` has duplicates (`#06b6d4`, `#0f766e`) despite the comment claiming uniqueness. | Replace with a curated, deduplicated palette. Assign **next-unused** color rather than random, wrapping when teams exceed palette size. |
| Teams with the same trimmed (case-insensitive) name can be added, breaking the React `key` and the lookup. | Reject duplicates in `addTeam`; show inline validation error in PT/EN. |
| First render flashes "Nenhuma equipa" because `teams` is `[]` until `useEffect` runs. | Track a `hydrated: boolean` flag; render a neutral skeleton (or nothing in the team list area) until `hydrated === true`. |
| Selected team drifts after `addDrinks` because we recompute its drinks count locally instead of looking it up in the updated array. | After updating teams, derive the new selected team via `updated.find(t => t.name === selectedTeam.name)`. Single source of truth. |
| `<html lang="en">` is hardcoded but content is PT. | Set `lang` from the active language (PT default, switchable to EN). |
| New-team form lacks keyboard ergonomics. | Enter submits, Esc cancels. |

## 2. Beer-theme refresh

### Color tokens

Added in `globals.css` under `:root`:

```css
--beer-amber:  #b45309;  /* primary brand */
--beer-gold:   #f59e0b;  /* accents, +buttons */
--beer-foam:   #fef3c7;  /* surfaces, foam highlights */
--beer-malt:   #78350f;  /* deep accent */
--beer-stout:  #1c1410;  /* primary text */
--beer-glass:  rgba(255,255,255,0.6);
```

### Page treatment

- Background: vertical gradient from foam-cream at the top to a low-opacity warm amber at the bottom (~5% over near-white). Chart contrast preserved.
- Main card: warmer surface (off-white with a faint cream tint) instead of pure white.
- Header: sticky strip with a thin foam-top gradient bar (white→cream blur), beer-mug icon, title, and language toggle on the right.

### Increment grid (DrinkIncrement)

- Drop the per-button rainbow.
- `+` buttons: amber-gradient (gold→amber) with white text. Sizes +1 / +2 / +5 / +11.
- `-` buttons: muted stout (sand→clay) with deep-text. Sizes -1 / -2 / -5 / -11.
- Same 4-column grid layout, larger touch targets.

### Team list

- Active row keeps the team-color left border, plus a thin **foam stripe** on top (cream rule), suggesting a beer pour.
- Color dot stays as the team identity.

### Empty states

- Bilingual prompt centered with a beer-mug glyph (already imported).

## 3. Internationalization

### Library choice

No external i18n library. A small in-repo module is enough for ~25 strings.

### Files

- `src/lib/i18n.ts`
  ```ts
  export type Lang = 'pt' | 'en';
  export const messages = { pt: { ... }, en: { ... } } as const;
  export type MessageKey = keyof typeof messages.pt;
  ```
- `src/lib/lang-context.tsx` — `LangProvider`, `useLang()` returning `{ lang, setLang, t }`.
  - `t(key)` returns the string in the active language.
  - On mount: read `localStorage.lang`; if absent, detect from `navigator.language` (`pt-*` → PT, else EN); default PT.
  - Side-effect: keep `document.documentElement.lang` in sync.

### Toggle UI

- Header pill `[ PT | EN ]`. Active half filled amber with white text; inactive half on cream. Click to switch.

### Coverage

Every visible string moves to a key. Numeric units in the chart tooltip pick the right plural ("1 bebida" vs "2 bebidas" / "1 drink" vs "2 drinks").

## 4. Dockerfile improvements

- Base: `node:20-alpine` (pinned major), not `node:alpine`.
- Multi-stage build:
  - **deps** stage: `npm ci` from `package*.json` only (cache layer).
  - **builder** stage: copy source, run `npm run build`. Standalone output is enabled in `next.config.ts` via `output: 'standalone'` (see section 7), so the build emits `.next/standalone` and `.next/static`.
  - **runner** stage: `node:20-alpine`, copies only `.next/standalone`, `.next/static`, `public`. Runs as the existing `node` user.
- `EXPOSE 3000`, `ENV NODE_ENV=production`, `ENV PORT=3000`, `ENV HOSTNAME=0.0.0.0`.
- `HEALTHCHECK` curl/wget against `http://localhost:3000/` (use `wget --spider` since alpine ships it).
- `CMD ["node", "server.js"]` (the standalone server).

Expected image size drop from ~600 MB to ~150 MB.

## 5. CI workflow — `.github/workflows/docker.yml`

### Triggers

- `push` to `main`
- `push` of tags matching `v*.*.*`
- `pull_request` (build only, no push)

### Permissions

```yaml
permissions:
  contents: read
  packages: write
```

### Steps

1. `actions/checkout@v4`
2. `docker/setup-qemu-action@v3`
3. `docker/setup-buildx-action@v3`
4. `docker/login-action@v3` against `ghcr.io` — only when `github.event_name != 'pull_request'`. Uses `${{ github.actor }}` and `${{ secrets.GITHUB_TOKEN }}`.
5. `docker/metadata-action@v5` — generates tags:
   - `type=ref,event=branch` (yields `main`)
   - `type=sha,format=short` (`sha-abcdef0`)
   - `type=semver,pattern={{version}}` (on git tags)
   - `type=raw,value=latest,enable={{is_default_branch}}`
6. `docker/build-push-action@v6` — `platforms: linux/amd64,linux/arm64`, `push: ${{ github.event_name != 'pull_request' }}`, `cache-from: type=gha`, `cache-to: type=gha,mode=max`, tags/labels from metadata step.

### Image location

`ghcr.io/<owner>/beer` (lowercased; the metadata action handles this).

## 6. README polish

Structure:

1. Title + one-line description (EN).
2. Badges row: CI status, license, Next.js version.
3. Screenshot (existing `docs/preview.png`).
4. **Features** — bullet list (per-team count, bilingual, persistent local storage, charted leaderboard).
5. **Quickstart** — `npm install && npm run dev`.
6. **Docker** — `docker run -p 3000:3000 ghcr.io/<owner>/beer:latest`.
7. **How data is stored** — note that everything is in browser localStorage; clearing site data wipes teams.
8. **Origin story** — keep the friendly note about the futsal tournament.
9. Collapsible `<details>` block: 🇵🇹 **Português** — same content translated.

## 7. File-level change list

| File | Change |
| --- | --- |
| `src/lib/i18n.ts` | **New.** Message catalog + types. |
| `src/lib/lang-context.tsx` | **New.** Provider + `useLang` hook. |
| `src/lib/colors.ts` | **New.** Curated unique palette + `pickNextColor(usedColors)` helper. |
| `src/lib/utils.ts` | Unchanged (still hosts `cn`, `readTeams`, `writeTeams`). |
| `src/app/layout.tsx` | Wrap children in `LangProvider`. Move `<html lang>` to a client-side effect. |
| `src/app/page.tsx` | Use `useLang().t`, hydration flag, dedup-name guard, color picker, derive selected team from updated array. |
| `src/components/DrinksCounter.tsx` | Use `t`. Header now hosts the language toggle. |
| `src/components/DrinkIncrement.tsx` | Re-themed buttons (+ amber gradient, − stout). Bilingual labels. |
| `src/components/GraphDisplay.tsx` | Tooltip uses `t` with pluralization. |
| `src/components/LangToggle.tsx` | **New.** PT/EN pill. |
| `src/app/globals.css` | Add beer color tokens; subtle background gradient. |
| `next.config.ts` | `output: 'standalone'`. |
| `Dockerfile` | Multi-stage, pinned, non-root, healthcheck, standalone runner. |
| `.dockerignore` | Add `.github`, `docs/superpowers`, `*.md` already there. |
| `.github/workflows/docker.yml` | **New.** Build & push to GHCR. |
| `README.md` | Bilingual rewrite per section 6. |

## 8. Acceptance criteria

- `npm run build` and `npm run lint` pass.
- Reload no longer flashes the empty state.
- Adding two teams named "Alpha" / "alpha " is rejected with a visible message.
- Two teams never share a color until the palette is exhausted.
- Toggling PT↔EN updates every visible string and `<html lang>` immediately; choice survives reload.
- `docker build .` succeeds; resulting image is ≤ 200 MB and runs `next start` equivalent.
- CI workflow lints (actionlint optional) and on a PR builds without pushing; on a push to `main`, pushes `latest` and `sha-<short>` to GHCR.
- README renders cleanly with both English and Portuguese sections.
