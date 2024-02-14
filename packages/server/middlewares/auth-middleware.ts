type UserDTO = {
  id: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  avatar: string
  phone: string
  email: string
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)

    this.name = 'ApiError'
    this.status = status
  }
}

export class YandexAPIService {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrentUser(): Promise<UserDTO | ApiError> {
    try {
      const response = await fetch(
        `${process.env.API_YANDEX_BASEURL}/api/v2/auth/user`,
        {
          headers: {
            cookie: this._cookieHeader || '',
          },
          credentials: 'include',
        }
      )

      if (!response.ok) {
        if (response.status === 401) {
          return new ApiError('Unauthorized', 401)
        }
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return (await response.json()) as UserDTO
    } catch (error) {
      console.log('lol')
      throw new ApiError('Network error occurred', 500)
    }
  }
}
