import { EntityDynamic } from '../EntityDynamic/EntityDynamic'
import { GhostMove, GhostSettings, GhostVariant } from './typings'
import { spriteCoordinates } from '../../services/View/spriteCoordinates'
import {
  ghostInitialSettings,
  GhostMode,
  GhostType,
  WavesPhaseMode,
} from './data'
import {
  Direction,
  EntityEvent,
  EntityPositions,
  OppositeDirection,
  type PosState,
  Rect,
} from '../Entity/typings'
import { Entity } from '../Entity/Entity'

export class Ghost extends EntityDynamic {
  width = 4
  height = 4
  animDelay = 80
  alwaysMove = true
  modeGhost: GhostMove = GhostMode.Chase
  /* Вероятность выбора случайного направления */
  probabilityOfModeChange = 10

  variant: GhostVariant = GhostType.Ghost1
  /** Сколько игрок будет неуязвимым после появления. */
  spawnShieldTimeout = 3000

  constructor(props: GhostSettings) {
    super({ posX: 0, posY: 0, type: 'ghost' })
    Object.assign(this, props)

    this.updateGhostSpecs()
    this.registerGhostEvents()
  }

  updateGhostSpecs(): void {
    if (spriteCoordinates['ghost.' + this.variant]) {
      this.mainSpriteCoordinates = spriteCoordinates['ghost.' + this.variant]
      this.refreshSprite()
    }
  }

  ghostPhaseChange(): void {
    const runPhase = (num: number): void => {
      if (WavesPhaseMode[num]) {
        this.setLoopDelay(() => {
          if (WavesPhaseMode[num]) {
            this.modeGhost = WavesPhaseMode[num].mode
            runPhase(num + 1)
          }
        }, WavesPhaseMode[num].time)
      }
    }
    if (WavesPhaseMode.length > 0) {
      runPhase(0)
    }
  }

  registerGhostEvents(): void {
    this.on(EntityEvent.Spawn, () => {
      if (spriteCoordinates['ghost.' + this.variant]) {
        this.startAnimation({
          name: this.variant,
          delay: this.animDelay,
          spriteCoordinates: spriteCoordinates['ghost.' + this.variant]['LEFT'],
          looped: true,
        })
      }
      this.ghostPhaseChange()
      this.move(Direction.Left)
    })
      .on(EntityEvent.Move, () => {
        if (spriteCoordinates['ghost.' + this.variant]) {
          this.cancelAnimation('showEntity', this.variant)
          this.startAnimation({
            name: this.variant,
            delay: this.animDelay,
            spriteCoordinates:
              spriteCoordinates['ghost.' + this.variant][this.nextDirection],
            looped: true,
          })
        }
      })
      .on(EntityEvent.Stop, () => {
        if (spriteCoordinates['ghost.' + this.variant]) {
          this.cancelAnimation('showEntity', this.variant)
        }
        const random = Math.floor(Math.random() * 4)
        this.move(Object.values(Direction)[random])
      })
  }

  isItPossibleToMove(): boolean {
    const ghostAtBase = { atBase: false }
    this.emit(EntityEvent.CheckGhostAtBase, ghostAtBase)
    const { atBase } = ghostAtBase

    const lastRect = this.getRect()
    const possibleMovementOptions: Array<{
      nextRect: Rect
      direction: Direction
    }> = []
    Object.values(Direction).forEach(direction => {
      if (direction !== OppositeDirection[this.direction]) {
        const nextRect = { ...lastRect, ...this.getNextMove(true, direction) }
        const posState: PosState = {
          hasCollision: undefined,
          nextRect,
        }
        this.emit(EntityEvent.CanMoveToNewPos, posState)
        if (!posState.hasCollision) {
          possibleMovementOptions.push({ nextRect, direction })
        }
      }
    })

    if (possibleMovementOptions.length > 0) {
      const entityPositions: EntityPositions = {
        type: 'pacman',
        positions: [],
      }
      this.emit(EntityEvent.GetPositionEntity, entityPositions)
      if (entityPositions.positions.length > 0) {
        let minDist: number | undefined
        let newDirection: Direction | undefined

        const modeGhost = this.modeGhost

        if (Math.random() <= this.probabilityOfModeChange / 100) {
          const index = Math.floor(
            Math.random() * possibleMovementOptions.length
          )
          newDirection = possibleMovementOptions[index].direction
        } else {
          possibleMovementOptions.forEach(moveGhost => {
            const ghostX = Math.floor(
              moveGhost.nextRect.posX + moveGhost.nextRect.width / 2
            )
            const ghostY = Math.floor(
              moveGhost.nextRect.posY + moveGhost.nextRect.height / 2
            )

            if (atBase) {
              const gatePosition: { rect: Rect | null } = { rect: null }
              this.emit(EntityEvent.GetGatePosition, gatePosition)
              const { rect } = gatePosition
              if (rect) {
                this.emit(EntityEvent.openGate)
                const ghostRect = this.getRect()
                if (
                  !(
                    rect.posX < ghostRect.posX + ghostRect.width &&
                    rect.posX + rect.width > ghostRect.posX &&
                    rect.posY < ghostRect.posY + ghostRect.height &&
                    rect.posY + rect.height > ghostRect.posY
                  )
                ) {
                  const cellX = Math.floor(rect.posX + rect.width / 2)
                  const cellY = Math.floor(rect.posY + rect.height / 2)
                  const dist = Math.sqrt(
                    Math.pow(ghostX - cellX, 2) + Math.pow(ghostY - cellY, 2)
                  )
                  if (!minDist || minDist > dist) {
                    newDirection = moveGhost.direction
                    minDist = dist
                  }
                }
              }
            } else if (modeGhost === GhostMode.Chase) {
              entityPositions.positions.forEach(posPac => {
                const pacX = Math.floor(posPac.posX + posPac.width / 2)
                const pacY = Math.floor(posPac.posY + posPac.height / 2)
                const dist = Math.sqrt(
                  Math.pow(ghostX - pacX, 2) + Math.pow(ghostY - pacY, 2)
                )
                if (!minDist || minDist > dist) {
                  newDirection = moveGhost.direction
                  minDist = dist
                }
              })
            } else if (modeGhost === GhostMode.Scatter) {
              const cell = ghostInitialSettings?.[this.variant]
              if (cell.posX && cell.posY) {
                const cellX = Math.floor(cell.posX + 2)
                const cellY = Math.floor(cell.posY + 2)
                const dist = Math.sqrt(
                  Math.pow(ghostX - cellX, 2) + Math.pow(ghostY - cellY, 2)
                )
                if (!minDist || minDist > dist) {
                  newDirection = moveGhost.direction
                  minDist = dist
                }
              }
            }
          })
        }

        if (newDirection && newDirection !== this.direction) {
          this.turn(newDirection)
        }
      }
    }
    return true
  }

  //Дополнительные действия, когда сущности в одной ячейке
  checkCellOccupancy(entities: Entity[]): boolean {
    entities.forEach(entity => {
      if (entity.type === 'pacman') {
        entity.emit(EntityEvent.PlayerCaught)
      }
    })
    return true
  }
}
