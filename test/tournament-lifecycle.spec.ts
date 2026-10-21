import { describe, expect, it } from 'vitest'
import {
  InvalidTournamentTransition,
  canTransitionTournament,
  transitionTournament
} from '../src/tournament-lifecycle/application/transition-tournament.js'
import type { TournamentStatus } from '../src/tournament-lifecycle/domain/tournament-lifecycle.types.js'

describe('tournament lifecycle', () => {
  it.each([
    ['DRAFT', 'SCHEDULED'],
    ['SCHEDULED', 'REGISTRATION_OPEN'],
    ['REGISTRATION_OPEN', 'REGISTRATION_CLOSED'],
    ['REGISTRATION_CLOSED', 'CHECK_IN'],
    ['REGISTRATION_CLOSED', 'IN_PROGRESS'],
    ['CHECK_IN', 'IN_PROGRESS'],
    ['IN_PROGRESS', 'COMPLETED'],
    ['COMPLETED', 'ARCHIVED'],
    ['CANCELED', 'ARCHIVED']
  ] satisfies Array<[TournamentStatus, TournamentStatus]>) (
    'allows %s → %s',
    (from, to) => {
      expect(canTransitionTournament(from, to)).toBe(true)
    }
  )

  it.each([
    ['DRAFT', 'COMPLETED'],
    ['REGISTRATION_OPEN', 'IN_PROGRESS'],
    ['COMPLETED', 'IN_PROGRESS'],
    ['ARCHIVED', 'DRAFT']
  ] satisfies Array<[TournamentStatus, TournamentStatus]>) (
    'rejects %s → %s',
    (from, to) => {
      expect(canTransitionTournament(from, to)).toBe(false)
    }
  )

  it('returns an auditable transition without mutating the supplied timestamp', () => {
    const now = new Date('2026-10-22T12:00:00.000Z')

    const event = transitionTournament({
      tournamentId: 'tournament-7',
      currentStatus: 'IN_PROGRESS',
      nextStatus: 'COMPLETED',
      now
    })

    expect(event).toEqual({
      tournamentId: 'tournament-7',
      from: 'IN_PROGRESS',
      to: 'COMPLETED',
      occurredAt: now
    })
    expect(event.occurredAt).not.toBe(now)
  })

  it('throws a domain-specific error for an invalid transition', () => {
    expect(() =>
      transitionTournament({
        tournamentId: 'tournament-7',
        currentStatus: 'DRAFT',
        nextStatus: 'COMPLETED',
        now: new Date()
      })
    ).toThrow(InvalidTournamentTransition)
  })
})
