import { EventEmitter } from '../../services/EventEmitter/EventEmitter'
import {
  Direction,
  EntityEvent,
  type EntitySettings,
  type EntityType,
  type Pos,
  type PosState,
  type Rect,
} from './typings'
import {
  type Animations,
  type AnimationSettings,
  type CancelAnimation,
  type SpriteCoordinatesNoAnimations,
  type SpriteCoordinatesWithAnimations,
} from '../../services/View/typings'
import { Color } from '../../services/View/colors'

export abstract class Entity extends EventEmitter<EntityEvent> {
  /** Расположение объекта по оси X в игровых клетках. */
  posX = 0
  /** Расположение объекта по оси Y в игровых клетках. */
  posY = 0
  /** Ширина объекта в игровых клетках. */
  width = 0
  /** Высота объекта в игровых клетках. */
  height = 0
  /** Направление, куда смотрит или движется объект. */
  direction = Direction.Left
  /** Тип объекта (например: пакмен, призрак, ячейка лабиринта). */
  type: EntityType = 'custom'
  /** Находится ли объект в игре. При уничтожении - false. */
  spawned = false
  /** Может ли объект двигаться (к примеру, призраки - могут). */
  movable = false
  /** Можно ли переезжать через сущность (к примеру, убитые призраки могут). */
  crossable = false
  /** Цвет объекта, если вдруг спрайты не подгрузятся или сбросятся. */
  color = 'gray'
  /** Должен ли объект быть убран из игры. */
  shouldBeDestroyed = false
  /** Кем уничтожен объект. */
  destroyedBy: Entity | null = null
  /** Стоит ли объект ровно по сетке в соответствии с матрицей Zone
   * (для отрисовки плавных движений объект может иметь дробные координаты). */
  alignedToGrid = true
  /** Хранит координаты сущности на спрайте. Это основной спрайт, на который сверху могут накладываться анимации. */
  mainSpriteCoordinates:
    | SpriteCoordinatesNoAnimations
    | SpriteCoordinatesWithAnimations = null
  /** Указывает какой фрейм анимации показывать. */
  mainSpriteFrame = 0
  /** Список анимаций для данной сущности. Хранит настройки необходимые для работы анимации. */
  animationList: Animations = []
  /** Фоновое изображение под основной спрайт */
  backImg: HTMLImageElement | HTMLCanvasElement | null = null
  /** Фоновый цвет под основной спрайт */
  backColor: Color | null = null

  constructor(props: EntitySettings) {
    super()
    Object.assign(this, props)
  }

  /** Изменяет состояние объекта и вызывает события, которые отлавливаются в сервисах. */
  setState(newState: Partial<Entity>): void {
    this.emit(EntityEvent.ShouldUpdate, newState)
    Object.assign(this, newState)
    this.emit(EntityEvent.DidUpdate, newState)
  }

  /** Возвращает прямоугольник, на котором находится объект. */
  getRect(): Rect {
    return {
      posX: this.posX,
      posY: this.posY,
      width: this.width,
      height: this.height,
    }
  }

  /** Вводит объект в игру, размещая его по заданным координатам. */
  spawn(coords?: Pos): boolean {
    const { posX, posY } = coords || { posX: this.posX, posY: this.posY }

    const posState: PosState = {
      hasCollision: undefined,
      nextRect: { posX, posY, width: this.width, height: this.height },
    }
    this.emit(EntityEvent.WillHaveNewPos, posState)
    if (!posState.hasCollision) {
      this.setState({ posX, posY })
      this.spawned = true
      this.emit(EntityEvent.Spawn)
    }

    return this.spawned
  }

  /** Убирает объект из игры. */
  despawn(): void {
    if (!this.spawned) {
      return
    }
    this.shouldBeDestroyed = true
    this.emit(EntityEvent.ShouldBeDestroyed)
    this.emit(EntityEvent.Despawn)
    this.spawned = false
  }

  /** Уничтожает объект. */
  beDestroyed(source: Entity): void {
    this.destroyedBy = source
    this.emit(EntityEvent.Destroyed, source)
  }

  /** Запускает анимацию  */
  startAnimation(settings: AnimationSettings): void {
    settings.name ??= Math.random().toString()
    settings.spriteFrame ??= 0
    this.animationList.push(settings)

    this.refreshSprite()
    this.setLoopInterval(
      () => {
        this.refreshSprite()
      },
      settings.delay,
      settings.name
    )

    this.emit(EntityEvent.AnimationStarted, settings.name)

    // По умолчанию анимации убиваются в Game.reset()
    if (settings.stopTimer) {
      this.setLoopDelay(
        this.cancelAnimation.bind(this, 'showEntity', settings.name),
        settings.stopTimer
      )
    }
  }

  /** Отмена (отключение) анимации. */
  cancelAnimation(type: CancelAnimation = 'eraseEntity', name: string): void {
    this.clearLoopInterval(name)

    const animationIndex = this.animationList.findIndex(
      animation => animation.name === name
    )
    this.animationList.splice(animationIndex, 1)

    this.emit(EntityEvent.AnimationEnded, name)

    // Обновляем вид сущности и оставляем видимой на канвасе после завершения анимации.
    if (type === 'showEntity') {
      this.refreshSprite()
      return
    }

    // Стираем сущность с канваса после завершения анимации.
    if (type === 'eraseEntity') {
      this.emit(EntityEvent.ShouldUpdate)
    }
  }

  /** Стирает и заново отрисовывает сущность на канвасе. Т.е. обновляет вид сущности в игре. */
  refreshSprite(): void {
    this.emit(EntityEvent.ShouldUpdate)
    this.emit(EntityEvent.DidUpdate)
  }

  /** Аналог setInterval. Метод описан в Game. */
  setLoopInterval(
    callback: () => void,
    delay: number,
    name: string | number
  ): void {
    this.emit(EntityEvent.SetLoopInterval, callback, delay, name)
  }

  /** Удаляет интервал по его имени. Метод описан в Game. */
  clearLoopInterval(name: string | number): void {
    this.emit(EntityEvent.ClearLoopInterval, name)
  }

  /** Аналог setTimeout. Метод описан в Game. */
  setLoopDelay(callback: () => void, delay: number): string {
    const result = { id: '' }
    this.emit(EntityEvent.SetLoopDelay, callback, delay, result)
    return result.id
  }

  deleteLoopDelay(id: string): void {
    this.emit(EntityEvent.DeleteLoopDelay, id)
  }
}
