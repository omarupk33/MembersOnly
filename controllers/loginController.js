const {findMemberByEmail} = require('../db/queries');
const { body, validationResult } = require('express-validator');



const validateLogin = [
    // Email: verify format and normalize (e.g., lowercase)
    body('email').trim()
      .isEmail().withMessage('Please enter a valid email address.')
      .normalizeEmail(),

    // Password: check minimum length
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.').escape()
  ]



async function loginControllerGet(req, res, next){
    res.render('login')
}


async function loginControllerPost(req, res, next){

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

  try{

    const {password, email} = req.body
    const member = await findMemberByEmail(email)

    if(member.email === email && bcrypt.compare(password, member.password)){
          res.send('Login Succeed')
    }

  else{ res.send('Login Failed')}

    }
   catch(error){
    console.error(error)
    next(error)
    }

}


module.exports = {loginControllerGet,loginControllerPost,
   validateLogin}