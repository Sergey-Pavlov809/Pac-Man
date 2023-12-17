import { Outlet } from 'react-router'
import { Layout } from 'antd'
import MainMenu from '../mainmenu/MainMenu'

const { Header, Content, Footer } = Layout

/**
 * TODO: Sketch of the main layout for convenience
 * @param children
 * @constructor
 */
const Root = ({ children }: { children?: JSX.Element }): JSX.Element => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <div className="demo-logo" />
        <MainMenu />
      </Header>
      <Content
        style={{
          padding: '10px 48px',
        }}>
        {children || <Outlet />}
      </Content>
      <Footer
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        Pac Man ©2023 Created by Crimson Mavericks
      </Footer>
    </Layout>
  )
}

export default Root
