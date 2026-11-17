require('dotenv').config();

const express = require('express');
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const { body, validationResult } = require('express-validator');
// const pool = require('./db');
// const initializePassport = require('./passport-config');

const app = express();
// initializePassport(passport);

// View engine and middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next)=>{
      res.render('index', { user: 'req.user' });
})

app.get('/login', (req, res, next)=>{
    res.render('login')
})


app.get('/register', (req, res, next)=>{
    res.render('register')
})
app.listen(process.env.PORT, (err)=>{
    if(err){
        throw Error(err)
    }
    console.log('Server running on Port: 3000')
})