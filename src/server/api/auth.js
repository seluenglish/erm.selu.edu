const passport = require('koa-passport')

const User = require('../database/models/user'),
  bcrypt = require('bcrypt')


User.findOne({ username: 'test' }, function (err, userExist) {
  if (!userExist) {
    bcrypt.hash('test', 12)
      .then(async (hash) => {
        //password is returned to GQL, it then filter out the password
        userExist = new User({
          username: 'test',
          password: 'test'
        })
        userExist.save()
      });
  }
})
const LocalStrategy = require('passport-local').Strategy

export async function registerUser(ctx){
  try {
    passport.use(new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username, password: password }, done);
    }))
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
