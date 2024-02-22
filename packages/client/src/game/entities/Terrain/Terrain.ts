import { Entity } from '../Entity/Entity'
import { EntitySettings, Tile } from '../Entity/typings'
import { TerrainVariant } from './typings'
import { Color } from '../../services/View/colors'
import { spriteCoordinates } from '../../services/View/spriteCoordinates'
import { TerrainType } from './data'

export class Terrain extends Entity {
  variant: TerrainVariant = TerrainType.Wall
  closingGateDelay = 1000
  tile: Tile | undefined

  constructor(props: EntitySettings) {
    super(props)
    Object.assign(this, props)

    switch (this.type) {
      case 'wall':
        this.crossable = false
        this.color = Color.Blue
        this.tile = props.tile
        this.mainSpriteCoordinates = spriteCoordinates['terrain.' + props.tile]
        break
    }

    if (this.variant === TerrainType.Gate) {
      this.crossable = true
    }

    this.registerTerrainEvents()
  }

  openGate(): void {
    if (this.variant === TerrainType.Gate) {
      this.mainSpriteCoordinates = []
      this.refreshSprite()
      this.setLoopDelay(() => {
        this.mainSpriteCoordinates = spriteCoordinates['terrain.' + this.tile]
        this.refreshSprite()
      }, this.closingGateDelay)
    }
  }

  registerTerrainEvents(): void {
    // Регистрация событий
  }
}
