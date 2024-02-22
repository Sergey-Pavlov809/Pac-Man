import { Entity } from '../../entities/Entity/Entity'
import { type Game } from '../Game/Game'
import {
  EntityEvent,
  EntityPositions,
  EntityType,
  PosState,
  Rect,
} from '../../entities/Entity/typings'
import { EntityDynamic } from '../../entities/EntityDynamic/EntityDynamic'
import { Terrain } from '../../entities/Terrain/Terrain'
import { TerrainType } from '../../entities/Terrain/data'
import { Ghost } from '../../entities/Ghost/Ghost'
import { Player } from '../../entities/Player/Player'

enum ZoneLayers {
  Main = 0,
  Ghosts = 1,
  Pacman,
  Food = 3,
}

export class Zone {
  width = 0
  height = 0
  matrix: Array<Array<Array<Entity | null>>>
  baseRect: Rect | null = null
  gateRect: Rect | null = null

  constructor(game: Game) {
    const { width, height } = game.state
    this.width = width
    this.height = height

    /**
     * Создаёт матрицу - карту местности, где указано расположение всех игровых объектов
     * Используется три уровня/слоя для отдельных типов сущностей,
     * т.к. некоторые из них могут накладываться друг на друга
     */
    this.matrix = []
    for (const z of Object.values(ZoneLayers)) {
      if (typeof z !== 'number') {
        continue
      }
      this.matrix[z] = Array(this.width)
      for (let x = 0; x < this.matrix[z].length; ++x) {
        this.matrix[z][x] = Array(this.height).fill(null)
      }
    }
  }

  /** Возвращает слой матрицы, на которой должна находиться сущность */
  getLayerByEntityType(entity: Entity | EntityType): ZoneLayers {
    const type = entity instanceof Entity ? entity.type : entity
    switch (type) {
      case 'food':
        return ZoneLayers.Food
      case 'ghost':
        return ZoneLayers.Ghosts
      case 'pacman':
        return ZoneLayers.Pacman
      default:
        return ZoneLayers.Main
    }
  }

  unload(): void {
    this.reset()
  }

  /** Очищает матрицу (вызывается перед каждым новым игровым уровнем) */
  reset(): void {
    for (let z = 0; z < this.matrix.length; ++z) {
      this.updateMatrix(
        z,
        { posX: 0, posY: 0, width: this.width, height: this.height },
        null
      )
    }
    this.baseRect = null
    this.gateRect = null
  }

  /** Алиас для registerEntity */
  add(entity: Entity): void {
    this.registerEntity(entity)
  }

  /** Добавляет сущность в заданный прямоугольник на определённом слое */
  updateMatrix(z: number, rect: Rect, value: Entity | null): void {
    if (this.isBeyondMatrix(rect) || !this.isLegalRect(rect)) {
      return
    }
    for (let x = rect.posX + rect.width - 1; x >= rect.posX; --x) {
      for (let y = rect.posY + rect.height - 1; y >= rect.posY; --y) {
        this.matrix[z][x][y] = value
      }
    }
  }

  /** Добавляет сущность в матрицу */
  writeEntityToMatrix(entity: Entity): void {
    if (entity.alignedToGrid) {
      const layer = this.getLayerByEntityType(entity)
      const rect = entity.getRect()
      this.updateMatrix(layer, rect, entity)
    }
  }

  /** Удаляет сущность из матрицы */
  deleteEntityFromMatrix(entity: Entity | EntityDynamic): void {
    const layer = this.getLayerByEntityType(entity)
    if (!(entity instanceof EntityDynamic)) {
      const rect = entity.getRect()
      this.updateMatrix(layer, rect, null)
    } else {
      let rect = entity.lastRect
      if (rect) {
        this.updateMatrix(layer, rect, null)
      } else {
        rect = entity.getRect()
        this.updateMatrix(layer, rect, null)
      }
      if (entity.nextRect) {
        rect = entity.nextRect
        this.updateMatrix(layer, rect, null)
      }
    }
  }

  /** Подписывается на события сущности, которые отслеживаются для обновления матрицы */
  registerEntity(entity: Entity): void {
    if (entity instanceof EntityDynamic) {
      entity.on(EntityEvent.WillHaveNewPos, (posState: PosState) => {
        const rect = posState.nextRect
        if (this.hasCollision(rect, entity)) {
          posState.hasCollision = true
        } else {
          const layer = this.getLayerByEntityType(entity)
          this.updateMatrix(layer, rect, entity)
        }
      })

      entity.on(
        EntityEvent.CheckExitAbroad,
        (newPos: { posX: number } | { posY: number }) => {
          if ('posX' in newPos) {
            if (newPos.posX < 0) {
              newPos.posX = this.width - 2
            } else if (newPos.posX > this.width - 1) {
              newPos.posX = 1
            }
          }
          if ('posY' in newPos) {
            if (newPos.posY < 0) {
              newPos.posY = this.height - 2
            } else if (newPos.posY > this.height - 1) {
              newPos.posY = 1
            }
          }
        }
      )

      entity.on(EntityEvent.CheckOccupiedCell, (occupiedCell: Entity[]) => {
        occupiedCell.push(...this.getEntitiesInCell(entity))
      })

      entity.on(
        EntityEvent.CheckGhostAtBase,
        (ghostAtBase: { atBase: boolean }) => {
          ghostAtBase.atBase = this.checkGhostAtBase(entity)
        }
      )

      entity.on(
        EntityEvent.GetGatePosition,
        (gatePosition: { rect: Rect | null }) => {
          gatePosition.rect = this.getGateRect()
        }
      )

      entity.on(EntityEvent.CanMoveToNewPos, (posState: PosState) => {
        const rect = posState.nextRect
        posState.hasCollision = this.hasCollision(rect, entity)
      })

      entity.on(
        EntityEvent.IsBeyondMatrix,
        (posOut: { rect: Rect; isBeyondMatrix: boolean }) => {
          posOut.isBeyondMatrix = this.isBeyondMatrix(posOut.rect)
        }
      )

      entity.on(
        EntityEvent.GetPositionEntity,
        (entityPositions: EntityPositions) => {
          const layer = this.getLayerByEntityType(entityPositions.type)
          for (let x = 2; x < this.width; x = x + 4) {
            for (let y = 2; y < this.height; y = y + 4) {
              const ent = this.matrix[layer][x][y]
              if (ent && entityPositions.type === ent.type) {
                entityPositions.positions.push(ent.getRect())
              }
            }
          }
        }
      )

      entity.on(EntityEvent.ShouldBeDestroyed, () => {
        this.deleteEntityFromMatrix(entity)
      })
    }

    entity.on(EntityEvent.ShouldUpdate, (newState: Partial<Entity>) => {
      if (!newState || !('posX' in newState) || !('posY' in newState)) {
        return
      }
      if (!entity.spawned) {
        return
      }
      this.deleteEntityFromMatrix(entity)
    })

    entity.on(EntityEvent.DidUpdate, (newState: Partial<Entity>) => {
      if (!newState || !('posX' in newState) || !('posY' in newState)) {
        return
      }
      this.writeEntityToMatrix(entity)
    })
  }

  checkGhostAtBase(entity: EntityDynamic | Rect): boolean {
    const rect = entity instanceof EntityDynamic ? entity.getRect() : entity
    const baseRect = this.getBaseRect()

    if (baseRect) {
      const atBase =
        baseRect.posX < rect.posX + rect.width &&
        baseRect.posX + baseRect.width > rect.posX &&
        baseRect.posY < rect.posY + rect.height &&
        baseRect.posY + baseRect.height > rect.posY

      return atBase //&& !this.checkGhostAtGate(entity)
    }
    return false
  }

  checkGhostAtGate(entity: EntityDynamic | Rect): boolean {
    const rect = entity instanceof EntityDynamic ? entity.getRect() : entity
    const gateRect = this.getGateRect()

    if (gateRect) {
      return (
        gateRect.posX < rect.posX + rect.width &&
        gateRect.posX + gateRect.width > rect.posX &&
        gateRect.posY < rect.posY + rect.height &&
        gateRect.posY + gateRect.height > rect.posY
      )
    }
    return false
  }

  getGateRect(): Rect | null {
    if (!this.gateRect) {
      const arrayX: number[] = []
      const arrayY: number[] = []
      for (let x = 0; x < this.width; ++x) {
        for (let y = 0; y < this.height; ++y) {
          const layerCell = this.matrix[ZoneLayers.Main][x]?.[y]
          if (
            layerCell instanceof Terrain &&
            layerCell.variant === TerrainType.Gate
          ) {
            arrayX.push(x)
            arrayY.push(y)
          }
        }
      }
      if (arrayX.length !== 0 && arrayY.length !== 0) {
        const minX = Math.min(...arrayX)
        const maxX = Math.max(...arrayX)
        const minY = Math.min(...arrayY)
        const maxY = Math.max(...arrayY)
        this.gateRect = {
          posX: minX,
          posY: minY,
          width: maxX - minX + 1,
          height: maxY - minY + 1,
        }
      }
    }
    return this.gateRect
  }

  getBaseRect(): Rect | null {
    if (!this.baseRect) {
      const arrayX: number[] = []
      const arrayY: number[] = []
      for (let x = 0; x < this.width; ++x) {
        for (let y = 0; y < this.height; ++y) {
          const layerCell = this.matrix[ZoneLayers.Main][x]?.[y]
          if (
            layerCell instanceof Terrain &&
            layerCell.variant === TerrainType.Base
          ) {
            arrayX.push(x)
            arrayY.push(y)
          }
        }
      }
      if (arrayX.length !== 0 && arrayY.length !== 0) {
        const minX = Math.min(...arrayX)
        const maxX = Math.max(...arrayX)
        const minY = Math.min(...arrayY)
        const maxY = Math.max(...arrayY)
        this.baseRect = {
          posX: minX,
          posY: minY,
          width: maxX - minX,
          height: maxY - minY,
        }
      }
    }
    return this.baseRect
  }

  /** Проверяет, все ли параметры прямоугольника целочисленные */
  isLegalRect(rect: Rect): boolean {
    if (
      rect.posX % 1 === 0 &&
      rect.posY % 1 === 0 &&
      rect.width % 1 === 0 &&
      rect.height % 1 === 0
    ) {
      return true
    }
    return false
  }

  /** Проверка на предмет координат прямоугольника, которые не соответствуют матрице */
  isBeyondMatrix(rect: Rect): boolean {
    if (this.isBeyondXAxis(rect) || this.isBeyondYAxis(rect)) {
      return true
    }
    return false
  }

  isBeyondXAxis(rect: Rect): boolean {
    const offsetX = rect.posX + rect.width
    if (rect.posX < 0 || offsetX > this.width) {
      return true
    }
    return false
  }

  isBeyondYAxis(rect: Rect): boolean {
    const offsetY = rect.posY + rect.height
    if (rect.posY < 0 || offsetY > this.height) {
      return true
    }
    return false
  }

  getEntitiesInCell(entity: Entity): Entity[] {
    const rect = entity.getRect()
    const entities: Entity[] = []

    for (let x = rect.posX + rect.width - 1; x >= rect.posX; --x) {
      for (let y = rect.posY + rect.height - 1; y >= rect.posY; --y) {
        for (const layer of Object.values(ZoneLayers)) {
          if (typeof layer !== 'number') {
            continue
          }
          const layerCell = this.matrix[layer][x]?.[y]
          if (
            layerCell &&
            layerCell !== entity &&
            layerCell.spawned &&
            !layerCell.shouldBeDestroyed &&
            !entities.includes(layerCell)
          ) {
            entities.push(layerCell)
          }
        }
      }
    }

    return entities
  }

  /**
   * Проверяет, находится ли по заданным координатам какая-либо ещё сущность.
   * Если да, то совершает над ней необходимые операции
   */
  hasCollisionsWithMatrix(rect: Rect, entity: Entity): boolean {
    for (let x = rect.posX + rect.width - 1; x >= rect.posX; --x) {
      for (let y = rect.posY + rect.height - 1; y >= rect.posY; --y) {
        const layerMainCell = this.matrix[ZoneLayers.Main][x]?.[y]

        if (layerMainCell && !layerMainCell.crossable) {
          return true
        }

        if (
          layerMainCell &&
          layerMainCell instanceof Terrain &&
          entity instanceof Ghost &&
          !entity.eaten &&
          !this.checkGhostAtBase(entity) &&
          this.checkGhostAtBase(layerMainCell.getRect())
        ) {
          return true
        }

        const layerGhostsCell = this.matrix[ZoneLayers.Ghosts][x]?.[y]
        if (
          layerGhostsCell &&
          entity instanceof Ghost &&
          entity !== layerGhostsCell
        ) {
          return true
        }

        const layerPacmanCell = this.matrix[ZoneLayers.Pacman][x]?.[y]
        if (
          layerPacmanCell &&
          entity instanceof Player &&
          entity !== layerPacmanCell
        ) {
          return true
        }
      }
    }
    return false
  }

  /** Проверка на пересечение прямоугольников, на которых расположены игровые сущности в данный момент.
   * Погрешность (margin) задаётся, чтобы снизить чувствительность сопоставления для движущихся объектов.
   */
  currentRectsOverlap(
    rectOne: Entity | Rect,
    rectTwo: Entity | Rect,
    margin = 0.25
  ): boolean {
    const rectOneStartX = rectOne.posX + margin
    const rectOneEndX = rectOne.posX + rectOne.width - margin
    const rectOneStartY = rectOne.posY + margin
    const rectOneEndY = rectOne.posY + rectOne.height - margin

    const rectTwoStartX = rectTwo.posX + margin
    const rectTwoEndX = rectTwo.posX + rectTwo.width - margin
    const rectTwoStartY = rectTwo.posY + margin
    const rectTwoEndY = rectTwo.posY + rectTwo.height - margin

    const rectOneRightOfRectTwo = rectOneStartX >= rectTwoEndX
    const rectOneLeftOfRectTwo = rectOneEndX <= rectTwoStartX
    const rectOneBottomOfRectTwo = rectOneStartY >= rectTwoEndY
    const rectOneTopOfRectTwo = rectOneEndY <= rectTwoStartY

    return !(
      rectOneRightOfRectTwo ||
      rectOneLeftOfRectTwo ||
      rectOneBottomOfRectTwo ||
      rectOneTopOfRectTwo
    )
  }

  /** Проверка на предмет столкновений сущностей и координат */
  hasCollision(rect: Rect, entity: Entity): boolean {
    if (
      //this.isBeyondMatrix(rect) ||
      this.hasCollisionsWithMatrix(rect, entity)
    ) {
      return true
    }
    return false
  }
}
