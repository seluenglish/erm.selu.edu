let mongooseUser = require('mongoose')

let Schema = mongooseUser.Schema

let userSchema = new Schema({
  username: String,
  password: String,
})
module.exports = userSchema
