import React from 'react'
import GhostSvg from './GhostSvg'
import FourSvg from './FourSvg'
import ZeroSvg from './ZeroSvg'
import FiveSvg from './FiveSvg'

import { Typography, Flex, Divider, theme, ConfigProvider } from 'antd'

const { Title } = Typography

type ErrorProps = {
  type: '404' | '500'
  message?: string
}

export const ErrorComponent: React.FC<ErrorProps> = ({
  type,
  message,
}: ErrorProps) => {
  const FirstDigit = type === '404' ? FourSvg : FiveSvg
  const SecondDigit = type === '404' ? FourSvg : ZeroSvg

  const defaultMessage =
    type === '404' ? 'Страница не найдена' : 'Произошла неизвестная ошибка'
  const { token } = theme.useToken()

  return (
    <Flex
      style={{ minHeight: '100%' }}
      gap="middle"
      align="center"
      justify="center"
      vertical>
      <Flex align="center" justify="center">
        <FirstDigit
          width={268}
          height={277}
          color={type === '404' ? token.yellow4 : token.gold4}
          stroke={token.colorTextBase}
          style={{ marginRight: '-35px', zIndex: 1 }}
        />
        <GhostSvg
          width={304}
          height={347}
          color={type === '404' ? token.blue3 : token.green3}
          stroke={token.colorTextBase}
          style={{ zIndex: 2 }}
        />
        <SecondDigit
          width={268}
          height={277}
          color={type === '404' ? token.yellow4 : token.gold4}
          stroke={token.colorTextBase}
          style={{ marginLeft: '-35px', zIndex: 1 }}
        />
      </Flex>
      <ConfigProvider
        theme={{
          token: {
            colorSplit: token.colorBgSpotlight,
          },
        }}>
        <Divider
          style={{
            width: '240px',
            minWidth: '240px',
            borderWidth: '10px',
            marginTop: '0',
          }}
          dashed
        />
      </ConfigProvider>
      <Title style={{ marginTop: 20 }}>OOOOOPS!!</Title>
      <Title level={2} type="danger" style={{ marginTop: 40 }}>
        {message || defaultMessage}
      </Title>
    </Flex>
  )
}
