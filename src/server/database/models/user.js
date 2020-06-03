let mongoose =require('mongoose'),
  userSchema = require('../schemas/user'),
  passportLocalMongoose =require('passport-local-mongoose')

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('userModel', userSchema,null, { cache: false })
