import type {
  TournamentStatus,
  TournamentTransition
} from '../domain/tournament-lifecycle.types.js'

const allowedTransitions: Record<TournamentStatus, readonly TournamentStatus[]> = {
  DRAFT: ['SCHEDULED', 'CANCELED'],
  SCHEDULED: ['REGISTRATION_OPEN', 'CANCELED'],
  REGISTRATION_OPEN: ['REGISTRATION_CLOSED', 'CANCELED'],
  REGISTRATION_CLOSED: ['CHECK_IN', 'IN_PROGRESS', 'CANCELED'],
  CHECK_IN: ['IN_PROGRESS', 'CANCELED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELED'],
  COMPLETED: ['ARCHIVED'],
  CANCELED: ['ARCHIVED'],
  ARCHIVED: []
}

export class InvalidTournamentTransition extends Error {
  constructor(from: TournamentStatus, to: TournamentStatus) {
    super(`Tournament cannot transition from ${from} to ${to}`)
    this.name = 'InvalidTournamentTransition'
  }
}

export function canTransitionTournament(
  from: TournamentStatus,
  to: TournamentStatus
): boolean {
  return allowedTransitions[from].includes(to)
}

export function transitionTournament(input: {
  tournamentId: string
  currentStatus: TournamentStatus
  nextStatus: TournamentStatus
  now: Date
}): TournamentTransition {
  if (!canTransitionTournament(input.currentStatus, input.nextStatus)) {
    throw new InvalidTournamentTransition(input.currentStatus, input.nextStatus)
  }

  return {
    tournamentId: input.tournamentId,
    from: input.currentStatus,
    to: input.nextStatus,
    occurredAt: new Date(input.now.getTime())
  }
}
