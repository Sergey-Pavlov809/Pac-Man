import { Direction } from '../../entities/Entity/typings'
import { ControllerElemsClassName, ControllerEvent } from './data'

export type Binding =
  | [ControllerEvent.Move, Direction]
  | [ControllerEvent.Pause]
  | [ControllerEvent.Mute]
  | [ControllerEvent.Fullscreen]
  | [ControllerEvent.Escape]

export type BindingConfig = Record<string, Binding>

const KeyBindingsGeneral: BindingConfig = {
  KeyP: [ControllerEvent.Pause],
  KeyM: [ControllerEvent.Mute],
  Minus: [ControllerEvent.Mute],
  KeyF: [ControllerEvent.Fullscreen],
  Equal: [ControllerEvent.Fullscreen],
  Backquote: [ControllerEvent.Fullscreen],
  Escape: [ControllerEvent.Escape],
}

export const KeyBindingsWasd: BindingConfig = {
  KeyW: [ControllerEvent.Move, Direction.Up],
  KeyA: [ControllerEvent.Move, Direction.Left],
  KeyS: [ControllerEvent.Move, Direction.Down],
  KeyD: [ControllerEvent.Move, Direction.Right],
  ...KeyBindingsGeneral,
}

export const KeyBindingsArrows: BindingConfig = {
  ArrowUp: [ControllerEvent.Move, Direction.Up],
  ArrowLeft: [ControllerEvent.Move, Direction.Left],
  ArrowDown: [ControllerEvent.Move, Direction.Down],
  ArrowRight: [ControllerEvent.Move, Direction.Right],
  ...KeyBindingsGeneral,
}

export const PointerBindings: BindingConfig = {
  [ControllerElemsClassName.MoveUpBtn]: [ControllerEvent.Move, Direction.Up],
  [ControllerElemsClassName.MoveRightBtn]: [
    ControllerEvent.Move,
    Direction.Right,
  ],
  [ControllerElemsClassName.MoveLeftBtn]: [
    ControllerEvent.Move,
    Direction.Left,
  ],
  [ControllerElemsClassName.MoveDownBtn]: [
    ControllerEvent.Move,
    Direction.Down,
  ],
  [ControllerElemsClassName.PauseBtn]: [ControllerEvent.Pause],
  [ControllerElemsClassName.MuteBtn]: [ControllerEvent.Mute],
  [ControllerElemsClassName.FullscreenBtn]: [ControllerEvent.Fullscreen],
}
