# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing a Medusa v2 e-commerce backend and a Nuxt 4 frontend, designed to work together as a headless e-commerce solution.

**Repository Structure:**
- `backend-medusa/` - Medusa v2 commerce backend (v2.11.1)
- `frontend-nuxt/` - Nuxt 4 storefront (v4.2.0, minimal setup)

## Backend (Medusa v2.11.1)

### Development Commands

**Start development server:**
```bash
cd backend-medusa
npm run dev
```

**Build for production:**
```bash
cd backend-medusa
npm run build
```

**Start production server:**
```bash
cd backend-medusa
npm start
```

**Seed demo data:**
```bash
cd backend-medusa
npm run seed
```

**Run tests:**
```bash
# Unit tests
npm run test:unit

# Integration tests (HTTP)
npm run test:integration:http

# Integration tests (modules)
npm run test:integration:modules
```

**Database migrations:**
```bash
# Generate migrations for a module
npx medusa db:generate <module-name>

# Run migrations
npx medusa db:migrate
```

### Architecture

Medusa v2 follows a modular architecture with file-based conventions:

**API Routes** (`src/api/`):
- File-based routing with `route.ts` files
- Separate routes for store (`src/api/store/`) and admin (`src/api/admin/`)
- Dynamic parameters using `[param]` directory naming
- Access services via `req.scope.resolve("serviceName")`
- Middleware defined in `src/api/middlewares.ts`

**Modules** (`src/modules/`):
- Self-contained business logic units
- Each module contains: data models (`models/`), service (`service.ts`), and module definition (`index.ts`)
- Register modules in `medusa-config.ts`
- Access via dependency injection: `req.scope.resolve(MODULE_NAME)`

**Workflows** (`src/workflows/`):
- Multi-step transaction-safe operations
- Created with `createWorkflow()` and `createStep()`
- Execute from API routes, jobs, or subscribers
- Use `workflow(req.scope).run({ input })` to execute

**Subscribers** (`src/subscribers/`):
- Event-driven handlers for Medusa events

**Jobs** (`src/jobs/`):
- Scheduled background tasks

**Links** (`src/links/`):
- Define relationships between modules

### Configuration

**Environment variables** (`.env`):
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `STORE_CORS` - Allowed origins for storefront
- `ADMIN_CORS` - Allowed origins for admin
- `JWT_SECRET` / `COOKIE_SECRET` - Security secrets

**Configuration** (`medusa-config.ts`):
- Database configuration with SSL support
- CORS settings for store, admin, and auth endpoints
- Module registrations

### Docker Setup

The backend includes a `docker-compose.yml` that runs:
- Medusa backend (port 9000)
- PostgreSQL database (port 5432)
- Redis (port 6379)

**Start with Docker:**
```bash
cd backend-medusa
docker-compose up
```

### Key Dependencies

- `@medusajs/framework` v2.11.1 - Core Medusa framework
- `@medusajs/medusa` v2.11.1 - Medusa core
- `@medusajs/admin-sdk` v2.11.1 - Admin dashboard SDK
- `@mikro-orm/*` v6.4.3 - ORM for database access
- PostgreSQL via `pg` package
- Redis for caching and job queues

## Frontend (Nuxt 4.2.0)

### Development Commands

**Start development server:**
```bash
cd frontend-nuxt
npm run dev
```

**Build for production:**
```bash
cd frontend-nuxt
npm run build
```

**Start production server:**
```bash
cd frontend-nuxt
npm start
```

**Generate static site:**
```bash
cd frontend-nuxt
npm run generate
```

### Configuration

**Runtime config** (`nuxt.config.ts`):
- `runtimeConfig.public.medusaUrl` - Backend API URL (default: http://localhost:9000)
- Set via `MEDUSA_URL` environment variable

**Key Dependencies:**
- `nuxt` v4.2.0 - Nuxt framework
- `@medusajs/medusa-js` v6.1.10 - Medusa JS SDK for API integration

### Current State

The frontend is minimally configured with:
- Basic Nuxt 4 setup with devtools enabled
- Medusa JS SDK integration ready
- No pages, components, or composables yet (starter template)

### Nuxt 4 Considerations

Since this project uses Nuxt 4, be aware of these changes when building out the frontend:
- **New folder structure**: Client code can optionally go in an `app/` folder (but root-level is still supported)
- **Data fetching**: `useAsyncData` and `useFetch` have improved caching and will cache data for other pre-rendered pages
- For migration from existing Nuxt 3 code, refer to: https://nuxt.com/docs/getting-started/upgrade

## Working Across Backend and Frontend

1. **Backend runs on port 9000** - API and admin endpoints
2. **Frontend connects via Medusa JS SDK** - configured through `MEDUSA_URL`
3. **CORS must be configured** - ensure frontend URL is in backend's `STORE_CORS`

## Common Development Workflow

1. Start backend services (PostgreSQL, Redis) via Docker Compose
2. Seed backend with demo data: `cd backend-medusa && npm run seed`
3. Start backend dev server: `cd backend-medusa && npm run dev`
4. Start frontend dev server: `cd frontend-nuxt && npm run dev`
5. Access Medusa Admin at http://localhost:9000/app
6. Frontend will be at http://localhost:3000 (Nuxt default)

## Node Version

Requires Node.js >= 20 (as specified in backend-medusa/package.json)
