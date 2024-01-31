import { EventEmitter } from '../EventEmitter/EventEmitter'
import { Game } from '../Game/Game'
import {
  AnimationSettings,
  GetSpriteCoordinates,
  LayerList,
  LayerObject,
} from './typings'
import { type Entity } from '../../entities/Entity/Entity'
import { EntityEvent, type Rect } from '../../entities/Entity/typings'
import { Player } from '../../entities/Player/Player'
import { ResourcesEvent, SpriteName } from '../Resources/data'

export class View extends EventEmitter {
  width = 0
  height = 0
  pixelRatio = 10
  gameBgColor = 'black'
  layersCount = 0
  /** Содержит список canvas-слоев, canvasContext этих слоев, а также прикрепленные к слоям сущности. */
  layers: LayerList = {}
  /** Корневой элемент, в него вложены все созданные DOM-элементы canvas-слоев. */
  root!: HTMLElement
  /** Нижний слой канваса, используется как фон. */
  floorLayer!: HTMLCanvasElement
  spriteImg: HTMLImageElement | null = null

  constructor(private game: Game) {
    super()
    const { width, height } = this.game.state
    this.width = width
    this.height = height
    this.pixelRatio = this.getPixelRatio()

    this.game.resources?.on(ResourcesEvent.Loaded, () => {
      this.spriteImg = this.game.resources.getImage(
        SpriteName.ClassicDesignSprite
      )
    })
  }

  /** Удаляет все сущности со всех слоев. */
  reset(): void {
    for (const id of Object.keys(this.layers)) {
      this.eraseAllEntitiesOnLayer(id)
    }
  }

  /** Инициализирует создание DOM-элементов canvas-слоев и их добавление в корневой DOM-элемент root. */
  load(root: HTMLElement | null): void {
    if (root === null) {
      throw new Error('proper DOM root for the game should be set')
    }
    this.root = root
    if (this.isRootEmpty()) {
      this.floorLayer = this.createLayer('floor')
      this.floorLayer.style.background = this.gameBgColor
      this.createLayer('dynamic')
      this.createLayer('overlay').style.position = 'relative'
    }
  }

  unload(): void {
    this.reset()
  }

  /** Определяет на какой слой необходимо добавить сущность и запускает bindEntityToLayer(). */
  add(entity: Entity): void {
    let layer = ''
    switch (entity.type) {
      case 'pacman':
      case 'ghost':
        layer = 'dynamic'
        break
      default:
        layer = 'floor'
        break
    }
    this.bindEntityToLayer(entity, layer)
  }

  /** Привязывает сущность к конкретному слою, а к сущности привязывает listeners рендеринга. */
  bindEntityToLayer(entity: Entity, layerId: keyof LayerList): void {
    const layerObject: LayerObject<Entity> = {
      instance: entity,
      listeners: {
        [EntityEvent.ShouldUpdate]: () => {
          if (!entity.spawned) {
            return
          }
          this.eraseFromLayer(entity, layerId)
        },
        [EntityEvent.DidUpdate]: () => {
          this.drawOnLayer(entity, layerId)
        },
        [EntityEvent.ShouldBeDestroyed]: () => {
          //Событие до удаления
        },
        [EntityEvent.Destroyed]: () => {
          // Событие после удаления
        },
      },
    }
    this.layers[layerId]?.entities.add(layerObject)

    for (const [eventName, callback] of Object.entries(layerObject.listeners)) {
      entity.on(eventName as EntityEvent, callback)
    }
  }

  /** Создает DOM-элементы canvas-слоев и добавляет в корневой DOM-элемент root. */
  createLayer(id: string): HTMLCanvasElement {
    const layer = document.createElement('canvas')
    layer.id = id
    layer.width = this.convertToPixels(this.width)
    layer.height = this.convertToPixels(this.height)
    layer.style.display = 'block'
    layer.style.position = 'absolute'
    layer.style.zIndex = (this.layersCount++).toString()
    this.root.appendChild(layer)
    if (this.layers[id]) {
      this.layers[id].context = layer.getContext(
        '2d'
      ) as CanvasRenderingContext2D
    } else {
      this.layers[id] = {
        context: layer.getContext('2d') as CanvasRenderingContext2D,
        entities: new Set(),
      }
    }
    return layer
  }

  /** Стирает отображение всех сущностей с canvas-слоя. */
  eraseAllEntitiesOnLayer(layerId: keyof LayerList): void {
    if (!this.layers[layerId]) {
      return
    }
    const { context } = this.layers[layerId]
    context.clearRect(
      0,
      0,
      this.convertToPixels(this.width),
      this.convertToPixels(this.height)
    )
    this.layers[layerId].entities.clear()
  }

  /** Проверяет, что слои еще не созданы. */
  private isRootEmpty(): boolean {
    return this.root.innerHTML.trim() === ''
  }

  /** Пересчитывает размер игровых клеток в пиксели. */
  private convertToPixels(value: number, correction = 0): number {
    return Math.round(value * this.pixelRatio + correction)
  }

  /** Высчитывает pixelRatio, который нужен для определения размера канваса и его содержимого. */
  private getPixelRatio(): number {
    const resizeStep = 0.5
    const correctorHeight = 100

    let pixelRatioWidth = window.innerWidth / this.width

    let isCanvasHeightBiggerThanWindow =
      pixelRatioWidth * this.height > window.innerHeight - correctorHeight

    while (isCanvasHeightBiggerThanWindow) {
      pixelRatioWidth -= resizeStep
      isCanvasHeightBiggerThanWindow =
        pixelRatioWidth * this.height > window.innerHeight - correctorHeight
    }

    return Math.floor(pixelRatioWidth / resizeStep) * resizeStep
  }

  /** Рисует отображение сущности на canvas-слое. Заполняет цветом или отображает спрайт.*/
  drawOnLayer(entity: Entity, layerId: keyof LayerList): void {
    const context = this.layers[layerId].context

    // Отрисовка сущностей без спрайта
    if (!entity.mainSpriteCoordinates || !this.isSpriteImgLoaded()) {
      if (entity.color) {
        context.fillStyle = entity.color
        context.fillRect(...this.getActualRect(entity))
      }
      return
    }

    // Отрисовка фонового цвета или фонового спрайта для сущности.
    if (entity.backColor || entity.backImg) {
      if (entity.backColor) {
        context.fillStyle = entity.backColor
      }

      if (entity.backImg) {
        const pattern = context.createPattern(entity.backImg, 'repeat')
        if (pattern !== null) {
          context.fillStyle = pattern
        }
      }

      context.fillRect(...this.getActualRect(entity))
    }

    // Отрисовка основного спрайта сущности, без анимаций.
    if (!entity.animationList?.length) {
      this.drawMainEntitySprite(entity, context)
      return
    }

    //Отрисовка сущностей с настраиваемой анимацией.
    if (entity.animationList.length) {
      entity.animationList.forEach(animation => {
        const spriteCoordinates = this.getSpriteCoordinates({
          entity,
          animation,
        })

        if (!spriteCoordinates || this.spriteImg === null) {
          return
        }

        // Отрисовка основного спрайта сущности.
        if (animation.showMainSprite) {
          this.drawMainEntitySprite(entity, context)
        }

        // Отрисовка спрайта анимации (поверх основного спрайта сущности).
        context.drawImage(
          this.spriteImg,
          spriteCoordinates[0],
          spriteCoordinates[1],
          spriteCoordinates[2],
          spriteCoordinates[3],
          ...this.getActualRect(entity)
        )
        this.setNextSpriteFrame(animation, entity)
      })
    }
  }

  /** Меняет sprite-frame, который отрисуется в следующий раз. */
  setNextSpriteFrame(animation: AnimationSettings, entity: Entity): void {
    const time = performance.now()
    if (!animation.lastTime) {
      animation.lastTime = time
    }
    const elapsed = time - animation.lastTime

    if (
      typeof animation.spriteFrame !== 'number' ||
      elapsed < animation.delay
    ) {
      return
    }

    animation.lastTime = time
    animation.spriteFrame++

    const isFinishFrame =
      animation.spriteFrame === animation.spriteCoordinates?.length

    if (isFinishFrame && animation.looped) {
      animation.spriteFrame = 0
    }

    if (isFinishFrame && !animation.looped && animation.name) {
      entity.cancelAnimation('eraseEntity', animation.name)
    }
  }

  isSpriteImgLoaded(): boolean {
    return (
      this.spriteImg instanceof HTMLImageElement &&
      this.spriteImg.complete &&
      this.spriteImg.width > 0 &&
      this.spriteImg.height > 0
    )
  }

  /** Отрисовка основного спрайта сущности */
  drawMainEntitySprite(
    entity: Entity,
    context: CanvasRenderingContext2D
  ): void {
    const spriteCoordinates = this.getSpriteCoordinates({ entity })

    if (!spriteCoordinates || this.spriteImg === null) {
      return
    }

    context.drawImage(
      this.spriteImg,
      spriteCoordinates[0],
      spriteCoordinates[1],
      spriteCoordinates[2],
      spriteCoordinates[3],
      ...this.getActualRect(entity)
    )
  }

  /** Возвращает координаты сущности на спрайте */
  getSpriteCoordinates({
    entity,
    animation,
  }: GetSpriteCoordinates): number[] | undefined {
    let spriteCoordinates: number[] | null = null

    // Спрайты сущностей без настроек анимации (меняются 2 фрейма или нет анимации).
    if (!animation && entity.mainSpriteCoordinates) {
      // Спрайты статичных сущностей.
      if (!entity.movable && Array.isArray(entity.mainSpriteCoordinates)) {
        return entity.mainSpriteCoordinates[0]
      }

      // Спрайты подвижных сущностей.
      if (entity.movable && !Array.isArray(entity.mainSpriteCoordinates)) {
        // Если pacmen не двигается, то не делаем анимацию
        const isIdlePlayer = entity instanceof Player && !entity.moving
        if (!isIdlePlayer) {
          // Без настроек анимации у сущности м.б. только 2 фрейма. Тут их меняем.
          entity.mainSpriteFrame = +!entity.mainSpriteFrame
        }
        return entity.mainSpriteCoordinates[entity.direction][
          entity.mainSpriteFrame
        ]
      }
    }

    // Спрайты сущностей с настраиваемой анимацией
    if (animation && Array.isArray(animation.spriteCoordinates)) {
      spriteCoordinates =
        animation.spriteCoordinates[animation.spriteFrame || 0]

      return spriteCoordinates
    }
  }

  getActualRect(
    item: Entity | Rect
  ): readonly [number, number, number, number] {
    return [
      this.convertToPixels(item.posX),
      this.convertToPixels(item.posY),
      this.convertToPixels(item.width),
      this.convertToPixels(item.height),
    ] as const
  }

  /** Стирает отображение сущности на canvas-слое, но не удаляет сущность. */
  eraseFromLayer(rect: Rect | Entity, layerId: keyof LayerList): void {
    const context = this.layers[layerId].context
    context.clearRect(...this.getActualRect(rect))
  }
}
