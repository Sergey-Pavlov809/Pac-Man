import {
  LeaderBoardApi,
  RegistrationFromApi,
  UserFromApi,
  LoginFromApi,
} from 'types/FormApi'
import { ratingFieldName } from 'utils/consts'

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
