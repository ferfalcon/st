# Angular + Fastify Starter

This workspace contains an Angular frontend and a Fastify backend wired to talk to each other. The frontend fetches a greeting from the backend so you can quickly confirm both sides are running.

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm 9+ (ships with Node 18+)

## Project Structure

```
frontend/  # Angular application (ng serve on port 4200)
backend/   # Fastify API (listens on port 3000)
```

## Install Dependencies

Run the following once per workspace setup:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Development

Start the Fastify backend:

```bash
cd backend
npm run dev
```

Start the Angular dev server in a second terminal:

```bash
cd frontend
npm start
```

Open http://localhost:4200 and you should see the greeting fetched from http://localhost:3000/api/greetings.

## Configuration

- `backend`: set `PORT`, `HOST`, or `CORS_ORIGIN` (comma-separated list) environment variables if you need to change the defaults.
- `frontend`: override the API base URL by defining `NG_APP_API_BASE_URL` before running the dev server, e.g. `NG_APP_API_BASE_URL=https://example.com/api npm start`.

## Production Notes

For production builds:

```bash
cd frontend && npm run build
cd backend && npm start
```

Serve the Angular `frontend/dist/frontend/browser` directory using your preferred static host or behind the Fastify instance.
