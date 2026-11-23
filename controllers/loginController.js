const {findUserByEmail} = require('../db/queries');
const { body, validationResult } = require('express-validator');



const validateLogin = [
    // Email: verify format and normalize (e.g., lowercase)
    body('email').trim
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



  const {password, email} = req.body

  const member = await findUserByEmail(email)

  if(member.email === email && 
     member.password === Number(password)){
        res.send('Login Succeed')
  }

  else{ res.send('Login Failed')}

}


module.exports = {loginControllerGet,loginControllerPost,
   validateLogin}