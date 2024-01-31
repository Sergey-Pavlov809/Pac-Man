import { EventEmitter } from '../EventEmitter/EventEmitter'
import { ControllerEvent } from './data'
import { type ControlEvent, type Controller } from './typings'
import { type Fn } from '../EventEmitter/typings'

export class ControllerManager
  extends EventEmitter<ControllerEvent>
  implements Controller
{
  /** Хранит контроллеры, методы которых вызываются при срабатывании событий. */
  controllersList: Controller[] = []

  constructor(controllers: Controller[]) {
    super()
    this.controllersList = controllers
  }

  on(eventName: ControllerEvent, callback: Fn): this {
    super.on(eventName, callback)

    this.controllersList.forEach(controller => {
      controller.on(eventName, callback)
    })

    return this
  }

  emit<K extends unknown[]>(eventName: ControllerEvent, ...args: K): void {
    super.emit(eventName, ...args)

    this.controllersList.forEach(controller => {
      controller.emit(eventName, ...args)
    })
  }

  off(eventName: ControllerEvent, callback: Fn): this {
    super.off(eventName, callback)

    this.controllersList.forEach(controller => {
      controller.off(eventName, callback)
    })

    return this
  }

  offAll(eventName: ControllerEvent): this {
    super.offAll(eventName)

    this.controllersList.forEach(controller => {
      controller.offAll(eventName)
    })

    return this
  }

  clearAllListeners(): void {
    super.clearAllListeners()

    this.controllersList.forEach(controller => {
      controller.clearAllListeners()
    })
  }

  load(): void {
    this.controllersList.forEach(controller => controller.load())
  }

  unload(): void {
    this.controllersList.forEach(controller => controller.unload())
  }

  reset(): this {
    this.controllersList.forEach(controller => controller.reset())
    return this
  }

  startControlByEvent(event: ControlEvent): void {
    this.controllersList.forEach(controller =>
      controller.startControlByEvent(event)
    )
  }

  stopControlByEvent(event: ControlEvent): void {
    this.controllersList.forEach(controller =>
      controller.stopControlByEvent(event)
    )
  }

  /** Останавливает все действия принудительно. */
  stopControlForce(): void {
    this.controllersList.forEach(controller => {
      if (controller.stopControlForce) {
        controller.stopControlForce()
      }
    })
  }
}
