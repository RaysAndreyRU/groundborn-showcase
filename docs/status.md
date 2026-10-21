# Current Engineering Status

This status is based on a focused review of the four Groundborn repositories. It separates code that exists today from product requirements and future direction.

## Implemented foundation

- separate user, admin, backend, and documentation repositories;
- Next.js and Vite application shells;
- FSD-oriented directories and public module APIs;
- route definitions, lazy loading, layouts, providers, themes, and shared UI;
- authentication screens and client-side recovery infrastructure;
- deterministic MSW configuration and seeded mock state;
- Zod response boundaries and Orval generation configuration;
- Sentry instrumentation, web-vitals hooks, Pino configuration, and health endpoints;
- NestJS infrastructure modules for JWT, Redis, Swagger, files, email, SMS, and common request behavior;
- backend test scaffolds for module wiring, Swagger groups, shared repository behavior, and placeholder resources;
- CI workflows for frontend lint/typecheck/build and backend test/build.

## In active development

- admin dashboard, notification, payment, and log experiences;
- role-oriented route access and authentication flows;
- migration of generic mock material to Groundborn-specific contracts;
- domain UI composition for users, tournaments, teams, players, registrations, matches, and brackets;
- alignment between product documentation and executable API contracts.

## Scaffold only

- public and admin tournament REST controllers;
- teams, players, registrations, matches, brackets, and schedules backend modules;
- matching repositories and services;
- their unit suites currently verify structural CRUD scaffolding rather than business behavior.

## Planned

- Prisma models and migrations for the esports domain;
- tournament lifecycle enforcement;
- registration capacity and moderation rules;
- team roster invariants;
- bracket generation and match progression;
- scheduling conflict protection;
- idempotent result submission;
- payment and prize-pool workflows;
- ratings, sanctions, appeals, support, and audit history;
- end-to-end integration with mocks disabled.

## Evidence policy

Case studies use one of three maturity labels:

- **implemented foundation** — directly present in code;
- **partially implemented** — working boundary with incomplete domain integration;
- **design / planned** — documented direction or executable prototype, not deployed product behavior.
