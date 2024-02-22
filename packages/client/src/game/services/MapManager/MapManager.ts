import { type MapTerrainData } from './typings'
import { type Game } from '../Game/Game'
import { levels } from './levels'
import {
  type EntitySettings,
  type EntityType,
  type EntityVariant,
  type Tile,
} from '../../entities/Entity/typings'
import {
  baseWallCells,
  Cell,
  food,
  gateWallCells,
  ghost,
  life,
  pacman,
  score,
  wallCells,
} from './data'
import { TerrainType } from '../../entities/Terrain/data'
import { GhostType } from '../../entities/Ghost/data'
import { PlayerType } from '../../entities/Player/data'
import { FoodType } from '../../entities/Food/data'
import { LifeType } from '../../entities/Life/data'
import { ScoreType } from '../../entities/Score/data'

export class MapManager {
  private map: MapTerrainData | null = null
  private mapLevelIndex = 0
  private mapTerrainData = levels

  width = 0
  height = 0

  constructor(private game: Game) {
    this.mapLevelIndex = this.game.state.level - 1
  }

  getMap(): MapTerrainData {
    this.map = this.mapTerrainData[this.mapLevelIndex]

    this.width = this.map.width
    this.height = this.map.height

    return this.map
  }

  reshapeArray(width: number, height: number, arr: number[]): number[][] {
    const result: number[][] = []
    for (let i = 0; i < height; i++) {
      const row: number[] = []
      for (let j = 0; j < width; j++) {
        row.push(arr[i * width + j])
      }
      result.push(row)
    }
    return result
  }

  mapDataToEntitySettings(map: MapTerrainData): EntitySettings[] {
    const result: EntitySettings[] = []

    if (!map) return result

    this.reshapeArray(map.width, map.height, map.data).forEach((row, y) => {
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
    const tile: Tile = cell
    const key = Cell[cell]
    let variant: EntityVariant | undefined
    if (wallCells.includes(cell)) {
      type = 'wall'
      variant = TerrainType.Wall
    } else if (baseWallCells.includes(cell)) {
      type = 'wall'
      variant = TerrainType.Base
    } else if (gateWallCells.includes(cell)) {
      type = 'wall'
      variant = TerrainType.Gate
    } else if (pacman.includes(cell)) {
      type = 'pacman'
      variant = PlayerType[key as keyof typeof PlayerType]
    } else if (ghost.includes(cell)) {
      type = 'ghost'
      variant = GhostType[key as keyof typeof GhostType]
    } else if (food.includes(cell)) {
      type = 'food'
      variant = FoodType[key as keyof typeof FoodType]
    } else if (life.includes(cell)) {
      type = 'life'
      variant = LifeType[key as keyof typeof LifeType]
    } else if (score.includes(cell)) {
      type = 'score'
      variant = ScoreType[key as keyof typeof ScoreType]
    } else {
      return
    }

    const entity = {
      type,
      width: 4,
      height: 4,
      posX: this.coordToPos(x),
      posY: this.coordToPos(y),
      tile,
      ...(variant !== undefined && { variant }),
    }

    return entity
  }

  coordToPos(value: number): number {
    return value * 4
  }
}
