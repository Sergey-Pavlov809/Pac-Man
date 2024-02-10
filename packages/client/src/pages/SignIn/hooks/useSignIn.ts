import { useState } from 'react'
import yApiService from 'services/y-api-service'
import { LoginFromApi } from 'types/FormApi'
import { useAppDispatch } from 'hooks'
import { fetchUserData } from 'store/modules/auth/reducer'

interface useSignIn {
  isLogin: boolean
  login: (values: LoginFromApi) => Promise<void>
}

const useSignIn = (): useSignIn => {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useAppDispatch()

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

  const checkUserAuth = async (): Promise<void> => {
    await yApiService.getUser()
  }

  return {
    isLogin,
    login,
  }
}

export default useSignIn
