const {registerUser} = require('../db/queries');
const { body, validationResult } = require('express-validator');


// Work on this and change things here and there
const validateRegister = [
    // Username: remove spaces, ensure it's not empty and at least 3 chars
    body('firstname')
      .trim()
      .notEmpty().withMessage('Firstname is required.')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.')
      .escape(),
    body('lastname')
      .trim()
      .notEmpty().withMessage('Lastname is required.')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.').escape(),
    // Email: verify format and normalize (e.g., lowercase)
    body('email')
      .isEmail().withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
      .custom(async value => {
        if (value !== req.body.confirmpw) {
          throw new Error('The two passwords are not matching');
        }
      }).escape()
      ,
      body('isMember').optional().toBoolean().isBoolean()
  ]



async function registerControllerGet(req, res, next){
    res.render('register')
}


async function registerControllerPost(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }


    const {firstname, lastname, email, password, isMember} = req.body
    
    const member_status = isMember || false
    
    registerUser(firstname, lastname, email, password, member_status )
    
    res.redirect('/')
}




module.exports = {registerControllerPost, registerControllerGet, validateRegister}
