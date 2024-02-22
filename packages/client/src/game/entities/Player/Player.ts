import { EntityDynamic } from '../EntityDynamic/EntityDynamic'
import { PlayerSettings, type PlayerVariant } from './typings'
import { spriteCoordinates } from '../../services/View/spriteCoordinates'
import { Direction, EntityEvent } from '../Entity/typings'
import { Entity } from '../Entity/Entity'
import { FoodType } from '../Food/data'
import { Food } from '../Food/Food'
import { Ghost } from '../Ghost/Ghost'

export class Player extends EntityDynamic {
  width = 4
  height = 4
  animDelay = 80
  alwaysMove = true

  variant: PlayerVariant = 'PLAYER1'
  caught = false
  /** Сколько игрок будет неуязвимым после появления. */
  spawnShieldTimeout = 3000

  constructor(props: PlayerSettings) {
    super({ posX: 0, posY: 0, type: 'pacman' })
    Object.assign(this, props)

    this.updatePlayerSpecs()
    this.registerPlayerEvents()
  }

  updatePlayerSpecs(): void {
    const isPlayerOne = this.variant === 'PLAYER1'

    if (!isPlayerOne) {
      this.nextDirection = Direction.Right
    }

    this.mainSpriteCoordinates = isPlayerOne
      ? spriteCoordinates['player.primary']
      : spriteCoordinates['player.secondary']
    this.refreshSprite()
  }

  motionAnimation(direction: Direction): void {
    this.stopAnimation()

    const isPlayerOne = this.variant === 'PLAYER1'
    if (
      spriteCoordinates['player.primary'] &&
      spriteCoordinates['player.secondary']
    ) {
      this.startAnimation({
        name: this.variant,
        delay: this.animDelay,
        spriteCoordinates: isPlayerOne
          ? spriteCoordinates['player.primary'][direction]
          : spriteCoordinates['player.secondary'][direction],
        looped: true,
      })
    }
  }

  dyingAnimation(): void {
    this.stopAnimation()

    if (spriteCoordinates['player.destroy']) {
      this.startAnimation({
        name: this.variant,
        delay: this.animDelay,
        spriteCoordinates: spriteCoordinates['player.destroy'],
        looped: true,
      })
    }
  }

  stopAnimation(): void {
    if (
      spriteCoordinates['player.primary'] &&
      spriteCoordinates['player.secondary']
    ) {
      if (this.mainSpriteFrame === 0) this.mainSpriteFrame++
      this.cancelAnimation('showEntity', this.variant)
    }
  }

  registerPlayerEvents(): void {
    this.on(EntityEvent.Spawn, () => {
      this.lastRect = null
      this.motionAnimation(this.direction)
    })
      .on(EntityEvent.Move, () => {
        this.motionAnimation(this.nextDirection)
      })
      .on(EntityEvent.Stop, () => {
        this.stopAnimation()
      })
  }

  //Дополнительные действия, когда сущности в одной ячейке
  update(): void {
    const occupiedCell: Entity[] = []
    this.emit(EntityEvent.CheckOccupiedCell, occupiedCell)
    if (occupiedCell.length > 0) {
      occupiedCell.forEach(entity => {
        if (entity instanceof Food && !entity.shouldBeDestroyed) {
          this.emit(EntityEvent.PlayerAteFood, entity)
          if (entity.variant === FoodType.Power) {
            this.emit(EntityEvent.GhostIsFrightened)
          }
        }

        if (
          entity instanceof Ghost &&
          !entity.frightened &&
          !entity.eaten &&
          !this.caught
        ) {
          this.caught = true
          this.emit(EntityEvent.PlayerCaught)
          this.dyingAnimation()

          this.setLoopDelay(() => {
            this.stopAnimation()
            this.emit(EntityEvent.Destroyed)
          }, this.animDelay * (spriteCoordinates['player.destroy'].length + 3))
        }
      })
    }

    super.update()
  }
}
