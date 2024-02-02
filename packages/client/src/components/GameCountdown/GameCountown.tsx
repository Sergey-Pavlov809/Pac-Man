import * as React from 'react'
import { Flex, Progress, Typography } from 'antd'

type GameCountDownType = {
  percent: number
  totalPercent: number
  maxPercent: number
}

export const GameCountDown: React.FC<GameCountDownType> = ({
  percent: innerPercent,
  totalPercent,
  maxPercent,
}) => (
  <Flex
    vertical
    gap={6}
    align="center"
    justify="center"
    style={{ height: '100%' }}>
    <Typography.Title style={{ color: 'white' }}>
      Игра начнется через
    </Typography.Title>
    <Progress
      type="circle"
      percent={Math.ceil((innerPercent / totalPercent) * maxPercent)}
      format={(percent): React.ReactNode => {
        if (percent) {
          return `${Math.ceil((percent / maxPercent) * totalPercent)}`
        }
      }}
    />
  </Flex>
)
