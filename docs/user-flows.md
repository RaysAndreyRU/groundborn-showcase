# Target User Flows

These flows describe the current product direction. Their individual steps are not all implemented yet.

## Team tournament registration

```mermaid
sequenceDiagram
    actor Captain
    participant App as User application
    participant API as Groundborn API
    participant Rules as Registration rules
    participant Operator as Tournament operator

    Captain->>App: Select tournament and roster
    App->>API: Submit application with idempotency key
    API->>Rules: Validate registration window, capacity and roster
    Rules-->>API: Eligible or violations
    API-->>App: Submitted / changes required
    Operator->>API: Approve or reject application
    API-->>App: Updated application status
```

## Tournament execution

```mermaid
flowchart LR
    Registration[Close registration] --> Eligible[Freeze eligible participants]
    Eligible --> Seed[Apply deterministic seeding]
    Seed --> Bracket[Generate bracket and matches]
    Bracket --> Schedule[Publish schedule]
    Schedule --> Result[Submit match result]
    Result --> Guard[Idempotency and concurrency guard]
    Guard --> Advance[Advance winner once]
    Advance --> Complete[Complete and archive tournament]
```

## Role boundaries

- guests receive read-only public views;
- players control their own identity and participation;
- captains act only within teams they are allowed to manage;
- tournament operators are scoped to assigned competitions;
- platform administrators require explicit permissions for moderation and configuration;
- critical actions should create immutable audit events.
