import * as React from 'react'
import { Menu, Layout, MenuProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { routes } from 'config/routes'
import { isAuthenticated } from 'pages/Profile/utils'

const { Header: AntHeader } = Layout

const items: MenuProps['items'] = [
  {
    label: <Link to={routes.main()}>Главная</Link>,
    key: routes.main(),
  },
  ...(isAuthenticated
    ? [
        {
          label: <Link to={routes.profile()}>Профиль</Link>,
          key: routes.profile(),
        },
      ]
    : []),
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
  {
    label: <Link to={routes.signin()}>Войти</Link>,
    key: routes.signin(),
  },
  {
    label: <Link to={routes.signup()}>Регистрация</Link>,
    key: routes.signup(),
  },
]

export const Header: React.FC = () => {
  const location = useLocation()
  return (
    <AntHeader style={{ backgroundColor: 'white' }}>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        items={items}
      />
    </AntHeader>
  )
}
