import { EventEmitter } from '../EventEmitter/EventEmitter'
import { type Direction } from '../../entities/Entity/typings'
import { ControllerEvent } from './data'
import { type ControlEvent, type Controller } from './typings'
import { type Binding } from './KeyBindings'

export abstract class ControllerBase
  extends EventEmitter<ControllerEvent>
  implements Controller
{
  activeDirection: Partial<Record<Direction, boolean>> = {}

  constructor() {
    super()
  }

  load(): void {
    this.registerEvents()
  }

  unload(): void {
    this.disableEvents()
  }

  reset(): this {
    this.clearAllListeners()
    return this
  }

  abstract registerEvents(): void

  abstract disableEvents(): void

  abstract startControlByEvent(event: ControlEvent): void

  abstract stopControlByEvent(event: ControlEvent): void

  /** Запускает событие привязанное к кнопке/клику, например движение вперед. */
  emitBindingAction([action, direction]: Binding): void {
    if (action === ControllerEvent.Move) {
      this.activeDirection[direction] = true
    }
    this.emit(action, direction)
  }

  /** Останавливает событие привязанное к кнопке/клику, например движение вперед. */
  stopBindingAction([action, direction]: Binding): void {
    if (action === ControllerEvent.Move) {
      delete this.activeDirection[direction]
      const activeDirection = Object.keys(this.activeDirection)
      if (!activeDirection.length) {
        this.emit(ControllerEvent.Stop)
      } else {
        this.emit(action, activeDirection[0])
      }
    }
  }
}
