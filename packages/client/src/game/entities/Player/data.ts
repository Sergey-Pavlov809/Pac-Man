import { Color } from '../../services/View/colors'
import { type PlayerSettings } from './typings'

export enum PlayerType {
  Player1 = 'PLAYER1',
  Player2 = 'PLAYER2',
}

export const playerInitialSettings: Record<PlayerType, PlayerSettings> = {
  [PlayerType.Player1]: {
    posX: 52,
    posY: 92,
    color: Color.Yellow,
    variant: 'PLAYER1',
  },
  [PlayerType.Player2]: {
    posX: 56,
    posY: 92,
    color: Color.Lime,
    variant: 'PLAYER2',
  },
}
