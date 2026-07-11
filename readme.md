# Zynk

A URL shortener built with Express 5 and TypeScript, backed by MongoDB. Accounts are required — every link is owned by a user and every redirect requires an authenticated session.

## Features

- **Accounts** — register/login, passwords hashed with bcrypt, session via a JWT stored in an httpOnly `authtoken` cookie.
- **Short links** — create, list, and delete links tied to your account. Short codes are base62-encoded from a random 9–10 digit numeric ID (collisions retried on insert).
- **Expiring links** — every link expires automatically via a MongoDB TTL index. Pass `expireAt` (seconds from now) when creating a link, otherwise it defaults to 5 minutes.
- **Static dashboard** — plain HTML/CSS/JS frontend under `/public`, served at `/static`.

## Tech stack

| Layer      | Choice                            |
|------------|-------------------------------------|
| Runtime    | Node.js (ES modules)                |
| Framework  | Express 5                           |
| Language   | TypeScript                          |
| Database   | MongoDB via Mongoose                |
| Auth       | JWT (`jsonwebtoken`) + `bcrypt` + `cookie-parser` |
| Frontend   | Static HTML/CSS/vanilla JS          |

## Project structure

```
src/
├── app.ts                          # Entry point, middleware/route wiring
├── controllers/
│   ├── apiControllers.ts           # GET/POST/DELETE for short links
│   ├── authenticationController.ts # register, login, logout, session check
│   └── redirectControllers.ts      # resolves short code -> redirect
├── db/
│   ├── db.ts                       # Mongo connection + graceful shutdown
│   ├── table.model.ts              # Link schema (URL, owner, expireAt + TTL index)
│   └── user.model.ts               # User schema
├── middlewares/
│   ├── cors.ts                     # origin allow-list from ALLOWED_ORIGINS
│   ├── errorHandler.ts             # catches errors, returns uniform 400 JSON
│   ├── json.ts                     # manual application/json body parser
│   ├── logger.ts                   # request logging (method, url, ip, time)
│   ├── ratelimiter.ts              # per-IP request counter
│   └── urlencoded.ts               # manual x-www-form-urlencoded body parser
├── routes/
│   ├── api.ts                      # /api
│   ├── authentication.ts           # /api/register, /api/login, /api/logout
│   └── redirect.ts                 # /api/redirect/:string
└── utils/
    ├── apiResponse.ts              # uniform JSON response shape
    ├── asyncWrapper.ts             # wraps async handlers -> next(err)
    ├── encoding.ts                 # base62 encode/decode for short IDs
    ├── jwtVerify.ts                # JWT verification helper
    └── payloadType.ts              # JWT payload type

public/
├── index.html / login.html / dashboard.html
├── css/index.css
└── js/main.js
```

## API

| Method | Route                     | Auth required | Description                          |
|--------|----------------------------|:--:|---------------------------------------|
| POST   | `/api/register`            | No  | Create a user account                 |
| POST   | `/api/login`                | No  | Log in, sets `authtoken` cookie       |
| GET    | `/api/login`                 | No  | Check current session status          |
| GET    | `/api/logout`               | Yes | Clear the session cookie              |
| GET    | `/api`                      | Yes | List the current user's short links   |
| POST   | `/api`                      | Yes | Create a new short link               |
| DELETE | `/api`                      | Yes | Delete a link by URL                  |
| GET    | `/api/redirect/:string`     | Yes | Resolve a short code and redirect     |

Auth is via an httpOnly `authtoken` cookie containing a signed JWT (username, type, and password hash), set on login and checked on protected routes via `jwtVerify`.

## Setup

**Requirements:** Node.js, a MongoDB instance (local or Atlas).

```bash
git clone https://github.com/a4x7/Zynk.git
cd Zynk
npm install
cp .env_example .env   # then fill in the values below
npm run dev             # tsc --watch + node --watch on dist/app.js
```

### Environment variables

| Variable            | Description                                      |
|----------------------|---------------------------------------------------|
| `PORT`               | Port for the Express server                       |
| `ALLOWED_ORIGINS`    | Comma-separated CORS allow-list                    |
| `MONGO_URI`          | MongoDB connection string                          |
| `JWT_KEY`            | Secret for signing/verifying JWTs                  |
| `SECRET_KEY`         | Reserved (currently unused now that bcrypt handles hashing) |
| `RATE_LIMIT_COUNT`   | Requests allowed per 20s window, per IP            |
| `LOGIN_TIMEOUT`      | Session/JWT lifetime, in minutes                   |

`npm run build` compiles TypeScript to `dist/`.

## Known gaps

- `redirectGet` requires a valid `authtoken` cookie to resolve a short link. That means links aren't actually shareable with logged-out users — worth deciding whether that's intended.
- Both `jwtVerify.ts` and `authenticationController.ts` fall back to a hardcoded JWT secret if `JWT_KEY` is unset — fine for local dev, should be enforced (fail fast) in any deployed environment.
- No tests yet (`npm test` is a placeholder).

## License

MIT
