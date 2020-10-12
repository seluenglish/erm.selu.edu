import { Schema } from 'mongoose'

let userSchema = new Schema({
  username: String,
  password: String,
  verified:false,
  token:String,
})
export default userSchema
