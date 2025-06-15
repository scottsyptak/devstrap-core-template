# Quick Start (Windows) – devstrap-core-template v1.0.5

Welcome to the **DevStrap Core Template**! This guide will walk you through cloning, setting up, running, testing, and deploying this project on **Windows**, assuming you will use **Git Bash** and **VS Code**. The instructions should not differ much, if at all, on a Linux or Mac OS, with one notable exception:

- Windows uses `source .venv/Scripts/activate` to activate the Python virtual environment, however
- Linux uses `source .venv/bin/activate`

---

## 🚀 Step 1: Clone the Template

1. Visit https://github.com/FunhouseAtelier/devstrap-core-template
2. Click the green "Use this template" button to fork the template into a repo of your own
3. Open VS Code in the folder where you want the new project folder to be created.
4. Open **Git Bash** in your VS Code terminal.
5. Clone the forked repo you just created. By default it would be:

```bash
git clone https://github.com/<GITHUB_USERNAME>/devstrap-core-template.git
```

6. **(Optional)** Rename the project folder.

```bash
mv devstrap-core-template <YOUR_PROJECT_NAME>
```

If this does not work in VS Code, try closing the folder you are in via `File > Close Folder`, then start a new terminal, navigate to the folder you were in (`/WebDev/`?), and run the command again.

7. In VS Code select `File > Open Folder...` and open the new project folder, which would be `devstrap-core-template` by default. This is the folder all scripts are intended to be run from, and it contains the git repository for your fork of the project.

**(Optional)** If you changed the project folder name, you should change the default project name to yours in

- `backend/package.json`
- `frontend/package.json`
- `backend/fly.toml`

## 🎨 Step 2: Set Up the Frontend

**Open a new terminal.**

### 2.1 Install Node Dependencies

```bash
cd frontend
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is a flag I'm using as a workaround until the `helmet` package officially supports React 19. It seems to work fine, despite the official lack of support.

### 2.2 Set Up Environment Variables

```bash
cp .env.example .env
```

This copies the `.env.example` file for the frontend to the actual `.env` file that will be used. For the Core edition you do not need to modify it, because no secrets are used, just accept the example defaults and you are good to go.

### 2.3 Start the Dev Server

This runs the Vite frontend server, which can be used to work on React code specifically without running the backend server for server-side routing.

```bash
npm run dev
```

Visit: `http://localhost:5173`

If you have not started the backend server yet (you shouldn't before you build) some of the functionality will be broken:

- `/api/health` will not work, it's a pure API endpoint, so backend is needed
- `/api-status` will render with an error status, because it polls the above API endpoint
- `/demo/rendering/server-side` will not work, it's a pure SSR route, so there is no React route component to render
- `/demo/rendering/hybrid` will only show the React part of the page, not the template it is meant to be contained in

Live reload is enabled. You can test modifying views in:

- `frontend/src/routes/ClientSideRendering.tsx` (e.g., change the message to your own)
- or any file within `frontend/src/routes/`

As soon as you save the file the changes should be rendered in the browser.

### 2.4 Build the Static Assets

This will transpile all of the React code and export it to the backend for serving to browsers. You must do this at least once to enable the backend server to run with no errors (it looks for these files), so don't skip to the backend setup, but it is not necessary to build when only testing with the frontend development server (`http://localhost:5173`).

You should re-build whenever you have changed anything in the frontend code that you want to see reflected on the backend server (`http://localhost:8080`), but if you only need to test React code you do not need to build before testing with the frontend development server (`http://localhost:5173`), Vite will hot reload all of your changes after saving a file.

You may build the static assets while running any and all of the development servers, just open a new terminal window to avoid stopping the server(s). Always do it before checking the backend server (`http://localhost:8080`) for any updates that combine frontend components with routes that exist on the backend (SSR or hybrid, not CSR). If your updates to React components are not showing on the backend server you probably need to run this again (still in `frontend/`).

```bash
npm run build
```

---

## 🧱 Step 3: Set Up the Backend

**Open a new terminal.**

### 3.1 Create a Python Virtual Environment

```bash
cd backend
python -m venv .venv
```

> 🧠 Tip: If `python` isn't found, install Python 3.11+ from [python.org](https://www.python.org/) and make sure to check "Add to PATH", then kill all terminals and start a new one. In the new terminal enter command `exec bash -l` to force Bash to restart and update the `PATH` it uses.

#### Activating a Python Virtual Environment

```bash
source .venv/Scripts/activate
```

You will know it worked if you see `(.venv)` at the start of all future terminal prompts.

This terminal is now using the Python virtual environment, which is Python's solution to packaging extensions for the backend, similar to NPM in Node, but instead of installing into a `node_modules` folder it installs to a `.venv` virtual environment folder, so when running code directly inside `backend/` like this you always want to ensure you are using the virtual environment.

Note that any new terminals you create in VS Code, no matter what location, will not automatically use this virtual environment, so you must do it for each terminal you want to use for direct `backend/` work. The helper scripts included in this project activate the virtual environment for you.

#### Deactivating a Python Virtual Environment

```bash
deactivate
```

It's that simple. You will know it worked if you **do not** see `(.venv)` at the start of all terminal prompts.

### 3.2 Install Python Requirements

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

This is analogous to `npm install` for Python, and `requirements.txt` is like the `dependencies` data in `package.json`. It will install all of the Python packages needed to run the backend.

### 3.3 Set Up Environment Variables

```bash
cp .env.example .env
```

This copies the `.env.example` file for the backend to the actual `.env` file that will be used. For the Core edition you do not need to modify it, because no secrets are used, just accept the example defaults and you are good to go.

### 3.4 Format Jinja2 Templates with djlint

#### Install the **DjLint extension** (author: monosans) for VS Code:

1. Open VS Code
2. Go to Extensions → Search for `djlint`
3. Install and restart extensions if asked

#### Install the **Better Jinja** (author: Samuel Colvin) for VS Code:

1. Open VS Code
2. Go to Extensions → Search for `jinja`
3. Install and restart extensions if asked

#### Configure VS Code for Syntax Highlighting

1. Search for "settings" in your VS Code settings (`Ctrl + ,`, control-comma).
2. Click "Edit in settings.json"
3. Merge in the config for syntax highlighting in Jinja templates:

```json
{
  "files.associations": {
    "*.jinja": "jinja-html",
    "*.jinja2": "jinja-html",
    "*.j2": "jinja-html"
  },
  "editor.formatOnSave": true,
  "djlint.format.enable": true
}
```

4. Save and close `settings.json`.

Now your Jinja templates (`*.jinja` in this project) will have nice syntax highlighing and auto-formatting, using my own custom formatting settings inside the file `backend/pyproject.toml`.

### 3.5 Run the Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

Allow Python permission to host the development server.

Visit: `http://localhost:8080`

The frontend dev server at `http://localhost:5173` should now be completely functional as well. It proxies anything that needs to hit the backend with `localhost:8080` instead of `localhost:5173`. But you do not need to keep running the frontend server anymore if you don't want to work on the React code, the backend server will cover all routes, because you ran `npm run build` in the `frontend/` folder before you got here. You did build before running the backend server, didn't you? :)

### 3.6 Install the Tailwind CLI

**Open another terminal.** (third and last one if you do it manually like this instead of just running `scripts/dev.sh` from the project root folder)

```bash
cd backend
npm install
```

### 3.7 Run the Backend Tailwind Monitor

```bash
npx tailwindcss \
  -i ./app/static/css/tailwind.css \
  -o ./app/static/css/app.css \
  --content "./app/templates/**/*.{jinja,j2,html}" \
  --minify \
  --watch
```

Yeah, this one is a mouthful, which is why I automated it in `scripts/build.sh`, which also builds the static assets with `npm run build`. This long command will start the Tailwind monitor necessary for live updates of Tailwind styling on the backend.

As always, the backend is server-side rendered, so the changes will not appear automatically in your browser when you save the file after changing Tailwind utility classes, you will need to reload the page. What the monitor does when you save a file with Tailwind utility classes is it quickly rebuilds a file called `app.css` that contains all of the styles you are using on the backend, and more importantly none of the Tailwind styles you are not using there, for efficiency.

You don't need to run a Tailwind monitor on the frontend because Vite handles that for you. Eventually Vite will handle the backend monitoring too, in Emulsion, when the folder structure is unified.

Live reload is enabled. You can test modifying views in:

- `backend/app/routes/pages/demo/rendering/server-side.tsx`
- or any file within `backend/app/routes/`

---

## ✅ Step 4: Test Changes in Both Sides

Make sure both backend (`localhost:8080`) and frontend (`localhost:5173`) are running, and your changes to views on each are reflected appropriately (must `npm run build` for backend server to see changes to React content).

Try editing the Jinja2 page template at:

```plaintext
backend/app/routes/pages/demo/rendering/server-side.jinja
```

and the corresponding React route component:

```plaintext
frontend/src/routes/demo/rendering/ClientSideRendering.tsx
```

You’ll see changes appear live in the browser! On the backend don't forget to reload the page.

---

## 🛑 Step 5: STOP! (in the name of all that is sacred)

**Open another terminal.**

Run `scripts/stop.sh` from the project root folder to stop all servers at once. You don't want to leave them running when you are not developing the app.

## 🚀 Step 6: Deploy to Production

### 6.1 Initialize Fly.io

If you haven’t already:

**Open another terminal.**

```bash
cd backend
fly auth login
fly launch  # follow the prompts
```

### 6.2 Deploy Backend to Fly.io

```bash
fly deploy
```

The backend is served on port `8080` (already configured in `fly.toml`).

Wait for the new deployment to succeed. You should get a success response in the terminal and the process will end.

You may also deploy by running `scripts/deploy.sh` from the project root folder.

## 📦 Summary

You now have:

- Isolated Python virtualenv for backend
- Node-based Vite frontend with Tailwind CSS
- Live reload for both layers
- Easy local development and Fly.io production deployment

---

Happy hacking from **Funhouse Atelier**! 🎪

If you encounter bugs or want to suggest improvements, submit an issue or PR:
👉 [github.com/FunhouseAtelier/devstrap-core-template](https://github.com/FunhouseAtelier/devstrap-core-template)

---
