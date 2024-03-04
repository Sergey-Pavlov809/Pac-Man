import { message } from 'antd'
import { PasswordsType, UserType } from './types'
import { Rule } from 'rc-field-form/lib/interface'
import { sanitize } from 'utils/sanitize'

export const initialData = {
  first_name: '',
  second_name: '',
  display_name: null,
  login: '',
  avatar: null,
  email: '',
  phone: '',
}

export const cardStyle = {
  padding: '24px',
}

export const fieldStyle = {
  margin: '12px 0',
}

export const isAuthenticated = true

export const baseApi = `${import.meta.env.VITE_API_ENDPOINT}/api/v2`

export const passwordValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  { min: 8, max: 40, message: 'Длинна от 8 до 40' },
  { pattern: /[0-9]/, message: 'Должна быть хоть одна цифра' },
  { pattern: /[A-ZА-ЯЁ]/, message: 'Должна быть хоть одна буква' },
]

export const customRequest = async (
  file: string | Blob | File,
  calback: (avatar: string) => void
): Promise<void> => {
  try {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await fetch(`${baseApi}/user/profile/avatar`, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Ошибка при загрузке файла')
    }

    const result: UserType = await response.json()
    message.success('Aватар успешно изменен')
    calback(result.avatar ?? '')
  } catch (error) {
    message.error(`Ошибка загрузки файла: ${error}`)
  }
}

export const fetchData = async (
  calback: React.Dispatch<React.SetStateAction<UserType>>
): Promise<void> => {
  try {
    const response = await fetch(`${baseApi}/auth/user`, {
      method: 'GET',
      credentials: 'include',
    })
    if (response.ok) {
      const data = await response.json()
      calback(data)
    } else {
      console.error('Ошибка при запросе:', response.status)
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
  }
}

export const changePassword = async (
  passwordData: PasswordsType,
  calback: () => void
): Promise<void> => {
  try {
    const data = sanitize(passwordData)
    const response = await fetch(`${baseApi}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (response.status === 200) {
      message.success('Пароль успешно изменен')
      calback()
      return
    }
    const { reason } = await response.json()

    if (reason === 'Password is incorrect') {
      message.error('Неправильно ввели старый пароль')
    } else {
      message.error('Не удалось изменить пароль')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
