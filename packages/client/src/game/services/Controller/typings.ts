import { type EventEmitter } from '../EventEmitter/EventEmitter'
import { type Direction } from '../../entities/Entity/typings'
import { type Binding, type BindingConfig } from './KeyBindings'

export type Controller = EventEmitter & {
  activeDirection?: Partial<Record<Direction, boolean>>
  load: () => void
  unload: () => void
  reset: () => Controller
  registerEvents?: () => void
  disableEvents?: () => void
  emitBindingAction?: (binding: Binding) => void
  stopBindingAction?: (binding: Binding) => void
  startControlByEvent: (event: ControlEvent) => void
  stopControlByEvent: (event: ControlEvent) => void
  stopControlForce?: () => void
  changeJoystickType?: () => void
}

export type ControlEvent = MouseEvent | KeyboardEvent | TouchEvent

export type ControllerPointerProps = {
  pointerBindings: BindingConfig
  type: 'touchscreen' | 'mouse'
}
