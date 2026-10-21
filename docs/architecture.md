# Architecture Overview

## Runtime surfaces

```mermaid
flowchart TB
    subgraph Clients
        App[Next.js user application]
        Admin[React + Vite admin application]
    end

    subgraph BackendFoundation[Backend foundation]
        API[NestJS HTTP API]
        Auth[JWT and Redis session infrastructure]
        Swagger[OpenAPI / Swagger]
        Health[Health checks]
        Messaging[Email and SMS adapters]
        Files[S3-compatible file service]
    end

    App --> API
    Admin --> API
    API --> Auth
    API --> Swagger
    API --> Health
    API --> Messaging
    API --> Files
    API -. domain persistence in development .-> DB[(PostgreSQL / Prisma)]
```

The solid connections represent infrastructure already present in the private repositories. The dotted persistence connection marks the intended boundary whose tournament data model is still under development.

## Frontend boundaries

Both frontend repositories use the same directional vocabulary:

```text
app → pages → widgets → features → entities → shared
```

- `app` composes providers, routing, layouts, and initialization;
- `pages` provide thin route entry points;
- `widgets` assemble page-scale interface blocks;
- `features` model user actions and scenarios;
- `entities` own domain schemas, API access, and reusable domain UI;
- `shared` contains cross-domain infrastructure and design primitives.

The user application uses Next.js Pages Router, SSR helpers, middleware, SEO generation, and Sentry instrumentation. The admin application uses React Router lazy routes, a Vite runtime, operational layouts, and selected dashboard, notification, payment, and log views.

## Backend request shape

```mermaid
flowchart LR
    Request --> Global[Global validation, response and error boundaries]
    Global --> Guard[JWT / API key / permission guards]
    Guard --> Controller
    Controller --> Service[Domain service]
    Service --> Repository
    Repository -. schema WIP .-> Prisma
    Prisma -.-> DB[(PostgreSQL)]
```

The controller/service/repository modules exist for users, tournaments, teams, players, registrations, matches, brackets, and schedules, including parallel admin surfaces. At the current stage, these modules are structural scaffolds: most controllers return `IN DEVELOPMENT`, services are empty, and repositories point at not-yet-defined Prisma models.

## Contract migration path

```mermaid
flowchart LR
    Screen --> Query[React Query]
    Query --> EntityAPI[Entity API boundary]
    EntityAPI --> Schema[Zod runtime schema]
    MSW[Seeded MSW handler] --> EntityAPI
    OpenAPI[Orval-generated client] --> EntityAPI
    Backend[NestJS endpoint] --> OpenAPI
```

The intended migration path keeps screen composition stable while replacing deterministic mock adapters with generated API clients as backend contracts become real.
