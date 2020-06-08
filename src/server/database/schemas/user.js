let mongooseUser = require('mongoose')

let Schema = mongooseUser.Schema

let userSchema = new Schema({
  username: String,
  password: String,
  verified:false,
  token:String
})
module.exports = userSchema
