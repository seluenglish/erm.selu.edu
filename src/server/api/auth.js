const passport = require('koa-passport')

const User = require('../database/models/user'),
LocalStrategy = require('passport-local').Strategy

export async function registerUser(ctx){
  try {
    console.log(ctx.request.body.username )
    await User.register(new User({ username:ctx.request.body.username }), ctx.request.body.password, async function (err, user) {
      if (err) {
      } else {
        ctx.body=user
      }
    })
    ctx.body='user'
  } catch (e) {

  }

}


passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
})


passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username, password: password }, done);
}))
