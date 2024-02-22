import { type Entity } from '../../entities/Entity/Entity'
import { EntityEvent } from '../../entities/Entity/typings'
import { type LoopDelays, type LoopIntervals } from './typings'
import { Player } from '../../entities/Player/Player'
import { Ghost } from '../../entities/Ghost/Ghost'

export class Loop {
  /** Минимальное время игрового цикла в миллисекундах */
  loopTimeMs = 16
  /** Количество игровых циклов, которые могут быть выполнены за раз в случае задержек */
  maxConsecutiveLoops = 4
  /** Счётчик игровых циклов */
  loopCount = 0

  /** Список внутриигровых таймаутов */
  loopDelays: LoopDelays = {}
  /** Список внутриигровых интервалов */
  loopIntervals: LoopIntervals = {}

  /** Список динамических игровых сущностей */
  loopEntities: Set<Player | Ghost> = new Set()
  /** Запущен ли данный сервис */
  active = false
  lastTimestamp = 0

  load(): void {
    this.start()
  }

  unload(): void {
    this.stop()
    this.reset()
  }

  reset(): void {
    this.clearLoopEntities()
    this.loopIntervals = {}
    this.clearLoopDelays()
  }

  start(): void {
    this.active = true
    this.lastTimestamp = 0
    this.loop()
  }

  stop(): void {
    this.active = false
  }

  loop(timestamp = 0): void {
    if (!this.active) {
      return
    }

    if (timestamp) {
      const timeDifference = timestamp - this.lastTimestamp

      if (timeDifference >= this.loopTimeMs) {
        if (this.lastTimestamp !== 0) {
          const ticksCount = Math.min(
            Math.round(timeDifference / this.loopTimeMs),
            this.maxConsecutiveLoops
          )

          for (let i = ticksCount; i > 0; --i) {
            this.tick()
          }
        }

        this.lastTimestamp = timestamp
      }
    }

    requestAnimationFrame(this.loop.bind(this))
  }

  tick(): void {
    ++this.loopCount
    this.checkLoopDelays()
    this.checkLoopIntervals()
    for (const entity of this.loopEntities) {
      entity.update()
      if (entity.shouldBeDestroyed) {
        this.loopEntities.delete(entity)
      }
    }
  }

  add(entity: Entity): void {
    this.registerTimerHandlers(entity)
    if (entity instanceof Player || entity instanceof Ghost) {
      this.loopEntities.add(entity)
    }
  }

  clearLoopEntities(): void {
    for (const entity of this.loopEntities) {
      entity.despawn()
    }
    this.loopEntities = new Set()
  }

  registerTimerHandlers(entity: Entity): void {
    entity.on(EntityEvent.SetLoopDelay, this.setLoopDelay.bind(this))
    entity.on(EntityEvent.DeleteLoopDelay, this.deleteLoopDelay.bind(this))
    entity.on(EntityEvent.SetLoopInterval, this.setLoopInterval.bind(this))
    entity.on(EntityEvent.ClearLoopInterval, this.clearLoopInterval.bind(this))
  }

  /** Аналог setTimeout, который работает через игровой цикл. */
  setLoopDelay(
    callback: () => void,
    delay: number,
    result: { id: string } = { id: '' }
  ): void {
    let loopMark = this.loopCount + this.convertTimeToLoops(delay)

    if (loopMark === this.loopCount) {
      ++loopMark // реализация нулевой задержки
    }

    if (!this.loopDelays[loopMark]) {
      this.loopDelays[loopMark] = []
    }

    this.loopDelays[loopMark].push(callback)
    result.id = `${loopMark}-${this.loopDelays[loopMark].length - 1}`
  }

  convertTimeToLoops(delay: number): number {
    return Math.floor(delay / this.loopTimeMs)
  }

  /** Аналог setInterval, который работает через игровой цикл. */
  setLoopInterval(
    callback: () => void,
    delay: number,
    intervalName: string
  ): string {
    this.loopIntervals[intervalName] = {
      loopCounter: 0,
      targetLoop: this.convertTimeToLoops(delay),
      callback: callback,
    }

    return intervalName
  }

  clearLoopInterval(intervalName: string): void {
    if (intervalName in this.loopIntervals) {
      delete this.loopIntervals[intervalName]
    }
  }

  checkLoopDelays(): void {
    if (this.loopDelays[this.loopCount]) {
      const delayedCallbacks = this.loopDelays[this.loopCount]
      for (const callback of delayedCallbacks) {
        callback()
      }
      delete this.loopDelays[this.loopCount]
    }
  }

  deleteLoopDelay(id: string): void {
    const values = id.split('-')
    if (values.length === 2) {
      if (this.loopDelays[Number(values[0])]?.[Number(values[1])]) {
        this.loopDelays[Number(values[0])][Number(values[1])] = (): void => {
          return
        }
      }
    }
  }

  checkLoopIntervals(): void {
    Object.values(this.loopIntervals).forEach(interval => {
      if (interval.loopCounter === interval.targetLoop) {
        interval.callback()
        interval.loopCounter = 0
        return
      }
      interval.loopCounter++
    })
  }

  clearLoopDelays(): void {
    this.loopCount = 0
    this.loopDelays = {}
  }
}
