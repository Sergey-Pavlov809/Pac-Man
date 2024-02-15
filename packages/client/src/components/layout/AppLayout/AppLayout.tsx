import * as React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router'

import { Footer, Header } from '..'
import css from './AppLayout.module.css'
import ThemeSwitchComponent from 'components/theme-switcher/ThemeSwitchComponent'

type AppLayoutProps = {
  disableHeader?: boolean
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  disableHeader = false,
}): JSX.Element => (
  <Layout className={css.root}>
    {disableHeader ? null : <Header />}
    <Layout.Content className={css.content}>
      <Outlet />
    </Layout.Content>
    <Footer />
    <ThemeSwitchComponent />
  </Layout>
)
