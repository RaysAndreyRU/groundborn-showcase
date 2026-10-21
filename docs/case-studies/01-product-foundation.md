# Case Study: Product Foundation Before Domain Completion

**Maturity:** implemented foundation with incomplete product behavior.

## Situation

Groundborn needs a public application, an operator interface, an API, documentation, observability, and delivery automation. Building tournament screens before these boundaries exist would create expensive rewrites when authentication and contracts arrive.

## Implemented foundation

- separate repositories for user app, admin, backend, and documentation;
- shared FSD-oriented frontend conventions;
- routing, layouts, providers, themes, i18n, and design primitives;
- OpenAPI generation configuration and runtime validation;
- deterministic mock infrastructure;
- backend configuration, Swagger, logging, health, authentication, messaging, and files;
- CI build gates and conventional Git hooks.

## Deliberate limitation

Infrastructure readiness is not product readiness. Domain pages can exist as route entries while still showing an in-development state. Backend modules can compile and appear in Swagger while their services and persistence remain incomplete.

## Engineering signal

The project makes horizontal capabilities reusable before vertical business flows multiply, while the showcase preserves an explicit boundary between a working shell and finished tournament behavior.
