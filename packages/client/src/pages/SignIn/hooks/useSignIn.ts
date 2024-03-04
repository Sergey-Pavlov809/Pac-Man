import { useEffect, useState } from 'react'
import yApiService from '../../../services/y-api-service'
import { LoginFromApi } from 'types/FormApi'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch'
import {
  fetchUserData,
  fetchYandexId,
  selectAuth,
} from 'store/modules/auth/reducer'
import { redirectUrl } from './constants'
import { useNavigate } from 'react-router-dom'
import { routes } from 'config/routes'

interface useSignIn {
  isLogin: boolean
  login: (values: LoginFromApi) => Promise<void>
  yandexOAuthUrl: string
}

const useSignIn = (): useSignIn => {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { yandexOAuthId } = useAppSelector(selectAuth)

  const yandexOAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yandexOAuthId}&redirect_uri=${redirectUrl}`

  const navigateToApp = (): void => {
    navigate(routes.app(), { replace: true })
  }

  const login = async (values: LoginFromApi): Promise<void> => {
    try {
      const response = await yApiService.login(values)
      dispatch(fetchUserData())
      setIsLogin(true)
      console.log('Result login', response)
      await checkUserAuth()
      navigateToApp()
    } catch (error) {
      console.log('Error login', error)
    }
  }

  useEffect(() => {
    dispatch(fetchYandexId())
  }, [dispatch])

  const checkUserAuth = async (): Promise<void> => {
    await yApiService.getUser()
    navigateToApp()
  }

  return {
    isLogin,
    login,
    yandexOAuthUrl,
  }
}

export default useSignIn
