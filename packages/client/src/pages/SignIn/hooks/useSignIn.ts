import { useEffect, useState } from 'react'
import yApiService from '../../../services/y-api-service'
import { LoginFromApi } from '../../../types/FormApi'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch'
import {
  fetchUserData,
  fetchYandexId,
  selectAuth,
} from '../../../store/modules/auth/reducer'

interface useSignIn {
  isLogin: boolean
  login: (values: LoginFromApi) => Promise<void>
  yandexOAuthUrl: string
}

const useSignIn = (): useSignIn => {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useAppDispatch()

  const { yandexOAuthId } = useAppSelector(selectAuth)

  const yandexOAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yandexOAuthId}&redirect_uri=http://localhost:3000`

  const login = async (values: LoginFromApi): Promise<void> => {
    try {
      const response = await yApiService.login(values)
      dispatch(fetchUserData())
      setIsLogin(true)
      console.log('Result login', response)
      await checkUserAuth()
    } catch (error) {
      console.log('Error login', error)
    }
  }

  useEffect(() => {
    dispatch(fetchYandexId())
  }, [dispatch])

  const checkUserAuth = async (): Promise<void> => {
    await yApiService.getUser()
  }

  return {
    isLogin,
    login,
    yandexOAuthUrl,
  }
}

export default useSignIn
