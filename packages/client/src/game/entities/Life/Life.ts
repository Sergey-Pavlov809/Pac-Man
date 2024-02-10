import { Entity } from '../Entity/Entity'
import { LifeType } from './data'
import { type LifeVariant } from './typings'
import { EntitySettings, Tile } from '../Entity/typings'
import { Color } from '../../services/View/colors'
import { spriteCoordinates } from '../../services/View/spriteCoordinates'

export class Life extends Entity {
  variant: LifeVariant = LifeType.Life1
  tile: Tile | undefined
  blinkDelay = 80

  constructor(props: EntitySettings) {
    super(props)
    Object.assign(this, props)

    switch (this.type) {
      case 'life':
        this.crossable = true
        this.color = Color.Blue
        this.tile = props.tile
        switch (this.variant) {
          case LifeType.Life2:
            this.mainSpriteCoordinates = spriteCoordinates['life.player2']
            break
          default:
            this.mainSpriteCoordinates = spriteCoordinates['life.player1']
            break
        }
        break
    }

    this.registerLifeEvents()
  }

  blink(): void {
    this.setLoopInterval(
      () => {
        switch (this.variant) {
          case LifeType.Life2:
            if (
              this.mainSpriteCoordinates &&
              this.mainSpriteCoordinates.length > 0
            ) {
              this.mainSpriteCoordinates = []
            } else {
              this.mainSpriteCoordinates = spriteCoordinates['life.player2']
            }
            break
          default:
            if (
              this.mainSpriteCoordinates &&
              this.mainSpriteCoordinates.length > 0
            ) {
              this.mainSpriteCoordinates = []
            } else {
              this.mainSpriteCoordinates = spriteCoordinates['life.player1']
            }
            break
        }
        this.refreshSprite()
      },
      this.blinkDelay,
      'blink'
    )
  }

  registerLifeEvents(): void {
    // Регистрация событий
  }
}
