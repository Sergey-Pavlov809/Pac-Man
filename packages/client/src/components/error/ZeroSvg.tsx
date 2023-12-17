import { SVGProps } from 'react'

const ZeroSvg: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    viewBox="0 0 268 277"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g id="zero">
      <path
        id="background1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M255 0H0V277H255V0ZM154 62H90V214H154V62Z"
        stroke="none"
        fill={props.color || '#FFC928'}
      />
      <rect
        id="background2"
        width={50}
        height={277}
        stroke="none"
        fill="rgba(1, 0, 3, 0.25)"
      />
      <path
        id="contur"
        d="M103 57H98V62V214V219H103H167H172V214V62V57H167H103ZM18 5H263V272H18V5Z"
        stroke={props.stroke || 'black'}
        strokeDasharray="150 10 20 10"
        strokeWidth={10}
      />
    </g>
  </svg>
)
export default ZeroSvg
