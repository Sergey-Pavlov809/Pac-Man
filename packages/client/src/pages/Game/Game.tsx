import * as React from 'react'

import { useGameinitialization } from './useGameinitialization'

import css from './Game.module.css'

export const Game: React.FC = () => {
  const ref = React.useRef<HTMLCanvasElement>(null)

  useGameinitialization(ref)

  return (
    <div className={css.root}>
      <canvas ref={ref} />
    </div>
  )
}
