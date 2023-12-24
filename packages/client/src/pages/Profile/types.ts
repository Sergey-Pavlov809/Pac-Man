export type UserType = {
  first_name: string
  second_name: string
  display_name: null
  login: string
  avatar: null
  email: string
  phone: string
}

export type PasswordsType = {
  oldPassword: string
  newPassword: string
  confirmNewPassword?: string
}
