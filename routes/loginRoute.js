const {Router} = require('express')
const router = Router()
require('../config/passport');
const passport = require('passport');
const {loginControllerGet, validateErrors, validateLogin} = require('../controllers/loginController')

router.get('/', loginControllerGet)



router.post('/', validateLogin, validateErrors, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }))


// , loginControllerPost
module.exports = router
