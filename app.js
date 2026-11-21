require('dotenv').config();
const db = require('./db/queries')
const express = require('express');
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const { body, validationResult } = require('express-validator');
// const initializePassport = require('./passport-config');

const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const postRoute = require('./routes/postRoute')


const app = express();
// initializePassport(passport);

// View engine and middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req, res, next)=>{
    const posts = await db.allPosts()
    console.log(posts)
      res.render('index', {posts: posts});
})

app.use('/login',loginRoute)
app.use('/register', registerRoute)
app.use('/post', postRoute)


app.listen(process.env.PORT, (err)=>{
    if(err){
        throw Error(err)
    }
    console.log('Server running on Port: 3000')
})