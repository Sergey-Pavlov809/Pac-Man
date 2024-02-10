import { LeaderBoardItem } from '../types/FormApi'
import { store } from './index'

export type AppDispatch = typeof store.dispatch

export interface AuthState {
  id: number | null
  first_name: string | null
  second_name: string | null
  display_name: string | null
  login: string | null
  email: string | null
  password: string | null
  phone: string | null
  avatar: string | null
  authorizedStatus: string
  yandexOAuthId?: string
}

export interface LeaderBoardState {
  items: LeaderBoardItem[] | []
}

export type RootState = ReturnType<typeof store.getState>
