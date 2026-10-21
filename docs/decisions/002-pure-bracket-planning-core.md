# ADR 002: Keep Bracket Planning Pure

## Status

Accepted for the public design prototype.

## Context

Bracket planning requires deterministic seed placement, BYEs, and stable match positions. Mixing this calculation with persistence, notifications, or controllers makes edge cases difficult to test and retries dangerous.

## Decision

The planner accepts validated seeded participants and returns an immutable first-round plan. It does not write to a database or publish side effects. Persistence and match creation belong to a later transactional application service.

## Consequences

- identical inputs produce identical plans;
- algorithm tests need no database or framework;
- retries are safe before persistence;
- tournament-format expansion requires explicit new planners rather than flags hidden inside one large service.
