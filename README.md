# web_app

A small full-stack item management application built with React, Express, and SQLite. The frontend provides the dashboard and CRUD interface; the backend exposes the JSON API and persists data locally.

## Features

- React and Vite frontend
- Express API with health and item CRUD routes
- SQLite persistence through `better-sqlite3`
- Form validation, loading states, feedback, and delete confirmation
- Node.js backend tests and frontend production builds

## Requirements

Install the tools required by the project before getting started:

- Git
- Node.js and npm
- A supported web browser
- Node.js 20 or newer is recommended

## Getting Started

Clone the repository and enter the project:

```bash
git clone <repository-url>
cd web_app
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies in a second terminal:

```bash
cd frontend
npm install
```

The backend creates `backend/app.db` automatically on first start. You can optionally create `backend/.env` with `PORT=3000`.

Start the backend:

```powershell
cd backend
npm run dev
```

Start the frontend in a second terminal:

```powershell
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`. The Vite development proxy forwards `/api` requests to `http://localhost:3000`.

## Available Scripts

| Command | Description |
|---|---|
Run these commands from the indicated directory:

| Directory | Command | Description |
|---|---|---|
| `backend` | `npm run dev` | Starts the API with file watching |
| `backend` | `npm start` | Starts the API |
| `backend` | `npm test` | Runs API tests |
| `frontend` | `npm run dev` | Starts the Vite development server |
| `frontend` | `npm run build` | Creates the production frontend build |
| `frontend` | `npm run lint` | Checks frontend source with Oxlint |

> Available commands depend on the project configuration. Update this table when scripts are added or removed.

## API

The backend listens on port `3000` by default.

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/health` | API health check |
| `GET` | `/api/items` | List items |
| `POST` | `/api/items` | Create an item |
| `PUT` | `/api/items/:id` | Update an item |
| `DELETE` | `/api/items/:id` | Delete an item |

Create and update requests require non-empty `title` and `description` strings. Item IDs must be positive integers.

## Configuration

Store environment-specific values in `backend/.env`. Do not commit sensitive values to source control.

Example:

```env
PORT=3000
```

The local SQLite database is `backend/app.db`. Database files are ignored by Git.

## Project Structure

```text
web_app/
├── backend/
│   ├── db.js
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── routes/item.routes.js
│   └── test/app.test.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── hooks/
│   └── vite.config.js
└── README.md
```

Adjust this structure to match the actual project.

## Development Guidelines

- Keep components and modules focused on a single responsibility.
- Reuse shared components and utilities.
- Validate user input and handle errors consistently.
- Never commit passwords, tokens, or private keys.
- Add tests for new functionality and bug fixes.
- Run linting, formatting, and tests before submitting changes.

## Testing and release checks

Run the backend tests:

```bash
cd backend
npm test
```

Build and lint the frontend:

```bash
cd frontend
npm run lint
npm run build
```

For deployment, build the frontend and deploy it separately from the Express API, or configure Express to serve `frontend/dist`. SQLite requires persistent disk storage in production; use a hosted database if the deployment platform has ephemeral storage.
