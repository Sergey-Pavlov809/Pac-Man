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

import React from 'react'
import { routes } from 'config/routes'
import yApiService from 'services/y-api-service'

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />} errorElement={<ServerErrorPage />}>
        <Route path={routes.app()} element={<App />}></Route>
        <Route path={routes.profile()} element={<Profile />}></Route>
        <Route path={routes.main()} element={<Main />}></Route>
        <Route path={routes.game()} element={<GamePage />}></Route>
        <Route path={routes.leaderboard()} element={<LeaderBoard />}></Route>
        <Route path={routes.forum()} element={<Forum />}></Route>
        <Route path={routes.topic()} element={<Topic />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
      <Route
        element={<AppLayout disableHeader />}
        errorElement={<ServerErrorPage />}>
        <Route path={routes.signin()} element={<SignIn />}></Route>
        <Route path={routes.signup()} element={<SignUp />}></Route>
      </Route>
    </Routes>
  )
}
