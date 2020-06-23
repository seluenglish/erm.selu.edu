const passport = require('koa-passport')

const User = require('../database/models/user'),
  LocalStrategy = require('passport-local').Strategy,
  jwt = require('jsonwebtoken'),
  nodeMailer = require('nodemailer')

import dotenv from 'dotenv'

export async function registerUser(ctx) {
  dotenv.config()
  try {

    let c = await User.findOne({ username: ctx.request.body.username })
    if (c) {

      ctx.body = { registrationSuccess: false, message: 'User already exist' }
    } else {

      let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar',
      }, 'secret')


      await User.register(new User({
        username: ctx.request.body.username,
        token: token,
        verified: false,
      }), ctx.request.body.password, async function (err, user) {

        if (err) {
          return 'User already exist'
        } else {

          let link = 'http://' + ctx.host + '/verify/' + ctx.request.body.username + '/id/' + token
          let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.email, // generated ethereal user
              pass: process.env.password, // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false,
            },
          })

          let info = transporter.sendMail({
            from: 'MapDora', // sender address
            to: 'prashant.basnet@selu.edu', // list of receivers
            subject: 'Please confirm your Email account',
            html: 'Hello,<br> Please Click on the link to verify your email.<br><a href=' + link + '>Click here to verify ' + link + '</a>',
          })
          console.log('---sent')
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


export function verifyEmail(ctx) {
  User.findOne({ username: ctx.params.username }, function (err, user) {
    if (user) {
      if (user.token === ctx.params.token) {
        user.verified = true
        // User.findOneAndUpdate({username:ctx.params.username},user,function (err,user) {})
        console.log(user)
        user.save()
      }
    }
  })
  ctx.body = 'done'
}
