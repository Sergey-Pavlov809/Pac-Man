import * as React from 'react'

import { useEffect, useRef } from 'react'
import { Flex } from 'antd'
import { Pacman } from '../../game'
import { ControllerElemsClassName } from '../../game/services/Controller/data'
import css from './Game.module.css'
import cn from 'classnames'
import { GameEvents } from '../../game/services/Game/data'
import { setScore } from 'store/modules/game/reducer'
import { useAppDispatch } from 'hooks'

type GameProps = {
  setFinishStatus: () => void
}

export const Game: React.FC<GameProps> = ({ setFinishStatus }) => {
  const gameRoot = useRef(null)
  const dispatch = useAppDispatch()

  const game = Pacman.create()

  useEffect(() => {
    game.init(gameRoot.current)

    game.on(GameEvents.UpdateLeaderboard, data => {
      dispatch(setScore(data.score))
      setFinishStatus()
    })

    return () => {
      game.unload()
    }
  }, [])

  return (
    <Flex
      style={{ minHeight: '100%' }}
      vertical
      justify="center"
      align="center"
      gap="middle"
      wrap="wrap">
      <div
        className={cn(
          ControllerElemsClassName.FullscreenWrapper,
          css.fullscreen
        )}>
        <div ref={gameRoot}></div>
      </div>
    </Flex>
  )
}
