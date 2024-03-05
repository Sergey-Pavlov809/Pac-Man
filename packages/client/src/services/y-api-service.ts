import {
  LeaderBoardApi,
  OauthSignInRequest,
  RegistrationFromApi,
  UserFromApi,
  LoginFromApi,
  ServiceIdApi,
} from 'types/FormApi'
import { ratingFieldName } from 'utils/consts'
import { sanitize } from 'utils/sanitize'

export const Y_API_BASE_URL = `${import.meta.env.VITE_API_ENDPOINT}/api/v2`

const yApiService = {
  login(userData: LoginFromApi): Promise<Response> {
    const data = sanitize(userData as unknown)
    return fetch(`${Y_API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
  },
  register(userData: RegistrationFromApi): Promise<{ id: string }> {
    const data = sanitize(userData as unknown)
    return fetch(`${Y_API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(response => response.json())
  },
  getUser(): Promise<UserFromApi> {
    return fetch(`${Y_API_BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => {
      if (!response.ok) {
        throw new Error('Нет авторизации')
      }
      return response.json()
    })
  },

  getServiceID(): Promise<ServiceIdApi> {
    return fetch(
      `${Y_API_BASE_URL}/oauth/yandex/service-id?redirect_uri=${window.location.origin}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    ).then(response => response.json())
  },

  loginWithYandex(params: OauthSignInRequest): Promise<Response> {
    const data = sanitize(params)
    return fetch(`${Y_API_BASE_URL}/oauth/yandex`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
  },
  getLeaderBoard(): Promise<LeaderBoardApi[]> {
    return fetch(`${Y_API_BASE_URL}/leaderboard/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ratingFieldName: ratingFieldName,
        cursor: 0,
        limit: 20,
      }),
      credentials: 'include',
    }).then(response => response.json())
  },

  postScores(login: string, scores: number): Promise<Response> {
    return fetch(`${Y_API_BASE_URL}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { userName: login, [ratingFieldName]: scores },
        ratingFieldName,
      }),
      credentials: 'include',
    }).then(response => response)
  },
}

export default yApiService
