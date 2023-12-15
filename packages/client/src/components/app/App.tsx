import { useEffect, useState } from 'react'
import { ConfigProvider, FloatButton, theme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './AppRouter'

function App(): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const router = AppRouter()

  useEffect(() => {
    const fetchServerData = async (): Promise<void> => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: !isDarkTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}>
      <RouterProvider router={router} />

      {/* TODO: Temporary button to change the theme to light/dark */}
      <FloatButton
        tooltip={`Переключиться на ${isDarkTheme ? 'светлую' : 'темную'} тему`}
        onClick={(): void => setIsDarkTheme(prev => !prev)}
      />
    </ConfigProvider>
  )
}

export default App
