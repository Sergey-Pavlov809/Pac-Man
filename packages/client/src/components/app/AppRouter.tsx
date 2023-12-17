import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { ErrorComponent } from '../error/ErrorComponent'
import Root from '../root/Root'
import NotFoundPage from '../../pages/404/404'
import type { Router as RemixRouter } from '@remix-run/router/dist/router'
import Registration from '../../pages/registration/Registration'
import ServerErrorPage from '../../pages/500/500'

/**
 * The function returns routers
 * @constructor
 */
export const AppRouter = (): RemixRouter => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />} errorElement={<ErrorComponent type="500" />}>
        <Route
          path="/"
          element={
            <div className="App">Вот тут будет жить ваше приложение :)</div>
          }
        />
        <Route path="/sign-up" element={<div>/sign-up</div>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<div>/profile</div>} />
        <Route path="/main" element={<div>/main</div>} />
        <Route path="/game" element={<div>/game</div>} />
        <Route path="/leaderboard" element={<div>/leaderboard</div>} />
        <Route path="/chat" element={<div>/chat</div>} />
        <Route path="/topic" element={<div>/topic</div>} />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/500" element={<ServerErrorPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )
}
