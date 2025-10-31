
## Run the app locally

1) Install dependencies
```
npm install
```

2) (Optional but recommended) Configure local env vars for the Worker

Create a `.dev.vars` file at the project root (you can copy `.dev.vars.example`) and set:

```
MOCHA_USERS_SERVICE_API_URL=...
MOCHA_USERS_SERVICE_API_KEY=...
```

Without these, the UI will run, but auth-related API calls (login, user info) will return Unauthorized in dev.

3) Start the dev server
```
npm run dev
```

This starts Vite on http://localhost:5173 and runs the Cloudflare Worker endpoints alongside it via the Cloudflare Vite plugin.
