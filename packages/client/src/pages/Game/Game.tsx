import * as React from 'react'

import { useGameinitialization } from './useGameinitialization'

import css from './Game.module.css'

export const Game: React.FC = () => {
  const convasRef = React.useRef<HTMLCanvasElement>(null)
  const scoreRef = React.useRef<HTMLCanvasElement>(null)

  useGameinitialization(convasRef, scoreRef)

  return (
    <div className={css.root}>
      <div className={css.score}>
        score: <span ref={scoreRef}>0</span>{' '}
      </div>
      <canvas ref={convasRef} />
    </div>
  )
}
