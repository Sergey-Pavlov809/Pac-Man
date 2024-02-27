import { NextFunction, Request, Response, Router } from 'express'
import forum from './forum'
import { ApiError, YandexAPIService } from '../middlewares/auth-middleware'

export const checkIsUserAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiService = new YandexAPIService(req.headers['cookie'])
  try {
    const response = await apiService.getCurrentUser()
    if (response instanceof ApiError) {
      res.status(403).json({ error: 'Authorization error' })
    } else {
      const { id, login, avatar } = response
      req.body.user = { id, display_name: login, avatar: avatar ?? '' }
      next()
    }
  } catch (error) {
    res.status(500).end()
    return
  }
}

const router = Router()

router.use('/forum', checkIsUserAuthorized, forum)

router.use('/*', (req, res) =>
  res.status(400).json({ requestMethod: req.method, message: `Роут не найден` })
)

export default router
