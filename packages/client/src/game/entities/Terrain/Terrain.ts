import { Entity } from '../Entity/Entity'
import { EntitySettings } from '../Entity/typings'
import { TerrainVariant } from './typings'
import { Color } from '../../services/View/colors'

export class Terrain extends Entity {
  variant: TerrainVariant = 'WHOLE'

  constructor(props: EntitySettings) {
    super(props)
    Object.assign(this, props)

    switch (this.type) {
      case 'wall':
        this.crossable = false
        this.color = Color.Blue
        break
    }

    this.registerTerrainEvents()
  }

  registerTerrainEvents(): void {
    // Регистрация событий
  }
}
