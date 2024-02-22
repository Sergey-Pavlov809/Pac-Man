import { type EntityDynamicSettings } from '../EntityDynamic/typings'

export type GhostVariant = 'BLINKY' | 'PINKI' | 'INKY' | 'CLYDE'
export type GhostMove = 'CHASE' | 'SCATTER' | 'FRIGHTENED' | 'EATEN'

export type PhaseMove = {
  mode: GhostMove
  time: number
}

export type WavesPhaseMove = Array<PhaseMove>

export type GhostSettings = {
  variant: GhostVariant
  flashing?: boolean
} & Partial<EntityDynamicSettings>

export type GhostState = {
  lives: number
}
