import React from 'react'
import { useRouteError } from 'react-router-dom'
import GhostSvg from './ghostSvg'
import FourSvg from './four'
import ZeroSvg from './zero'
import FiveSvg from './five'

import { Typography, Flex, Divider, theme, ConfigProvider } from 'antd'

const { Title } = Typography

declare type ErrorProps = {
  type: '404' | '500'
  message?: string
}

/**
 * Error output component
 * @param type {'404'|'500'} - error type
 * @param message {string} - error message
 * @constructor
 */
export const ErrorComponent: React.FC<ErrorProps> = ({
  type,
  message,
}: ErrorProps) => {
  const FirstDigit = type === '404' ? FourSvg : FiveSvg
  const SecondDigit = type === '404' ? FourSvg : ZeroSvg

  const error = useRouteError()
  const errorFromRouter = error ? String(error) : 'Произошла неизвестная ошибка'
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
          color={token.yellow4}
          stroke={token.colorTextBase}
          style={{ marginRight: '-35px', zIndex: 1 }}
        />
        <GhostSvg
          width={304}
          height={347}
          color={token.blue3}
          stroke={token.colorTextBase}
          style={{ zIndex: 2 }}
        />
        <SecondDigit
          width={268}
          height={277}
          color={token.yellow4}
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
        {message || errorFromRouter}
      </Title>
    </Flex>
  )
}
