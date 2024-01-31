import * as React from 'react'

import { useEffect, useRef } from 'react'
import { Flex } from 'antd'
import { Pacman } from '../../game'

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
      <div ref={gameRoot}></div>
    </Flex>
  )
}
