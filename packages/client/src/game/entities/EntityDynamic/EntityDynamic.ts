import { Entity } from '../Entity/Entity'
import {
  Direction,
  EntityEvent,
  type PosState,
  type Rect,
} from '../Entity/typings'
import { type EntityDynamicSettings } from './typings'

export abstract class EntityDynamic extends Entity {
  /** Должен ли объект двигаться. */
  moving = false
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
  moveSpeed = 3
  /** Сколько игровых циклов хода пройдено. */
  moveStepsProgress = 0
  /** За сколько игровых циклов объект совершает один ход. */
  moveStepsTotal = 12
  /** Новое направление, по которому объект начнёт движение после завершения полного хода. */
  nextDirection = Direction.Up
  /** Временно блокирует возможность перемещения (например на время отрисовки анимации спауна). */
  frozen = false

  constructor(props: EntityDynamicSettings) {
    super(props)
    this.movable = true
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
    this.moving = true
    this.nextDirection = direction

    if (this.spawned && !this.frozen) {
      this.emit(EntityEvent.Move)
    }
  }

  /** Поворачивает объект на месте. */
  turn(newDirection: Direction = this.nextDirection): void {
    if (this.direction !== newDirection) {
      this.emit(EntityEvent.Stop)
      if (this.moving) {
        this.emit(EntityEvent.Move)
      }
      this.setState({ direction: newDirection })
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
      this.prepareToMove()
      this.turn()
    } else {
      this.prepareToMove()
      this.moveStep()
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
  getNextMove(fullMove = false): { posX: number } | { posY: number } {
    let movePace = 0
    if (fullMove) {
      movePace = this.movePace
    } else {
      movePace = this.getMoveStepPace()
    }

    switch (this.direction) {
      case Direction.Up:
        return { posY: this.posY - movePace }
      case Direction.Down:
        return { posY: this.posY + movePace }
      case Direction.Left:
        return { posX: this.posX - movePace }
      case Direction.Right:
        return { posX: this.posX + movePace }
    }
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
