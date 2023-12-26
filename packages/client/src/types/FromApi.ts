export interface RegistrationFromApi {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type UserFromApi = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}
