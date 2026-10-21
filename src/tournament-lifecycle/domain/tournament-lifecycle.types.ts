export const tournamentStatuses = [
  'DRAFT',
  'SCHEDULED',
  'REGISTRATION_OPEN',
  'REGISTRATION_CLOSED',
  'CHECK_IN',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELED',
  'ARCHIVED'
] as const

export type TournamentStatus = (typeof tournamentStatuses)[number]

export type TournamentTransition = {
  tournamentId: string
  from: TournamentStatus
  to: TournamentStatus
  occurredAt: Date
}
