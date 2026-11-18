const {Router} = require('express')
const router = Router()

const {loginControllerGet,loginControllerPost, validateLogin} = require('../controllers/loginController')

router.get('/', validateLogin,loginControllerGet)



router.post('/',  loginControllerPost)



module.exports = router
