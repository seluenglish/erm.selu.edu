const passport = require('koa-passport')

const User = require('../database/models/user'),
  LocalStrategy = require('passport-local').Strategy

export async function registerUser(ctx) {
  try {
    let c = await User.findOne({ username: ctx.request.body.username })
    if (c) {
      ctx.body = { registrationSuccess: false, message: 'User already exist' }
    } else {
      await User.register(new User({ username: ctx.request.body.username }), ctx.request.body.password, async function (err, user) {
        if (err) {
          return 'User already exist'
        } else {
          await passport.authenticate('local', async function (err, user, info) {
          })
        }
      })
      ctx.body = { registrationSuccess: true, message: 'User Created' }
    }
  } catch (e) {
  }
}

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, done)
})


passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username, password: password }, done)
}))
