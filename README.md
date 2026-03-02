# Business Website

This project is a responsive business website built with React and Vite.  
It includes service-focused sections, company highlights, and interactive forms like **Get a Quote** and **Request a Callback**.

## What this project includes

- Clean landing page with reusable section components
- Dynamic sections powered by JSON data (`services`, `industries`, `clients`, `team`, `stats`)
- Quote and callback forms with validation
- Modal + toast flow for better user feedback
- Basic admin dashboard page for managing/monitoring quote-related UI state

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS
- React Router
- Zustand (state management)
- React Hook Form + Zod (form handling and validation)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

After running this command, open the local URL shown in terminal (usually `http://localhost:5173`).



## Project Structure

```text
src/
  components/      # Reusable UI blocks and page sections
  data/            # JSON data for content-driven sections
  lib/             # Constants, session helpers, validations
  pages/           # Route-level pages (Home, QuotePage, AdminDashboard)
  store/           # Zustand stores
  utils/           # Utility components/helpers
```

## Build for Production

```bash
npm run build
```

This creates an optimized production bundle inside the `dist/` folder.

## Deployment



- Vercel

## Repository

https://github.com/Kshitij1310/Business-website
