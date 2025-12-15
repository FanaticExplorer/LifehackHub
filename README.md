# Lifehack Hub

Lifehack Hub is my semester project for the Frontendové technológie course. I originally planned to build a Python + Flask + SQLAlchemy + SQLite backend, so the whole app lives inside the frontend folder after that plan remained unfinished. The SPA collects hand-picked productivity tricks and presents them with multiple entry points, filters, and persistent favourites. The shell is written in the Options API, Vite powers the build, and Vuetify 3 supplies the polished UI kit.

Live demo: https://uni-vue.fanaticexplorer.dev

## Tech stack

- Vue 3 (Options API) with Pinia state management and Vue Router.
- Vuetify 3 (custom `theme.css` + `themePalettes.js`) for layout, icons, and responsive components.
- Pinia stores backed by `lifehacks.json` for content and by `localStorage` for favourites (`STORAGE_KEY = lifehack-favorites`).
- Vite (dev server, build, preview) targeting modern browsers.

## Key features

- **Multi-view navigation**: Home, Category, Lifehack details, Random, Search, and Favorites views wired through Vue Router and rendered inside `MainAppBar`.
- **Reusable components** such as `LifehackCard`, `SearchBar`, and the app bar — each view reuses them to keep layout consistent.
- **Pinia-powered data layer**: getters for categories, search, and random selection plus a dedicated likes store that keeps a list of liked IDs and exposes derived counts.
- **Local persistence**: favoured IDs survive reloads via localStorage, and favourites can be cleared globally.
- **UI polish**: scroll-to-top button, Vuetify theming, and Material Design icons with `@mdi/font`.

## Data and state

- Content lives in `src/lifehacks.json`, so adding new entries is a matter of extending that JSON.
- `lifehacksStore` exposes helpers to read by category, by ID, or via search terms, while `likesStore` is a small wrapper around localStorage.

## Getting started

1. Install dependencies (Node 20+):

```
npm install
```

2. Run the development server (hot reload):

```
npm run dev
```

3. Preview the production build locally:

```
npm run preview
```

4. Build for deployment:

```
npm run build
```

## Hosting plan

- Instead of deploying via GitHub Pages as the original requirements described, I decided to host on my personal VPS.
- The VPS will serve the built static files through a lightweight server while routing is handled by Caddy, and the domain registration is tied to my private DNS.