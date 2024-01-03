import React, { SVGProps } from 'react'

const GhostSvg: React.FC<SVGProps<SVGSVGElement>> = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    viewBox="0 0 304 347"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g id="Ghost" clipPath="url(#clip0_1714_207)">
      <path
        id="Vector"
        d="M288 169C288 145 278 4 144 4 11 4 0 145 0 169V333L44 290 87 333H101L144 290 188 333H201L245 290 288 333V169Z"
        stroke="none"
        fill={props.color || '#42A5F6'}
      />
      <path
        id="Vector_2"
        d="M38 295 0 333V169C0 145 11 4 144 4 151 4 157 4 163 5 47 18 38 146 38 169V295Z"
        stroke="none"
        fill="rgba(1, 0, 3, 0.25)"
      />
      <path
        id="Vector_3"
        d="M299 170C299 146 289 5 155 5 22 5 11 146 11 170V334L55 291 98 334H112L155 291 199 334H212L256 291 299 334V170Z"
        stroke={props.stroke || 'black'}
        strokeWidth={10}
      />
      <g id="Eye">
        <mask
          id="mask0_1714_207"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={71}
          y={104}
          width={197}
          height={80}>
          <g
            id="EyeMask"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center center',
            }}>
            <path
              id="Vector_4"
              d="M228 184C250 184 268 166 268 144 268 122 250 104 228 104 206 104 188 122 188 144 188 166 206 184 228 184Z"
              stroke="none"
              fill="white"
            />
            <path
              id="Vector_5"
              d="M111 184C133 184 151 166 151 144 151 122 133 104 111 104 89 104 71 122 71 144 71 166 89 184 111 184Z"
              stroke="none"
              fill="white"
            />
          </g>
        </mask>
        <g mask="url(#mask0_1714_207)">
          <g id="EyeGroup">
            <g id="EyeWhite">
              <path
                id="Vector_6"
                d="M111 184C133 184 151 166 151 144 151 122 133 104 111 104 89 104 71 122 71 144 71 166 89 184 111 184Z"
                stroke="none"
                fill="white"
              />
              <path
                id="Vector_7"
                d="M228 184C250 184 268 166 268 144 268 122 250 104 228 104 206 104 188 122 188 144 188 166 206 184 228 184Z"
                stroke="none"
                fill="white"
              />
            </g>
            <g id="EyeApple">
              <path
                id="Vector_8"
                d="M234 158C242 158 248 152 248 144 248 136 242 130 234 130 226 130 220 136 220 144 220 152 226 158 234 158Z"
                stroke="none"
                fill="black"
              />
              <path
                id="Vector_9"
                d="M117 158C125 158 131 152 131 144 131 136 125 130 117 130 109 130 103 136 103 144 103 152 109 158 117 158Z"
                stroke="none"
                fill="black"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1714_207">
        <rect width={304} height={347} fill="white" />
      </clipPath>
    </defs>
    <animate
      attributeName="opacity"
      values="1; 0.8; 1"
      dur="5s"
      repeatCount="indefinite"
    />
    <animateTransform
      href="#Ghost"
      attributeName="transform"
      type="translate"
      values="0,0; 0,10; 0,0"
      dur="2s"
      repeatCount="indefinite"
    />
    <animateTransform
      href="#EyeApple"
      attributeName="transform"
      type="translate"
      values="0,0; -20,0; 0,0"
      dur="3s"
      repeatCount="indefinite"
    />
    <animateTransform
      id="closeEye"
      href="#EyeMask"
      attributeName="transform"
      type="scale"
      values="1,1; 1,0; 1,1; 1,0; 1,1; 1,1"
      keyTimes="0; 0.05; 0.1; 0.15; 0.2; 1"
      dur="5s"
      repeatCount="indefinite"
    />
  </svg>
)
export default GhostSvg
