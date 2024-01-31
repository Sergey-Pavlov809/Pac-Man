import { EntityDynamic } from '../EntityDynamic/EntityDynamic'
import { PlayerSettings, type PlayerVariant } from './typings'
import { spriteCoordinates } from '../../services/View/spriteCoordinates'
import { EntityEvent } from '../Entity/typings'

export class Player extends EntityDynamic {
  width = 4
  height = 4

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

    this.mainSpriteCoordinates = isPlayerOne
      ? spriteCoordinates['player.primary']
      : spriteCoordinates['player.secondary']
    this.refreshSprite()
  }

  registerPlayerEvents(): void {
    this.on(EntityEvent.Spawn, () => {
      this.startAnimation({
        name: 'anim',
        delay: 150,
        spriteCoordinates: spriteCoordinates['player.primary'][this.direction],
        looped: true,
      })
    }).on(EntityEvent.Move, () => {
      this.cancelAnimation('showEntity', 'anim')
      this.startAnimation({
        name: 'anim',
        delay: 150,
        spriteCoordinates:
          spriteCoordinates['player.primary'][this.nextDirection],
        looped: true,
      })
    })
  }
}
