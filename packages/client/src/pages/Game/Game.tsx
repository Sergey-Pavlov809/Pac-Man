import * as React from 'react'

import { useGameinitialization } from './useGameinitialization'

import css from './Game.module.css'
import { Flex, Typography } from 'antd'
import { GAME_CONFIG } from './const'

export const Game: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const scoreRef = React.useRef<HTMLSpanElement>(null)
  const lifeRef = React.useRef<HTMLSpanElement>(null)

  const start = useGameinitialization({ canvasRef, scoreRef, lifeRef })

  React.useEffect(() => {
    start()
  }, [])

  return (
    <div className={css.root}>
      <div className={css.container}>
        <Flex justify="space-around">
          <Typography.Text style={{ color: 'white' }}>
            Очки: <span ref={scoreRef}>{GAME_CONFIG.totalScore}</span>
          </Typography.Text>
          <Typography.Text style={{ color: 'white' }}>
            Жизни:{' '}
            <span ref={lifeRef}>
              {GAME_CONFIG.heartImg.repeat(GAME_CONFIG.totalLife)}
            </span>
          </Typography.Text>
        </Flex>
      </div>
      <canvas ref={canvasRef} />
    </div>
  )
}
