const bcrypt = require('bcryptjs')
const {findMemberByEmail} = require('../db/queries');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;




const customFields = {
  email:'email', password:'password'
}


const strategy = new LocalStrategy(customFields, async (email, password, done) => {
  console.log("strategy working")
      try {
      const member = await findMemberByEmail(email)

        if (!member) {
          console.log("Incorrect email")
          return done(null, false, { message: "Incorrect email" });
        }
        if ( bcrypt.compare(password, member.password)) {
          console.log("Incorrect password")
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, member);
      } catch(err) {
        return done(err);
      }
  })


passport.use(strategy);


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

