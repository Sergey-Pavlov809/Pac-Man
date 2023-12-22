import axios, { AxiosResponse } from 'axios'
import { RegistrationFromApi, UserFromApi } from '../types/FromApi'

export const Y_API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

const yApiService = {
  register(
    userData: RegistrationFromApi
  ): Promise<AxiosResponse<{ id: string }>> {
    return axios.post<{ id: string }>(
      `${Y_API_BASE_URL}/auth/signup`,
      userData,
      {
        withCredentials: true,
      }
    )
  },
  getUser(): Promise<AxiosResponse<UserFromApi>> {
    return axios.get<UserFromApi>(`${Y_API_BASE_URL}/auth/user`, {
      withCredentials: true,
    })
  },
}

export default yApiService
