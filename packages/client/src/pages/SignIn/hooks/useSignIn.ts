import { useEffect, useState } from 'react'
import yApiService from '../../../services/y-api-service'
import { LoginFromApi } from '../../../types/FormApi'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
  fetchUserData,
  fetchYandexId,
  selectAuth,
  signInYandex,
  yandexOAuthIdSelector,
} from '../../../store/modules/auth/reducer'
import { useNavigation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface useSignIn {
  isLogin: boolean
  login: (values: LoginFromApi) => Promise<void>
  searchParams: URLSearchParams
  setSearchParams: (value: URLSearchParams) => void
  yandexOAuthUrl: string
}

const useSignIn = (): useSignIn => {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useAppDispatch()

  const login = async (values: LoginFromApi): Promise<void> => {
    console.log('Received values of form: ', values)
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

  const [searchParams, setSearchParams] = useSearchParams()

  const yandexOAuthId = useSelector(yandexOAuthIdSelector)
  const auth = useSelector(selectAuth)

  console.log(window.location)

  const yandexOAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${
    yandexOAuthId ?? ''
  }&redirect_uri=localhost:3000`
  useEffect(() => {
    const codeYandexOAuth = searchParams.get('code')
    if (codeYandexOAuth) {
      const data = {
        code: `${codeYandexOAuth}`,
        redirect_uri: `${window.location.href.split('?')[0]}`,
      }
      dispatch(signInYandex(data))
      dispatch(fetchUserData())
      setSearchParams('')
    } else {
      dispatch(fetchYandexId(`${window.location.href}`))
    }
  }, [dispatch, searchParams, setSearchParams])

  const checkUserAuth = async (): Promise<void> => {
    await yApiService.getUser()
  }

  return {
    isLogin,
    login,
    searchParams,
    setSearchParams,
    yandexOAuthUrl,
  }
}

export default useSignIn
