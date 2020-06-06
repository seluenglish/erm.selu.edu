const passport = require('koa-passport')

const User = require('../database/models/user'),
  bcrypt = require('bcrypt')


const LocalStrategy = require('passport-local').Strategy

export async function registerUser(ctx) {
  try {
    let registration ={
      authentication:false,
      message:null,
      username:null,
    }
    // passport.use(new LocalStrategy(async function(username, password, done) {
    //
    //   let user= await User.findOne({ username: ctx.request.body.username }, function (err, userExist) {
    //     if (!userExist) {
    //       return bcrypt.hash(ctx.request.body.password, 12)
    //         .then(async (hash) => {
    //           //password is returned to GQL, it then filter out the password
    //           return User.create({
    //             username: ctx.request.body.username,
    //             password:hash,
    //           })
    //
    //         })
    //     } else {
    //       console.log('user already exist')
    //       registration.authentication=false
    //       registration.message='Account already exist'
    //       return ctx.body=registration
    //     }
    //   })
    //   registration.authentication=true
    //   registration.message='Account Created'
    //   return ctx.body=registration
    //
    // }))
    //

    await User.register(new User({ username:ctx.request.body.username }), ctx.request.body.password, async function (err, user) {
      if (err) {
      } else {

        console.log(user)
        await ctx.logIn(user, function (err) {
          if (err) {
            console.log('verification failed')

          } else {
            console.log('verified')

            let s=ctx.session;
            console.log(ctx.session)
            return ctx.session
          }
        })

      }
    })
    console.log(s)
    ctx.body= ctx.session

  } catch (e) {

  }

}

export async function isLoggedIn(ctx) {

  try {
    console.log(ctx.request.body)
    console.log(ctx.request.body.username)
    ctx.body= 'ctx.body'
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
