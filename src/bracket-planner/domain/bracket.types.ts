export type SeededParticipant = {
  id: string
  seed: number
}

export type BracketSlot = SeededParticipant | null

export type PlannedMatch = {
  id: string
  round: 1
  position: number
  first: BracketSlot
  second: BracketSlot
  status: 'PENDING' | 'BYE'
  automaticWinnerId?: string
}

export type FirstRoundPlan = {
  bracketSize: number
  byeCount: number
  matches: PlannedMatch[]
}
