import pipeHorizontal from '../../assets/mapElements/pipeHorizontal.png'
import pipeVertical from '../../assets/mapElements/pipeVertical.png'
import pipeCorner1 from '../../assets/mapElements/pipeCorner1.png'
import pipeCorner2 from '../../assets/mapElements/pipeCorner2.png'
import pipeCorner3 from '../../assets/mapElements/pipeCorner3.png'
import pipeCorner4 from '../../assets/mapElements/pipeCorner4.png'
import block from '../../assets/mapElements/block.png'
import capLeft from '../../assets/mapElements/capLeft.png'
import capRight from '../../assets/mapElements/capRight.png'
import capBottom from '../../assets/mapElements/capBottom.png'
import capTop from '../../assets/mapElements/capTop.png'
import pipeCross from '../../assets/mapElements/pipeCross.png'
import pipeConnectorTop from '../../assets/mapElements/pipeConnectorTop.png'
import pipeConnectorRight from '../../assets/mapElements/pipeConnectorRight.png'
import pipeConnectorBottom from '../../assets/mapElements/pipeConnectorBottom.png'
import pipeConnectorLeft from '../../assets/mapElements/pipeConnectorLeft.png'

export const map: string[][] = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3'],
]

export const mapElements: Record<string, string> = {
  '-': pipeHorizontal,
  '|': pipeVertical,
  '1': pipeCorner1,
  '2': pipeCorner2,
  '3': pipeCorner3,
  '4': pipeCorner4,
  b: block,
  '[': capLeft,
  ']': capRight,
  _: capBottom,
  '^': capTop,
  '+': pipeCross,
  '5': pipeConnectorTop,
  '6': pipeConnectorRight,
  '7': pipeConnectorBottom,
  '8': pipeConnectorLeft,
}
