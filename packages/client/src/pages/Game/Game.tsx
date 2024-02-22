import * as React from 'react'

import { useEffect, useRef } from 'react'
import { Flex } from 'antd'
import { Pacman } from '../../game'
import { ControllerElemsClassName } from '../../game/services/Controller/data'
import css from './Game.module.css'
import cn from 'classnames'

export const Game: React.FC = () => {
  const gameRoot = useRef(null)

  const game = Pacman.create()

  useEffect(() => {
    game.init(gameRoot.current)

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
