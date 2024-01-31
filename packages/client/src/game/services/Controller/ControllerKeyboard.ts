import { ControllerBase } from './ControllerBase'
import { type Binding, BindingConfig } from './KeyBindings'
import { type ControlEvent } from './typings'

export class ControllerKeyboard extends ControllerBase {
  /** Кнопки клавиатуры зарезервированные для управления игрой.  */
  keyBindings: BindingConfig

  constructor(keyBindings: BindingConfig) {
    super()
    this.keyBindings = keyBindings
  }

  registerEvents(): void {
    document.addEventListener('keydown', this.startControlByEvent)
    document.addEventListener('keyup', this.stopControlByEvent)
  }

  disableEvents(): void {
    document.removeEventListener('keydown', this.startControlByEvent)
    document.removeEventListener('keyup', this.stopControlByEvent)
  }

  // Реагирует на keydown событие
  startControlByEvent = (event: ControlEvent): boolean | undefined => {
    if (!(event instanceof KeyboardEvent) || event.repeat) {
      return false
    }
    const keyBinding = this.getKeyBinding(event.code)
    if (keyBinding) {
      this.emitBindingAction(keyBinding)
      this.preventDefaultEvent(event)
    }
  }

  // Реагирует на keyup событие
  stopControlByEvent = (event: ControlEvent): boolean | undefined => {
    if (!(event instanceof KeyboardEvent)) {
      return false
    }

    const keyBinding = this.getKeyBinding(event.code)
    if (keyBinding) {
      this.stopBindingAction(keyBinding)
      this.preventDefaultEvent(event)
    }
  }

  preventDefaultEvent(event: ControlEvent): void {
    if (
      event instanceof KeyboardEvent &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault()
    }
  }

  getKeyBinding(code: string): Binding {
    return this.keyBindings[code] || null
  }
}
