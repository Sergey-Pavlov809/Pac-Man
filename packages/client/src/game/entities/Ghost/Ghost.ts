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
import { Player } from '../Player/Player'

export class Ghost extends EntityDynamic {
  width = 4
  height = 4
  animDelay = 80
  alwaysMove = true
  modeGhost: GhostMove = GhostMode.Chase
  /* Вероятность выбора случайного направления */
  probabilityOfModeChange = 10
  /* Время испуга */
  scareTime = 5000
  endScareTime = 3000

  timerId = ''

  variant: GhostVariant = GhostType.Ghost1
  frightened = false
  eaten = false

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

  startle(): void {
    if (!this.eaten) {
      this.frightened = true
      this.modeGhost = GhostMode.Frightened
      this.frightAnimation()

      if (this.timerId) this.deleteLoopDelay(this.timerId)
      this.timerId = this.setLoopDelay(() => {
        this.endFrightAnimation()

        this.timerId = this.setLoopDelay(() => {
          this.timerId = ''
          this.frightened = false
          this.modeGhost = GhostMode.Chase
          this.motionAnimation(this.nextDirection)
        }, this.endScareTime)
      }, this.scareTime)
    }
  }

  ate(): void {
    if (this.timerId) {
      this.deleteLoopDelay(this.timerId)
    }
    this.stopAnimation()

    this.eaten = true
    this.frightened = false
    this.moveSpeed += 4
    this.modeGhost = GhostMode.Eaten

    this.eatenAnimation(this.nextDirection)
  }

  normal(): void {
    this.stopAnimation()

    this.eaten = false
    this.frightened = false
    this.moveSpeed -= 4
    this.modeGhost = GhostMode.Chase

    this.motionAnimation(this.nextDirection)
  }

  ghostPhaseChange(): void {
    const runPhase = (num: number): void => {
      if (WavesPhaseMode[num]) {
        this.setLoopDelay(() => {
          if (WavesPhaseMode[num]) {
            this.modeGhost = !this.frightened
              ? WavesPhaseMode[num].mode
              : WavesPhaseMode[num].mode === GhostMode.Chase
              ? GhostMode.Frightened
              : WavesPhaseMode[num].mode
            runPhase(num + 1)
          }
        }, WavesPhaseMode[num].time)
      }
    }
    if (WavesPhaseMode.length > 0) {
      runPhase(0)
    }
  }

  stopAnimation(): void {
    if (spriteCoordinates['ghost.' + this.variant]) {
      if (this.mainSpriteFrame === 0) this.mainSpriteFrame++
      this.cancelAnimation('showEntity', this.variant)
    }
  }

  motionAnimation(direction: Direction): void {
    this.stopAnimation()

    if (spriteCoordinates['ghost.' + this.variant]) {
      this.startAnimation({
        name: this.variant,
        delay: this.animDelay,
        spriteCoordinates:
          spriteCoordinates['ghost.' + this.variant][direction],
        looped: true,
      })
    }
  }

  frightAnimation(): void {
    this.stopAnimation()

    if (spriteCoordinates['ghost.fright']) {
      this.startAnimation({
        name: this.variant,
        delay: this.animDelay,
        spriteCoordinates: spriteCoordinates['ghost.fright'],
        looped: true,
      })
    }
  }

  endFrightAnimation(): void {
    this.stopAnimation()

    if (spriteCoordinates['ghost.fright.end']) {
      this.startAnimation({
        name: this.variant,
        delay: this.animDelay,
        spriteCoordinates: spriteCoordinates['ghost.fright.end'],
        looped: true,
      })
    }
  }

  eatenAnimation(direction: Direction): void {
    this.stopAnimation()

    if (spriteCoordinates['ghost.eaten']) {
      this.startAnimation({
        name: this.variant,
        delay: this.animDelay,
        spriteCoordinates: spriteCoordinates['ghost.eaten'][direction],
        looped: true,
      })
    }
  }

  registerGhostEvents(): void {
    this.on(EntityEvent.Spawn, () => {
      if (this.eaten) {
        this.eatenAnimation(Direction.Left)
      } else if (!this.frightened) {
        this.motionAnimation(Direction.Left)
      }
      this.ghostPhaseChange()
      this.move(Direction.Left)
    })
      .on(EntityEvent.Move, () => {
        if (this.eaten) {
          this.eatenAnimation(this.nextDirection)
        } else if (!this.frightened) {
          this.motionAnimation(this.nextDirection)
        }
      })
      .on(EntityEvent.Stop, () => {
        if (!this.frightened && !this.eaten) {
          this.stopAnimation()
        }
        const random = Math.floor(Math.random() * 4)
        this.move(Object.values(Direction)[random])
      })
  }

  getPossibleMovementOptions(): Array<{
    nextRect: Rect
    direction: Direction
  }> {
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

    return possibleMovementOptions
  }

  ghostBehavior(): void {
    const ghostAtBase = { atBase: false }
    this.emit(EntityEvent.CheckGhostAtBase, ghostAtBase)
    const { atBase } = ghostAtBase

    const possibleMovementOptions = this.getPossibleMovementOptions()

    let newDirection: Direction | undefined
    if (possibleMovementOptions.length > 1) {
      const entityPositions: EntityPositions = {
        type: 'pacman',
        positions: [],
      }
      this.emit(EntityEvent.GetPositionEntity, entityPositions)
      if (entityPositions.positions.length > 0) {
        let minDist: number | undefined

        const modeGhost = this.modeGhost

        if (
          !atBase &&
          !this.eaten &&
          Math.random() <= this.probabilityOfModeChange / 100
        ) {
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

            if (this.eaten) {
              if (this.spawnPos) {
                const cellX = this.spawnPos.posX
                const cellY = this.spawnPos.posY
                //console.log({ cellX, cellY })
                const dist = Math.sqrt(
                  Math.pow(ghostX - cellX, 2) + Math.pow(ghostY - cellY, 2)
                )

                if (!minDist || minDist > dist) {
                  newDirection = moveGhost.direction
                  minDist = dist
                }
              }
            } else if (atBase) {
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
            } else if (modeGhost === GhostMode.Frightened) {
              entityPositions.positions.forEach(posPac => {
                const pacX = Math.floor(posPac.posX + posPac.width / 2)
                const pacY = Math.floor(posPac.posY + posPac.height / 2)
                const dist = Math.sqrt(
                  Math.pow(ghostX - pacX, 2) + Math.pow(ghostY - pacY, 2)
                )
                if (!minDist || minDist < dist) {
                  newDirection = moveGhost.direction
                  minDist = dist
                }
              })
            }
          })
        }
      }
    } else if (possibleMovementOptions.length === 1) {
      newDirection = possibleMovementOptions[0].direction
    }

    if (newDirection && newDirection !== this.direction) {
      this.turn(newDirection)
    }
  }

  update(): void {
    const occupiedCell: Entity[] = []
    this.emit(EntityEvent.CheckOccupiedCell, occupiedCell)
    if (occupiedCell.length > 0) {
      occupiedCell.forEach(entity => {
        if (entity instanceof Player && this.frightened && !entity.caught) {
          entity.emit(EntityEvent.PlayerAteGhost)
          this.ate()
        }
      })
    }

    if (this.eaten) {
      if (this.spawnPos) {
        const dist = Math.sqrt(
          Math.pow(this.posX - this.spawnPos.posX, 2) +
            Math.pow(this.posY - this.spawnPos.posY, 2)
        )
        if (dist < 3) {
          this.normal()
        }
      }
    }

    this.ghostBehavior()
    super.update()
  }
}
