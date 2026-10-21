import type {
  FirstRoundPlan,
  PlannedMatch,
  SeededParticipant
} from '../domain/bracket.types.js'

export class InvalidBracketInput extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidBracketInput'
  }
}

export function planFirstRound(participants: SeededParticipant[]): FirstRoundPlan {
  validateParticipants(participants)

  const ordered = [...participants].sort((left, right) => left.seed - right.seed)
  const bracketSize = nextPowerOfTwo(ordered.length)
  const participantBySeed = new Map(ordered.map((participant) => [participant.seed, participant]))
  const slots = buildSeedOrder(bracketSize).map((seed) => participantBySeed.get(seed) ?? null)
  const matches: PlannedMatch[] = []

  for (let index = 0; index < slots.length; index += 2) {
    const first = slots[index] ?? null
    const second = slots[index + 1] ?? null
    const automaticWinner = first ?? second
    const isBye = first === null || second === null

    matches.push({
      id: `round-1-match-${index / 2 + 1}`,
      round: 1,
      position: index / 2 + 1,
      first,
      second,
      status: isBye ? 'BYE' : 'PENDING',
      ...(isBye && automaticWinner ? { automaticWinnerId: automaticWinner.id } : {})
    })
  }

  return {
    bracketSize,
    byeCount: bracketSize - ordered.length,
    matches
  }
}

function validateParticipants(participants: SeededParticipant[]): void {
  if (participants.length < 2) {
    throw new InvalidBracketInput('At least two participants are required')
  }

  const ids = new Set(participants.map((participant) => participant.id))
  if (ids.size !== participants.length) {
    throw new InvalidBracketInput('Participant identifiers must be unique')
  }

  const seeds = participants.map((participant) => participant.seed).sort((a, b) => a - b)
  if (seeds.some((seed, index) => !Number.isInteger(seed) || seed !== index + 1)) {
    throw new InvalidBracketInput('Seeds must be unique contiguous integers starting at 1')
  }
}

function nextPowerOfTwo(value: number): number {
  return 2 ** Math.ceil(Math.log2(value))
}

function buildSeedOrder(size: number): number[] {
  let order = [1, 2]

  while (order.length < size) {
    const nextSize = order.length * 2
    order = order.flatMap((seed) => [seed, nextSize + 1 - seed])
  }

  return order
}
