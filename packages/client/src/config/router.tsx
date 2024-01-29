import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '../components'
import {
  Main,
  Profile,
  GamePage,
  SignUp,
  SignIn,
  LeaderBoard,
  Forum,
  Topic,
  NotFoundPage,
  ServerErrorPage,
} from '../pages'
import App from '../App'

import { Paths } from './constants'
import React from 'react'

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />} errorElement={<ServerErrorPage />}>
        <Route path={Paths.App} element={<App />}></Route>
        <Route path={Paths.Profile} element={<Profile />}></Route>
        <Route path={Paths.Main} element={<Main />}></Route>
        <Route path={Paths.Game} element={<GamePage />}></Route>
        <Route path={Paths.Leaderboard} element={<LeaderBoard />}></Route>
        <Route path={Paths.Forum} element={<Forum />}></Route>
        <Route path={Paths.Topic} element={<Topic />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
      <Route
        element={<AppLayout disableHeader />}
        errorElement={<ServerErrorPage />}>
        <Route path={Paths.SignIn} element={<SignIn />}></Route>
        <Route path={Paths.SignUp} element={<SignUp />}></Route>
      </Route>
    </Routes>
  )
}
