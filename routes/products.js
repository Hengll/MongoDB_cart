import { Router } from 'express'
import { create, get } from '../controllers/product.js'

const router = new Router()

router.post('/', create)
router.get('/', get)

export default router
