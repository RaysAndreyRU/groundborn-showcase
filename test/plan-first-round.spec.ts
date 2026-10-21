import { describe, expect, it } from 'vitest'
import {
  InvalidBracketInput,
  planFirstRound
} from '../src/bracket-planner/application/plan-first-round.js'

describe('planFirstRound', () => {
  it('pairs two participants without a bye', () => {
    const plan = planFirstRound([
      { id: 'second', seed: 2 },
      { id: 'first', seed: 1 }
    ])

    expect(plan).toEqual({
      bracketSize: 2,
      byeCount: 0,
      matches: [
        {
          id: 'round-1-match-1',
          round: 1,
          position: 1,
          first: { id: 'first', seed: 1 },
          second: { id: 'second', seed: 2 },
          status: 'PENDING'
        }
      ]
    })
  })

  it('uses standard deterministic seed placement', () => {
    const participants = Array.from({ length: 8 }, (_, index) => ({
      id: `participant-${index + 1}`,
      seed: index + 1
    })).reverse()

    const plan = planFirstRound(participants)
    const pairs = plan.matches.map((match) => [match.first?.seed, match.second?.seed])

    expect(pairs).toEqual([
      [1, 8],
      [4, 5],
      [2, 7],
      [3, 6]
    ])
  })

  it('awards byes to the highest seeds when the field is incomplete', () => {
    const participants = Array.from({ length: 6 }, (_, index) => ({
      id: `participant-${index + 1}`,
      seed: index + 1
    }))

    const plan = planFirstRound(participants)
    const byeMatches = plan.matches.filter((match) => match.status === 'BYE')

    expect(plan.bracketSize).toBe(8)
    expect(plan.byeCount).toBe(2)
    expect(byeMatches.map((match) => match.automaticWinnerId)).toEqual([
      'participant-1',
      'participant-2'
    ])
  })

  it.each([
    [[]],
    [[{ id: 'only', seed: 1 }]],
    [[{ id: 'same', seed: 1 }, { id: 'same', seed: 2 }]],
    [[{ id: 'first', seed: 1 }, { id: 'third', seed: 3 }]],
    [[{ id: 'first', seed: 1 }, { id: 'duplicate', seed: 1 }]],
    [[{ id: 'first', seed: 1 }, { id: 'fraction', seed: 1.5 }]]
  ])('rejects invalid participant input', (participants) => {
    expect(() => planFirstRound(participants)).toThrow(InvalidBracketInput)
  })
})
