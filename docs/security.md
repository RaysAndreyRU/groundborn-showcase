# Security and Disclosure Notes

## Existing foundation represented here

- JWT access, refresh, and temporary-token infrastructure;
- Redis-backed session-oriented components;
- JWT, API-key, validation, permission, and IP-related guards;
- role-aware frontend route checks;
- runtime DTO and Zod validation boundaries;
- private and public file-service concepts;
- global exception normalization and structured logging.

## Important limitations

- fine-grained tournament authorization is not yet complete;
- frontend route visibility is not a replacement for backend authorization;
- the main client currently contains browser token storage and requires further hardening before sensitive production use;
- the esports Prisma model and its ownership constraints are still in development;
- formal penetration testing, compliance, and production threat modeling are not claimed.

## Disclosure boundary

This public repository contains no private environment files, credentials, provider tokens, database schema, migration history, production endpoints, user data, or copied source modules. The executable prototypes use synthetic identifiers and framework-independent code.
