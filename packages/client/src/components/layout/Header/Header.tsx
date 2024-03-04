import * as React from 'react'
import { Menu, Layout, MenuProps, theme } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { routes } from 'config/routes'
import { useAppSelector } from 'hooks'
import { selectIsAuthorized } from 'store/modules/auth/reducer'

const { Header: AntHeader } = Layout

const items = (isAuthorized: boolean): MenuProps['items'] => [
  {
    label: <Link to={routes.app()}>Главная</Link>,
    key: routes.app(),
  },

  {
    label: <Link to={routes.game()}>Играть</Link>,
    key: routes.game(),
  },
  {
    label: <Link to={routes.forum()}>Форум</Link>,
    key: routes.forum(),
  },
  {
    label: <Link to={routes.leaderboard()}>Таблица лидеров</Link>,
    key: routes.leaderboard(),
  },
  ...(isAuthorized
    ? [
        {
          label: <Link to={routes.profile()}>Профиль</Link>,
          key: routes.profile(),
        },
      ]
    : [
        {
          label: <Link to={routes.signin()}>Войти</Link>,
          key: routes.signin(),
        },
        {
          label: <Link to={routes.signup()}>Регистрация</Link>,
          key: routes.signup(),
        },
      ]),
]

export const Header: React.FC = () => {
  const location = useLocation()
  const { token } = theme.useToken()
  const isAuthorized = useAppSelector(selectIsAuthorized)

  return (
    <AntHeader style={{ backgroundColor: token.colorBgContainer }}>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        items={items(isAuthorized)}
      />
    </AntHeader>
  )
}
