import { Router } from 'express'
import { Forum } from '../controllers/forum'

const router = Router()

router.get('/themes/', Forum.getThemes)
router.post('/themes/', Forum.postTheme)
router.delete('/themes/:theme_id', Forum.deleteTheme)
router.get('/messages/:theme_id', Forum.getMessages)
router.post('/messages/', Forum.postMessage)

export default router
