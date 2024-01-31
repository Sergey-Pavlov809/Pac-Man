export type EntityType =
  | 'pacman'
  | 'ghost'
  | 'wall'
  | 'food'
  | 'bonus'
  | 'custom'

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
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

export enum EntityEvent {
  Move = 'MOVE',
  Stop = 'STOP',
  Spawn = 'SPAWN',
  Despawn = 'DESPAWN',
  Ready = 'READY',
  Destroyed = 'DESTROYED',

  SetLoopDelay = 'SET_LOOP_DELAY',
  SetLoopInterval = 'SET_LOOP_INTERVAL',
  ClearLoopInterval = 'CLEAR_LOOP_INTERVAL',

  WillHaveNewPos = 'ENTITY_WILL_HAVE_NEW_POS',
  ShouldBeDestroyed = 'ENTITY_SHOULD_BE_DESTROYED',
  ShouldUpdate = 'ENTITY_SHOULD_UPDATE',
  DidUpdate = 'ENTITY_DID_UPDATE',
  ShouldRenderText = 'ENTITY_SHOULD_RENDER_TEXT',

  AnimationStarted = 'ANIMATION_STARTED',
  AnimationEnded = 'ANIMATION_ENDED',
}

export type EntitySettings = Pos &
  Partial<Size> &
  Partial<{
    direction: Direction
    type: EntityType
    color: string
  }>
