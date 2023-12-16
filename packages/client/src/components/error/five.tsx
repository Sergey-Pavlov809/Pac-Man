import * as React from 'react'
import { SVGProps } from 'react'
const FiveSvg: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>,
) => (
  <svg
    viewBox="0 0 268 277"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g id="five">
      <path
        id="background1"
        d="M255 0H0V165H150V217H89V210H0V277H255V105H89V60H255V0Z"
        stroke="none"
        fill={props.color || '#FFC928'}
      />
      <rect
        id="background2"
        width={50}
        height={163}
        stroke="none"
        fill="rgba(1, 0, 3, 0.25)"
      />
      <rect
        id="background3"
        y={211}
        width={50}
        height={66}
        stroke="none"
        fill="rgba(1, 0, 3, 0.25)"
      />
      <path
        id="contur"
        d="M163 160H18V5H263V55H102H97V60V105V110H102H263V272H18V215H97V217V222H102H163H168V217V165V160H163Z"
        stroke={props.stroke || 'black'}
        strokeWidth={10}
        strokeDasharray="150 10 20 10"
      />
    </g>
  </svg>
)
export default FiveSvg
