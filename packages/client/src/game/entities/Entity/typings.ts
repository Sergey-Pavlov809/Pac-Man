import { type PlayerVariant } from '../Player/typings'
import { type GhostVariant } from '../Ghost/typings'
import { type TerrainVariant } from '../Terrain/typings'
import { Color } from 'antd/es/color-picker'
import { ScoreVariant } from '../Score/typings'
import { LifeVariant } from '../Life/typings'
import { FoodVariant } from '../Food/typings'

export type EntityType =
  | 'pacman'
  | 'ghost'
  | 'wall'
  | 'food'
  | 'life'
  | 'score'
  | 'custom'

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export const OppositeDirection = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
}

export type Pos = {
  posX: number
  posY: number
}

export type Size = {
  width: number
  height: number
}

export type Rect = Pos & Size

export type PosState = { hasCollision: boolean | undefined; nextRect: Rect }

export type EntityPositions = {
  type: EntityType
  positions: Rect[]
}

export enum EntityEvent {
  Move = 'MOVE',
  Stop = 'STOP',
  Turn = 'TURN',
  Spawn = 'SPAWN',
  Despawn = 'DESPAWN',
  Ready = 'READY',
  Destroyed = 'DESTROYED',

  SetLoopDelay = 'SET_LOOP_DELAY',
  DeleteLoopDelay = 'DELETE_LOOP_DELAY',
  SetLoopInterval = 'SET_LOOP_INTERVAL',
  ClearLoopInterval = 'CLEAR_LOOP_INTERVAL',

  WillHaveNewPos = 'ENTITY_WILL_HAVE_NEW_POS',
  ShouldBeDestroyed = 'ENTITY_SHOULD_BE_DESTROYED',
  IsBeyondMatrix = 'ENTITY_IS_BEYUND_MATRIX',
  ShouldUpdate = 'ENTITY_SHOULD_UPDATE',
  DidUpdate = 'ENTITY_DID_UPDATE',
  GetPositionEntity = 'ENTITY_GET_POSITION',
  CanMoveToNewPos = 'ENTITY_CAN_MOVE_TO_NEW_POS',
  CheckExitAbroad = 'ENTITY_CHECK_EXIT_ABROAD',
  CheckOccupiedCell = 'ENTITY_CHECK_OCCUPIED_CELL',
  PlayerCaught = 'ENTITY_PLAYER_CAUTCH',
  PlayerAteFood = 'PLAYER_ATE_FOOD',
  GhostIsFrightened = 'ENTITY_GOST_IS_FRIGHTENED',
  CheckGhostAtBase = 'ENTITY_CHECK_GHOST_AT_BASE',
  GetGatePosition = 'ENTITY_GET_GATE_POSITION',
  PlayerAteGhost = 'ENTITY_PLAYER_ATE_GHOST',
  openGate = 'ENTITY_OPEN_GATE',
  ShouldRenderText = 'ENTITY_SHOULD_RENDER_TEXT',

  AnimationStarted = 'ANIMATION_STARTED',
  AnimationEnded = 'ANIMATION_ENDED',
}

export type Tile = number

export type EntityVariant =
  | PlayerVariant
  | GhostVariant
  | TerrainVariant
  | FoodVariant
  | LifeVariant
  | ScoreVariant

export type EntitySettings = Pos &
  Partial<Size> &
  Partial<{
    direction: Direction
    type: EntityType
    color: Color | string
    tile: Tile
    variant?: EntityVariant
  }>
