export interface LoginFromApi {
  login: string
  password: string
}

export type UserFromApi = {
  id: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface RegistrationFromApi {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface OAuthSingInData {
  code: string
  redirect_uri: string
}
