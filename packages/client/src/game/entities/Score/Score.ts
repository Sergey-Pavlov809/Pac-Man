import { Color } from '../../services/View/colors'
import { type ScoreVariant } from './typings'
import { ScoreType } from './data'
import { UIElement } from '../UIElement/UIElement'
import { UIElementSettings } from '../UIElement/typings'

export class Score extends UIElement {
  variant: ScoreVariant = ScoreType.Score1

  constructor(props: UIElementSettings) {
    super(props)
    Object.assign(this, props)

    this.color = Color.White
    this.text = '0'
    this.width *= 2

    this.registerScoreEvents()
  }

  registerScoreEvents(): void {
    // Регистрация событий
  }
}
