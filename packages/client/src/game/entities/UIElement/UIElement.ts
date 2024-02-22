import { Entity } from '../Entity/Entity'
import { EntityEvent } from '../Entity/typings'
import { UIElementSettings } from './typings'

export class UIElement extends Entity {
  text = ''
  align: CanvasTextAlign = 'left'
  spawned = true

  constructor(props: UIElementSettings) {
    super(props)
    Object.assign(this, props)
  }

  setState(newState: Partial<Entity>): void {
    if (this.text) {
      Object.assign(this, newState)
      this.emit(EntityEvent.ShouldRenderText, newState)
    } else {
      super.setState(newState)
    }
  }

  render(text: string | undefined): void {
    const newState = { posX: this.posX, posY: this.posY }

    if (text) {
      this.text = text
    }

    if (this.text) {
      this.emit(EntityEvent.ShouldRenderText, newState)
    } else {
      this.emit(EntityEvent.ShouldUpdate, newState)
      this.emit(EntityEvent.DidUpdate, newState)
    }
  }
}
