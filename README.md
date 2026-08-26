# SkillBridge — Frontend

A React + Vite + Tailwind CSS frontend for SkillBridge, a platform connecting talented people with opportunities.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Lucide React (icons)
- Recharts (admin dashboard charts)

## Pages / Routes
- `/` — Landing page
- `/login` — Login
- `/signup` — Sign up
- `/dashboard` — User dashboard
- `/profile` — Profile & skills
- `/opportunities` — Jobs listing
- `/opportunities/:id` — Job details
- `/post-opportunity` — Post a new opportunity (multi-step form)
- `/applications` — My applications
- `/admin` — Admin dashboard
- `/saved-jobs`, `/messages`, `/notifications`, `/settings`, `/my-projects` — supporting sidebar pages

All data is local mock data in `src/data/mockData.js` — no backend or API calls are used.
