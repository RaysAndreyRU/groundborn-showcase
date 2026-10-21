# ADR 001: Keep an Explicit Work-in-progress Evidence Boundary

## Status

Accepted.

## Context

Groundborn has a substantial technical foundation and detailed product requirements, but its tournament persistence and business services are incomplete. A portfolio repository could easily blur implemented code and intended behavior.

## Decision

Every case study and capability is classified as implemented foundation, partially implemented, scaffold, or design/planned. Public prototypes are labeled as executable design work rather than production extracts.

## Consequences

- reviewers can distinguish evidence from roadmap;
- the showcase remains useful before the product is complete;
- documentation needs periodic status updates as private modules mature;
- future production case studies can replace prototypes without rewriting the entire narrative.
