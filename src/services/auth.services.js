import passport from 'passport'
import localStrategy from 'passport-local'
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt'
import User from '../modules/users/user.model' // unverified breakpoints etc. if i debug with integrated vs code.

// Local Strategy

const localAuth = new localStrategy(
  {
    usernameField: 'email', // how to use one of them : maybe 'email || 'username'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email })
      // let obj= user.toJSON()
      // console.log('toOBJ?',user.toObject({virtuals:true}))
      if (!user) {
        console.log('wtf')
        return done(null, false)
      }
      const result = await user.validateUser(password)
      console.log('res', result)
      if (!result) {
        // validating the password by user with hash version
        console.log('happening')
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }
)

// JWTStrategy

const jwtStrategy = new JWTstrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    //expect the user to send the token as a query paramater with the name 'secret_token'
  },
  async (token, next) => {
    try {
      // console.log('working')
      console.log('token', token)
      const user = await User.findOne({ email: token.email })
      if (!user) {
        return next(null, false)
      }
      return next(null, user)
    } catch (error) {
      next(error)
    }
  }
)

passport.use(jwtStrategy)

passport.use(localAuth)
export const authLogin = passport.authenticate('local', { session: false })

export const authJWT = passport.authenticate('jwt', { session: false })
