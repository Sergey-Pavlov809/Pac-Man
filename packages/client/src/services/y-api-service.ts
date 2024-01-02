import {
  RegistrationFromApi,
  UserFromApi,
  LoginFromApi,
} from '../types/FormApi'
import { RegistrationFromApi, UserFromApi } from '../types/FromApi'

export const Y_API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

const yApiService = {
  login(userData: LoginFromApi): Promise<Response> {
    return fetch(`${Y_API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })
  },
  register(userData: RegistrationFromApi): Promise<{ id: string }> {
    return fetch(`${Y_API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    }).then(response => response.json())
  },
  getUser(): Promise<UserFromApi> {
    return fetch(`${Y_API_BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => response.json())
  },
}

export default yApiService
