const {Router} = require('express')
const router = Router()
const {registerControllerPost, registerControllerGet,validateRegister} = require('../controllers/registerController')





router.get('/', registerControllerGet )
router.post('/', validateRegister, registerControllerPost)

module.exports = router
