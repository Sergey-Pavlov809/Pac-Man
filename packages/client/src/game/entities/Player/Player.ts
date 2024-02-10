import { EntityDynamic } from '../EntityDynamic/EntityDynamic'
import { PlayerSettings, type PlayerVariant } from './typings'
import { spriteCoordinates } from '../../services/View/spriteCoordinates'
import { Direction, EntityEvent } from '../Entity/typings'
import { Entity } from '../Entity/Entity'

export class Player extends EntityDynamic {
  width = 4
  height = 4
  animDelay = 80
  alwaysMove = true

  variant: PlayerVariant = 'PLAYER1'
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

  registerPlayerEvents(): void {
    this.on(EntityEvent.Spawn, () => {
      this.lastRect = null
      const isPlayerOne = this.variant === 'PLAYER1'
      if (spriteCoordinates['player.primary']) {
        this.startAnimation({
          name: this.variant,
          delay: this.animDelay,
          spriteCoordinates: isPlayerOne
            ? spriteCoordinates['player.primary'][this.direction]
            : spriteCoordinates['player.secondary'][this.direction],
          looped: true,
        })
      }
    })
      .on(EntityEvent.Move, () => {
        const isPlayerOne = this.variant === 'PLAYER1'
        if (spriteCoordinates['player.primary']) {
          this.cancelAnimation('showEntity', this.variant)
          this.startAnimation({
            name: this.variant,
            delay: this.animDelay,
            spriteCoordinates: isPlayerOne
              ? spriteCoordinates['player.primary'][this.nextDirection]
              : spriteCoordinates['player.secondary'][this.nextDirection],

            looped: true,
          })
        }
      })
      .on(EntityEvent.Stop, () => {
        if (spriteCoordinates['player.primary']) {
          if (this.mainSpriteFrame === 0) this.mainSpriteFrame++
          this.cancelAnimation('showEntity', this.variant)
        }
      })
      .on(EntityEvent.PlayerCaught, () => {
        if (spriteCoordinates['player.destroy']) {
          this.cancelAnimation('eraseEntity', this.variant)
          this.startAnimation({
            name: this.variant,
            delay: this.animDelay,
            spriteCoordinates: spriteCoordinates['player.destroy'],
            looped: true,
          })
        }
        this.setLoopDelay(() => {
          this.cancelAnimation('showEntity', this.variant)
          this.emit(EntityEvent.Destroyed)
        }, this.animDelay * (spriteCoordinates['player.destroy'].length + 3))
      })
  }

  //Дополнительные действия, когда сущности в одной ячейке
  checkCellOccupancy(entities: Entity[]): boolean {
    entities.forEach(entity => {
      if (entity.type === 'food') {
        this.emit(EntityEvent.PlayerAteFood, entity)
      }
    })
    return true
  }
}
