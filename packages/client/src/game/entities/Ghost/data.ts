import { Color } from '../../services/View/colors'
import { type GhostSettings, WavesPhaseMove } from './typings'

export enum GhostType {
  Ghost1 = 'BLINKY',
  Ghost2 = 'PINKI',
  Ghost3 = 'INKY',
  Ghost4 = 'CLYDE',
}

export enum GhostMode {
  Chase = 'CHASE',
  Scatter = 'SCATTER',
  Frightened = 'FRIGHTENED',
  Eaten = 'EATEN',
}

export const ghostInitialSettings: Record<GhostType, GhostSettings> = {
  [GhostType.Ghost1]: {
    posX: 16,
    posY: 16,
    color: Color.Red,
    variant: GhostType.Ghost1,
  },
  [GhostType.Ghost2]: {
    posX: 56,
    posY: 16,
    color: Color.Pink,
    variant: GhostType.Ghost2,
  },
  [GhostType.Ghost3]: {
    posX: 16,
    posY: 108,
    color: Color.Blue,
    variant: GhostType.Ghost3,
  },
  [GhostType.Ghost4]: {
    posX: 56,
    posY: 108,
    color: Color.Orange,
    variant: GhostType.Ghost4,
  },
}

export const WavesPhaseMode: WavesPhaseMove = [
  { time: 0, mode: GhostMode.Scatter },
  { time: 7000, mode: GhostMode.Chase },
  { time: 20000, mode: GhostMode.Scatter },
  { time: 7000, mode: GhostMode.Chase },
  { time: 20000, mode: GhostMode.Scatter },
  { time: 5000, mode: GhostMode.Chase },
  { time: 20000, mode: GhostMode.Scatter },
  { time: 5000, mode: GhostMode.Chase },
]
