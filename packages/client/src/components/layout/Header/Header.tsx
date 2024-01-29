import * as React from 'react'
import { Menu, Layout, MenuProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { Paths } from 'config/constants'
import { isAuthenticated } from 'pages/Profile/utils'

const { Header: AntHeader } = Layout

const items: MenuProps['items'] = [
  {
    label: <Link to={Paths.Main}>Главная</Link>,
    key: Paths.Main,
  },
  ...(isAuthenticated
    ? [
        {
          label: <Link to={Paths.Profile}>Профиль</Link>,
          key: Paths.Profile,
        },
      ]
    : []),
  {
    label: <Link to={Paths.Game}>Играть</Link>,
    key: Paths.Game,
  },
  {
    label: <Link to={Paths.Forum}>Форум</Link>,
    key: Paths.Forum,
  },
  {
    label: <Link to={Paths.Leaderboard}>Таблица лидеров</Link>,
    key: Paths.Leaderboard,
  },
  {
    label: <Link to={Paths.SignIn}>Войти</Link>,
    key: Paths.SignIn,
  },
  {
    label: <Link to={Paths.SignUp}>Регистрация</Link>,
    key: Paths.SignUp,
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
