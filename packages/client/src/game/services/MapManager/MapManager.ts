import { type MapTerrainData } from './typings'
import { type Game } from '../Game/Game'
import { levels } from './levels'
import {
  type EntitySettings,
  type EntityType,
} from '../../entities/Entity/typings'
import { wallCells } from './data'

export class MapManager {
  private map: MapTerrainData | null = null
  private mapLevelIndex = 0
  private mapTerrainData = levels

  constructor(private game: Game) {
    this.mapLevelIndex = this.game.state.level - 1
  }

  getMap(): MapTerrainData {
    this.map = this.mapTerrainData[this.mapLevelIndex]

    return this.map
  }

  mapDataToEntitySettings(map: MapTerrainData): EntitySettings[] {
    const result: EntitySettings[] = []

    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const entity = this.cellToEntitySettings(cell, x, y)

        if (!entity) {
          return
        }

        result.push(entity)
      })
    })

    return result
  }

  cellToEntitySettings(
    cell: number,
    x: number,
    y: number
  ): EntitySettings | undefined {
    let type: Nullable<EntityType> = null
    if (wallCells.includes(cell)) {
      type = 'wall'
    } else {
      return
    }

    const entity = {
      type,
      width: 4,
      height: 4,
      posX: this.coordToPos(x),
      posY: this.coordToPos(y),
    }

    return entity
  }

  coordToPos(value: number): number {
    return value * 4
  }
}
