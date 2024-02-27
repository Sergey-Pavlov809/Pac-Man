import { ReactElement, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { FloatButton } from 'antd'
import {
  fetchTheme,
  getUserTheme,
  setUserTheme,
} from 'store/modules/theme/reducer'
import { getId } from 'store/modules/auth/reducer'
import { UserTheme } from 'types/FormApi'
import Cookies from 'js-cookie'

const getThemeCookie = (): UserTheme => {
  const theme = Cookies.get('theme')
  return theme === 'light' || theme === 'dark' ? theme : 'light'
}

const ThemeSwitchComponent = (): ReactElement => {
  const dispatch = useAppDispatch()
  const id = useAppSelector(getId)
  const userTheme = useAppSelector(getUserTheme)
  const cookieTheme = getThemeCookie()

  useEffect(() => {
    if (id) {
      dispatch(fetchTheme(id))
    } else if (cookieTheme) {
      dispatch(setUserTheme(cookieTheme))
    }
  }, [dispatch, id, cookieTheme])

  const toggleMode = (): void => {
    const newTheme = userTheme === 'dark' ? 'light' : 'dark'
    dispatch(setUserTheme(newTheme))

    if (id) {
      // Раскомментируйте эту строку и обработайте ошибки, если backendService доступен
      // backendService.updateUserTheme(id, newTheme).then().catch();
    } else {
      Cookies.set('theme', newTheme)
    }
  }

  return (
    <FloatButton
      onClick={toggleMode}
      type="primary"
      tooltip={<div>Сменить тему</div>}
    />
  )
}

export default ThemeSwitchComponent
