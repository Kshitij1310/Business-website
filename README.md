# Business Website (React + Vite)

A modern business website built with **React**, **Vite**, **Tailwind CSS**, and **Zustand**.

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS
- React Router
- Zustand
- React Hook Form + Zod

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open the app at the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint checks

## Project Structure

```text
src/
  components/      # Reusable UI and page sections
  data/            # Static JSON data files
  lib/             # Constants, validations, helpers
  pages/           # Route-level pages
  store/           # Zustand state stores
  utils/           # Utility components/helpers
```

## Build for Production

```bash
npm run build
```

Production files are generated in the `dist/` folder.

## Deployment

You can deploy the `dist/` output on any static hosting platform:

- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps

## Author

Project repository: https://github.com/Kshitij1310/Business-website
