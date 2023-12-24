import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Main, Profile, Game } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import { routes } from './routes'
import 'antd/dist/reset.css'
import './index.css'
import { RootBoundary } from './components/RootBoundary'

const router = createBrowserRouter([
  {
    path: routes.app(),
    element: <App />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: routes.signup(),
    element: <div>/sign-up</div>,
  },
  {
    path: routes.profile(),
    element: <Profile />,
  },
  {
    path: routes.main(),
    element: <Main />,
  },
  {
    path: routes.game(),
    element: <Game />,
  },
  {
    path: routes.leaderboard(),
    element: <div>/leaderboard</div>,
  },
  {
    path: routes.forum(),
    element: <div>/chat</div>,
  },
  {
    path: routes.topic(),
    element: <div>/topic</div>,
  },
  {
    path: '*',
    element: <div>*</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<RootBoundary />} />
  </React.StrictMode>
)
