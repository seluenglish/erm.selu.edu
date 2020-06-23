let NewsModel = require('../database/models/news')
const sanitizer = require('sanitizer')
let User = require('../database/models/user')
import dotenv from 'dotenv'
dotenv.config()

export async function getAllUsers(ctx) {
  //checks session
  if (ctx.session.passport) {
    //checks if user is super user
    if (ctx.session.passport.user === process.env.responsiblePerson) {
      let allUsers = await User.find()
      //returns all the user except super user
      ctx.body = await allUsers.filter((item) => {
        if (item.username != process.env.responsiblePerson) {
          return item
        }
      })
    }
  }
}
export async function setUserPermission(ctx) {

  //checks if your is signed in
  if (ctx.session.passport) {
    //checks if user is super user
    if (ctx.session.passport.user === process.env.responsiblePerson) {
      let updatedUser = await User.findByIdAndUpdate(ctx.params.userId, { verified: ctx.request.body.setAction }, { new: true })
      ctx.body = updatedUser
    }
  }

  //returned is ignored
  ctx.body = true
}
