import * as React from 'react'
import { Button, Typography, Card } from 'antd'
import { useBrowserNotification } from '../../hooks'

import css from './Game.module.css'

type GameStartProps = {
  setIdleStatus: () => void
  setInProgressStatus: () => void
}

export const GameFinish: React.FC<GameStartProps> = ({
  setInProgressStatus,
  setIdleStatus,
}) => {
  const notificationCb = React.useCallback((event: Event) => {
    event.preventDefault()
    window.open('https://pacman.com/en/', '_blank')
  }, [])

  const { notify } = useBrowserNotification(
    'Интересно узнать про оригинальную игру?',
    {
      click: notificationCb,
      body: 'Нажмите, чтобы перейти на официальный сайт игры',
    }
  )
  const handleTryAgain = (): void => {
    setInProgressStatus()
  }

  const handleOpenRules = (): void => {
    notify()
    setIdleStatus()
  }

  return (
    <section className={css.gameContainer}>
      <Card
        className={css.gameRules}
        actions={[
          <Button type="primary" key="again" onClick={handleTryAgain}>
            Попробовать ещё
          </Button>,
          <Button key="rules" onClick={handleOpenRules}>
            Прочитать правила
          </Button>,
        ]}>
        <Typography.Title level={3}>Игра завершена</Typography.Title>
        <Typography.Paragraph>
          Всего вы заработали [количество_очков] очков.
        </Typography.Paragraph>
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          Попробовать ещё раз?
        </Typography.Paragraph>
      </Card>
    </section>
  )
}
