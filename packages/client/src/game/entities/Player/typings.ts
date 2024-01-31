import { type EntityDynamicSettings } from '../EntityDynamic/typings'

export type PlayerVariant = 'PLAYER1' | 'PLAYER2'

export type PlayerSettings = {
  variant: PlayerVariant
  flashing?: boolean
} & Partial<EntityDynamicSettings>

export type PlayerState = {
  lives: number
}
