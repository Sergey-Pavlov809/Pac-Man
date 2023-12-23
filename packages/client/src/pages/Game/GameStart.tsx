import * as React from 'react'
import { Button, Steps, Card } from 'antd'

import css from './Game.module.css'
import { GAME_RULES } from './const'

type GameStartProps = {
  setInProgressStatus: () => void
}

export const GameStart: React.FC<GameStartProps> = ({
  setInProgressStatus,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0)

  const handleNext = () => (): void => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => (): void => {
    setCurrentStep(currentStep - 1)
  }

  const handleReady = () => (): void => {
    setInProgressStatus()
    setCurrentStep(0)
  }

  const items = GAME_RULES.map(item => ({ key: item.title, title: item.title }))

  return (
    <section className={css.gameContainer}>
      <Steps current={currentStep} items={items} />
      <Card
        className={css.gameRules}
        actions={[
          ...(currentStep < GAME_RULES.length - 1
            ? [
                <Button key="next" type="primary" onClick={handleNext()}>
                  Далее
                </Button>,
              ]
            : []),
          ...(currentStep === GAME_RULES.length - 1
            ? [
                <Button key="start" type="primary" onClick={handleReady()}>
                  Начать игру
                </Button>,
              ]
            : []),
          ...(currentStep > 0
            ? [
                <Button key="prev" onClick={handlePrev()}>
                  Назад
                </Button>,
              ]
            : []),
        ]}>
        {GAME_RULES[currentStep].content}
      </Card>
    </section>
  )
}
