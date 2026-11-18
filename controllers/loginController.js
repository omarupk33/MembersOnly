const {findUser} = require('../db/queries');
const { body, validationResult } = require('express-validator');



const validateLogin = [
    // Email: verify format and normalize (e.g., lowercase)
    body('email')
      .isEmail().withMessage('Please enter a valid email address.')
      .normalizeEmail(),

    // Password: check minimum length
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
  ]



async function loginControllerGet(req, res, next){
    res.render('login')
}


async function loginControllerPost(req, res, next){
    redirect('/')
}


module.exports = {loginControllerGet,loginControllerPost, validateLogin}