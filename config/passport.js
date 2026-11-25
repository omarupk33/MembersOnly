const bcrypt = require('bcryptjs')
const {findMemberByEmail} = require('../db/queries');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;


const strategy = new LocalStrategy(async (email, password, done) => {
      try {
      const member = await findMemberByEmail(email)

        if (!member) {
          return done(null, false, { message: "Incorrect email" });
        }
        if ( bcrypt.compare(password, member.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, member);
      } catch(err) {
        return done(err);
      }
  })

const costumFields = {
  email:'email', password:'password'
}



passport.use(costumFields, strategy);


passport.serializeUser((member, done) => {
  done(null, member.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const { rows } = await findMemberByEmail(email)
    const member = rows[0];

    done(null, member);
  } catch(err) {
    done(err);
  }
});

