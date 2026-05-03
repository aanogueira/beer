# 🍺 Beer — Drink Counter / Contador de Bebidas

[![Docker](https://github.com/aanogueira/beer/actions/workflows/docker.yml/badge.svg)](https://github.com/aanogueira/beer/actions/workflows/docker.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)

A small, friendly web app that tallies drinks per team — perfect for a Futsal tournament, a pub league, or any group competition. Bilingual (English / Português), browser‑local persistence, no accounts.

![Preview](docs/preview.png)

## ✨ Features

- **Per‑team counter** — add or remove drinks in steps of 1, 2, 5, or 11.
- **Live leaderboard chart** — bar chart updates as you click.
- **Bilingual UI** — toggle between Portuguese and English in the header (your choice is remembered).
- **Persistent locally** — teams and counts survive a refresh via `localStorage`. No backend, no accounts.
- **No accidental deletes** — drunk‑proofed: teams can only be added, not removed (clear browser storage if you really need to).
- **Distinct team colors** — each new team picks a unique color from a curated palette.

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Build and run a production server locally:

```bash
npm run build
npm start
```

## 🐳 Docker

Pull the latest published image and run it:

```bash
docker run --rm -p 3000:3000 ghcr.io/aanogueira/beer:latest
```

Or build it yourself:

```bash
docker build -t beer .
docker run --rm -p 3000:3000 beer
```

The image is a multi‑stage build using Next.js' `standalone` output. It runs as a non‑root `node` user and ships a `HEALTHCHECK` against `/`.

## 🤖 Continuous Integration

`.github/workflows/docker.yml` builds the image on every PR (no push) and on every push to `main` and on `v*.*.*` tags it publishes multi‑arch (`linux/amd64`, `linux/arm64`) images to **GHCR**:

- `ghcr.io/aanogueira/beer:latest` — head of `main`
- `ghcr.io/aanogueira/beer:sha-<short>` — pinned to a commit
- `ghcr.io/aanogueira/beer:<version>` — for tagged releases

Caching uses GitHub Actions cache (`type=gha`) so warm builds finish in seconds.

## 💾 How data is stored

All teams and counts live in your browser's `localStorage` under the key `teams`. Clear site data (or open a different browser) and you start fresh. Need to remove a team? Edit the JSON in DevTools → Application → Local Storage. 😉

## 🛠 Tech

- [Next.js 15](https://nextjs.org) (App Router, standalone output)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Recharts](https://recharts.org) for the bar chart
- [lucide-react](https://lucide.dev) for icons
- TypeScript

## 📝 Origin story

A small app whipped up in a few hours, originally for a friend running a futsal tournament side‑bet on which team's supporters would drink the most. It stuck around because it's just *fun*.

---

<details>
<summary>🇵🇹 <strong>Português</strong></summary>

### Beer — Contador de Bebidas

Aplicação simples para contar o número de bebidas consumidas por equipa. Construída com Next.js, Tailwind CSS e TypeScript.

#### Funcionalidades

- **Contador por equipa** — adicionar ou remover em passos de 1, 2, 5 ou 11.
- **Gráfico em direto** — barra de classificação atualiza ao clicar.
- **Interface bilingue** — alterna entre Português e Inglês no cabeçalho (a escolha fica guardada).
- **Persistência local** — equipas e contagens sobrevivem a um refresh via `localStorage`. Sem backend, sem contas.
- **À prova de bêbados** — não dá para remover equipas (esse é o ponto). Para limpar, apaga o storage do browser.
- **Cores distintas** — cada nova equipa recebe uma cor única de uma paleta curada.

#### Começar

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

#### Docker

```bash
docker run --rm -p 3000:3000 ghcr.io/aanogueira/beer:latest
```

#### Onde estão os dados?

Tudo guardado no `localStorage` do browser, na chave `teams`. Limpa os dados do site para começar do zero. Para remover uma equipa, edita o JSON nas DevTools.

#### Origem

App feita em poucas horas para um amigo que precisava de uma forma divertida de contar quantas bebidas cada claque comprava num torneio de futsal. Ficou. 🍻

</details>

## 📄 License

MIT — see [LICENSE](LICENSE).
