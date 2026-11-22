const {registerUser} = require('../db/queries');
const { body, validationResult } = require('express-validator');


// Work on this and change things here and there
const validateRegister = [
    // Username: remove spaces, ensure it's not empty and at least 3 chars
    body('firstname')
      .trim()
      .notEmpty().withMessage('Username is required.')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('lasttname')
      .trim()
      .notEmpty().withMessage('Username is required.')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    // Email: verify format and normalize (e.g., lowercase)
    body('email')
      .isEmail().withMessage('Please enter a valid email address.')
      .normalizeEmail(),

    // Password: check minimum length
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
      // .equals(req.body.confirmpw).withMessage('There is a mismatch in the password.')
      ,
      // Alaways going to send invalid values
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
    
    const fullname = firstname + ''+ lastname
    const member_status = isMember || false
    
    registerUser(fullname, email, password, member_status )
    
    res.redirect('/')
}




module.exports = {registerControllerPost, registerControllerGet, validateRegister}
