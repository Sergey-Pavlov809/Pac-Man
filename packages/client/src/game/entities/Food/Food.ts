import { Entity } from '../Entity/Entity'
import { FoodType } from './data'
import { type FoodVariant } from './typings'
import { EntitySettings, Tile } from '../Entity/typings'
import { Color } from '../../services/View/colors'
import { spriteCoordinates } from '../../services/View/spriteCoordinates'

export class Food extends Entity {
  variant: FoodVariant = FoodType.Pellet
  tile: Tile | undefined

  constructor(props: EntitySettings) {
    super(props)
    Object.assign(this, props)

    switch (this.type) {
      case 'food':
        this.crossable = true
        this.color = Color.Blue
        this.tile = props.tile
        switch (this.variant) {
          case FoodType.Power:
            this.mainSpriteCoordinates = spriteCoordinates['food.power']
            break
          default:
            this.mainSpriteCoordinates = spriteCoordinates['food.pellet']
            break
        }
        break
    }

    this.registerFoodEvents()
  }

  registerFoodEvents(): void {
    // Регистрация событий
  }
}
