const bcrypt = require('bcryptjs')
const {findMemberByEmail} = require('../db/queries')
const LocalStrategy = require('passport-local').Strategy


const initialize = (passport)=>{

const customFields = {
  usernameField:'email', passwordField:'password'
}

const authenticateUser = async(email, password, done) => {
      console.log("Strategy working")
      try {

      const member = await findMemberByEmail(email)

      const isMatch = await bcrypt.compare(password, member.password);
        if (!member) {
          console.log("Incorrect email")
          return done(null, false, { message: "Incorrect email" })
        }
        if (!isMatch) {
          console.log("Incorrect password")
          return done(null, false, { message: "Incorrect password" })
        }
        return done(null, member)
      } catch(err) {
        return done(err)
      }
  }
  

  passport.use(new LocalStrategy(customFields, authenticateUser))


passport.serializeUser((member, done) => {
  done(null, member.email)
});

passport.deserializeUser(async (email, done) => {
  try {

    const member = await findMemberByEmail(email)
  

    done(null, member)
  } catch(err) {
    done(err)
  }
})
}

module.exports = initialize
