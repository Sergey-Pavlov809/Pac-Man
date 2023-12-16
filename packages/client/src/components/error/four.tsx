import React, { SVGProps } from 'react'
const SvgComponent: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>,
) => (
  <svg
    viewBox="0 0 268 277"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g id="four">
      <path
        id="background1"
        d="M0 0H90V125H150V62H240V125H255V215H240V277H150V215H0V0Z"
        stroke="none"
        fill={props.color || '#FFC928'}
      />
      <rect
        id="background2"
        width={50}
        height={214}
        stroke="none"
        fill="rgba(1, 0, 3, 0.25)"
      />
      <path
        id="contur"
        d="M18 210V5H98V125V130H103H163H168V125V67H248V125V130H253H263V210H253H248V215V272H168V215V210H163H18Z"
        stroke={props.stroke || 'black'}
        strokeDasharray="150 10 20 10"
        strokeWidth={10}
      />
    </g>
  </svg>
)
export default SvgComponent
