import * as React from 'react'
import { Flex, Typography } from 'antd'
import { GameCountDown } from '../../components'
import { useGameCountDown } from '../../hooks'

import { useGameinitialization } from './useGameinitialization'
import { GAME_CONFIG } from './const'

import css from './Game.module.css'

type GameProps = {
  setFinishStatus: () => void
}

export const Game: React.FC<GameProps> = ({ setFinishStatus }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const scoreRef = React.useRef<HTMLSpanElement>(null)
  const lifeRef = React.useRef<HTMLSpanElement>(null)

  const start = useGameinitialization(
    { canvasRef, scoreRef, lifeRef },
    setFinishStatus
  )

  const [secondsLeft] = useGameCountDown({
    start: GAME_CONFIG.countdown_seconds_start,
    end: GAME_CONFIG.countdown_seconds_end,
    onEnd: start,
  })

  return (
    <div className={css.root}>
      {secondsLeft === GAME_CONFIG.countdown_seconds_end ? (
        <>
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
        </>
      ) : (
        <GameCountDown
          percent={secondsLeft}
          totalPercent={GAME_CONFIG.countdown_seconds_start}
          maxPercent={GAME_CONFIG.countdown_max_percent}
        />
      )}
    </div>
  )
}
