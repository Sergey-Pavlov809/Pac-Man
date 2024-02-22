import { type Pos, type Size } from '../Entity/typings'
import { Color } from 'antd/es/color-picker'
import { SpriteCoordinatesNoAnimations } from '../../services/View/typings'

export type UIElementSettings = Pos &
  Size &
  Partial<{
    text: string
    align: CanvasTextAlign
    color: Color | string
    backImg: HTMLImageElement | HTMLCanvasElement
    backColor: Color | string
    mainSpriteCoordinates: SpriteCoordinatesNoAnimations
    indicatorName?: string
  }>
