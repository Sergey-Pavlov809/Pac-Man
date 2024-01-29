import { rootReducer, setupStore } from './index'

export type AppDispatch = ReturnType<typeof setupStore>['dispatch']

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
}

export type RootState = ReturnType<typeof rootReducer>
