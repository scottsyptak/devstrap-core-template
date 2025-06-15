# DevStrap Core Template

A full-stack boilerplate using FastAPI + Jinja2 + Tailwind CSS on the backend, and React + Vite + Tailwind CSS on the frontend.

---

## 🔧 Custom Scripts (in `scripts/`)

These Bash scripts simplify development and deployment tasks:

### `scripts/dev.sh`

Runs the backend, frontend, and Tailwind CSS watcher concurrently.

### `scripts/stop.sh`

Kills known dev processes (`uvicorn`, `vite`, `tailwindcss`) by name.

### `scripts/build.sh`

Builds the frontend using Vite and the backend styles with Tailwind CSS.

### `scripts/health.sh`

Hits `/api/health` and `/api/version`, and opens `/api-status` in the browser.

---

## 📁 Folder / File Breakdown

```
devstrap-core-template/
│
├── backend/                        # FastAPI backend
│   ├── app/
│   │   ├── routes/                # Route handlers
│   │   ├── templates/             # Jinja2 templates
│   │   ├── static/                # Static files (CSS, images)
│   │   ├── utils/                 # Helper functions
│   │   └── main.py                # App entrypoint
│   └── .env.example               # Example backend env file
│
├── frontend/                      # React + Vite frontend
│   ├── src/                       # React source files
│   ├── index.html                # Vite entry HTML
│   └── .env.example              # Example frontend env file
│
├── scripts/                       # Custom dev scripts
│
└── README.md                      # You're here
```

---

## 🧱 Tech Stack

- **Backend:** FastAPI, Jinja2, Starlette, Uvicorn, Tailwind CSS 4
- **Frontend:** React 19, Vite 6, Tailwind CSS 4
- **Dev Tools:** TypeScript, ESLint, custom Bash scripts
- **Deployment:** Fly.io
- **Interop:** SSR and client-side hybrid rendering
- **Extras:** Live Tailwind building, scoped template rendering, Helmet for `<head>` management

---

## ✅ Version 1.0.0 Highlights

- ✨ Hybrid SSR + CSR scaffold
- 🔄 Tailwind CLI + live Jinja updates
- ⚙️ Custom dev/build scripts
- 🚦 Working health check + status pages
- 🧪 Tested deployment to Fly.io
