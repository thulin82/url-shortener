# [URL shortener](https://github.com/thulin82/url-shortener)

[![GitHub Actions](https://github.com/thulin82/url-shortener/actions/workflows/github-actions.yml/badge.svg)](https://github.com/thulin82/url-shortener/actions/workflows/github-actions.yml)

## Setup

### Get project

```
$ git clone git@github.com:thulin82/url-shortener.git
```

### Get dependencies

```
$ npm install
```

Copy `.env.example` to `.env` and adjust values as needed.

### Run app

```
$ npm run dev    # watch mode, TypeScript via tsx
$ npm run build  # compile to dist/
$ npm start      # run compiled app
```

### Test app

```
$ npm test        # run tests once (Vitest)
$ npm run test:watch
```

Tests mock Mongoose models directly — no real database connection is used.

### Project structure

```
src/
  config/       env config + db connection
  models/       Mongoose schemas
  services/     business logic
  controllers/  request/response handling
  routes/       express routers
  app.ts        express app wiring
  server.ts     entrypoint
tests/
  unit/         service-level tests
  integration/  supertest against the app
```

© Markus Thulin 2019-
