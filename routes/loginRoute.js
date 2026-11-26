const {Router} = require('express')
const router = Router()
require('../config/passport');
const passport = require('passport');
const {loginControllerGet,loginControllerPost, validateLogin} = require('../controllers/loginController')

router.get('/', validateLogin,loginControllerGet)



router.post('/',  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }), loginControllerPost)



module.exports = router
