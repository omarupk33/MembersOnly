require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
require('./config/passport');
const db = require('./db/queries')
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const postRoute = require('./routes/postRoute')

const app = express();


app.use(session({
    store: new pgSession({
        conString: process.env.DATABASEURL,
        createTableIfMissing: true
    }),

    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized: true,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000},
    saveUninitialized: true,
}))


app.use(passport.initialize());
app.use(passport.session());



// View engine and middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req, res, next)=>{
    const posts = await db.allPosts()
    console.log(posts)
      res.render('index', {posts: posts});
})

app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/post', postRoute)


app.listen(process.env.PORT, (err)=>{
    if(err){
        throw Error(err)
    }
    console.log('Server running on Port: 3000')
})