import { Outlet } from 'react-router'
import { Layout } from 'antd'
import MainMenu from '../mainmenu/mainmenu'

const { Header, Content, Footer } = Layout

/**
 * TODO: Sketch of the main layout for convenience
 * @param children
 * @constructor
 */
const Root = ({ children }: { children?: JSX.Element }): JSX.Element => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <MainMenu />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'center',
        }}>
        {children || <Outlet />}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Pac Man ©2023 Created by Crimson Mavericks
      </Footer>
    </Layout>
  )
}

export default Root
