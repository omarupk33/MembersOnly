const {findMemberByEmail} = require('../db/queries');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");



const validateLogin = [

    body('email').trim()
      .isEmail().withMessage('Please enter a valid email address.')
      .normalizeEmail(),


    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.').escape()
  ]



async function loginControllerGet(req, res, next){
    res.render('login')
}


async function validateErrors(req, res, next){

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    next()
}


module.exports = {loginControllerGet, validateErrors,
   validateLogin}