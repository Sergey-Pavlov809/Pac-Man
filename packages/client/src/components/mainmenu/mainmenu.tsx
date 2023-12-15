import React from 'react'
import { MenuProps, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router'

const items: MenuProps['items'] = [
  {
    label: 'Главная',
    key: 'home',
  },
  {
    label: 'Регистрация',
    key: 'sign-up',
  },
  {
    label: 'Профиль',
    key: 'profile',
  },
  {
    label: 'Главная',
    key: 'main',
  },
  {
    label: 'Игра',
    key: 'game',
  },
  {
    label: 'Лидеры',
    key: 'leaderboard',
  },
  {
    label: 'Чат',
    key: 'chat',
  },
  {
    label: 'Тема',
    key: 'topic',
  },
  {
    label: '404',
    key: '404',
  },
]

/**
 * TODO: Temporary menu sketch for convenience
 * @constructor
 */
const MainMenu: React.FC = () => {
  let { pathname } = useLocation()
  pathname = pathname.replace('/', '')
  pathname = pathname || 'home'
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = e => {
    e.key === 'home' ? navigate('/') : navigate(`/${e.key}`)
  }

  return (
    <Menu
      style={{ flex: 1, minWidth: 0 }}
      theme="dark"
      onClick={onClick}
      selectedKeys={[pathname]}
      mode="horizontal"
      items={items}
    />
  )
}

export default MainMenu
