import React from 'react'
import { useRouteError } from 'react-router-dom'
import ghost from '../../assets/images/ghost.svg'
import Four from '../../assets/images/four.svg'
import Five from '../../assets/images/five.svg'
import Zero from '../../assets/images/zero.svg'

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
  const error = useRouteError()
  const errorFromRouter = error ? String(error) : 'Произошла неизвестная ошибка'
  const firstDigit = type === '404' ? Four : Five
  const secondDigit = type === '404' ? Four : Zero
  const { token } = theme.useToken()

  return (
    <Flex
      style={{ minHeight: '100%' }}
      gap="middle"
      align="center"
      justify="center"
      vertical>
      <Flex align="center" justify="center">
        <img
          src={firstDigit}
          alt="4"
          width="268"
          height="277"
          style={{ marginRight: '-35px', marginLeft: '35px', zIndex: 1 }}
        />
        <object
          data={ghost}
          type="image/svg+xml"
          width="304"
          height="347"
          style={{ marginLeft: '-35px', zIndex: 2 }}
        />
        <img
          src={secondDigit}
          alt="4"
          width="268"
          height="277"
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
