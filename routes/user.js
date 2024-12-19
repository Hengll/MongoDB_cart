import { Router } from 'express'
import { create, cart, getID } from '../controllers/user.js'

const router = new Router()

router.post('/', create)
router.post('/:id/cart', cart)
router.get('/:id', getID)

export default router
