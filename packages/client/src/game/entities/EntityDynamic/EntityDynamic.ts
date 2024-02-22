import { Entity } from '../Entity/Entity'
import {
  Direction,
  EntityEvent,
  type Pos,
  type PosState,
  type Rect,
} from '../Entity/typings'
import { type EntityDynamicSettings } from './typings'

export abstract class EntityDynamic extends Entity {
  /** Должен ли объект двигаться. */
  moving = true
  /** Должен ли всегда двигаться */
  alwaysMove = false
  /** Прекращает ли объект движение (он должен стать по целочисленным координатам). */
  stopping = false
  /** Может ли объект двигаться дальше. */
  canMove = true
  /** Клетка, где объект находился до начала движения. */
  lastRect: Rect | null = null
  /** Клетка, куда объект движется*/
  nextRect: Rect | null = null
  /** На сколько клеток за раз перемещается объект. */
  movePace = 2
  /** Скорость движения объекта. */
  moveSpeed = 8
  /** Сколько игровых циклов хода пройдено. */
  moveStepsProgress = 0
  /** За сколько игровых циклов объект совершает один ход. */
  moveStepsTotal = 12
  /** Новое направление, по которому объект начнёт движение после завершения полного хода. */
  nextDirection = Direction.Left
  /** Временно блокирует возможность перемещения (например на время отрисовки анимации спауна). */
  frozen = false

  spawnPos: Pos | null = null

  constructor(props: EntityDynamicSettings) {
    super(props)
    this.movable = true
  }

  spawn(coords?: Pos): boolean {
    this.spawnPos = coords || { posX: this.posX, posY: this.posY }
    return super.spawn(coords)
  }

  /** Рассчитывает количество игровых циклов для одного хода с поправкой на скорость */
  getMoveSteps(): number {
    return this.moveStepsTotal - this.moveSpeed
  }

  /** Рассчитывает расстояние, на которое объект пересместится за один игровой цикл */
  getMoveStepPace(): number {
    return this.movePace / this.getMoveSteps()
  }

  /** Начинает движение объекта в заданном направлении. */
  move(direction: Direction): void {
    if (this.spawned && !this.frozen) {
      this.moving = true
      this.nextDirection = direction
      this.emit(EntityEvent.Move)
    }
  }

  /** Поворачивает объект. */
  turn(newDirection: Direction): void {
    if (this.spawned && !this.frozen) {
      this.moving = true
      this.nextDirection = newDirection
    }
  }

  /** Останавливает движение объекта. */
  stop(): void {
    this.moving = false
    if (this.moveStepsProgress) {
      this.stopping = true
    }

    this.emit(EntityEvent.Stop)
  }

  /** Вызывается в каждом игровом цикле для определения необходимости двигаться. */
  update(): void {
    if (!this.spawned || this.frozen) {
      return
    }

    if (this.shouldBeDestroyed) {
      return
    }

    const isStandingStill =
      !this.moving && !this.stopping && !this.shouldBeDestroyed
    if (isStandingStill) {
      return
    }

    const hasUnfinishedMove = this.moveStepsProgress !== 0
    if (hasUnfinishedMove) {
      this.moveStep()
      return
    }

    const hasNewDirection = this.stopping
      ? false
      : this.direction !== this.nextDirection

    if (hasNewDirection) {
      // Тут поворот
      const oldDirection = this.direction
      this.direction = this.nextDirection
      this.prepareToMove()
      if (this.canMove) {
        this.move(this.direction)
      } else {
        this.direction = oldDirection
      }
    }
    this.prepareToMove()
    if (this.canMove) {
      this.moveStep()
    } else {
      this.stop()
    }
  }

  /** Выполняет микродвижение за игровой цикл. */
  moveStep(): void {
    const fullCycle = ++this.moveStepsProgress >= this.getMoveSteps()
    if (fullCycle) {
      this.moveStepsProgress = 0
      this.alignedToGrid = true
      this.stopping = false
      if (this.canMove && this.nextRect) {
        this.setState(this.nextRect)
      }
    } else {
      this.alignedToGrid = false
      if (this.canMove) {
        this.setState(this.getNextMove())
      } else {
        this.refreshSprite()
      }
    }
  }

  /** Рассчитывает координаты следующего хода. */
  getNextMove(
    fullMove = false,
    direction: Direction | undefined = undefined
  ): { posX: number } | { posY: number } {
    let movePace = 0
    if (fullMove) {
      movePace = this.movePace
    } else {
      movePace = this.getMoveStepPace()
    }

    let newPos

    switch (direction || this.direction) {
      case Direction.Up:
        newPos = { posY: this.posY - movePace }
        break
      case Direction.Down:
        newPos = { posY: this.posY + movePace }
        break
      case Direction.Left:
        newPos = { posX: this.posX - movePace }
        break
      case Direction.Right:
        newPos = { posX: this.posX + movePace }
        break
    }

    this.emit(EntityEvent.CheckExitAbroad, newPos)

    return newPos
  }

  /** Выполняет проверку на то, может ли объект двигаться дальше. */
  prepareToMove(): void {
    this.lastRect = this.getRect()
    const nextRect = { ...this.lastRect, ...this.getNextMove(true) }
    const posState: PosState = {
      hasCollision: undefined,
      nextRect,
    }
    this.emit(EntityEvent.WillHaveNewPos, posState)
    if (!posState.hasCollision) {
      this.canMove = true
      this.nextRect = nextRect
    } else {
      this.canMove = false
      this.nextRect = null
    }
  }
}
