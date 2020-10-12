import mongoose from 'mongoose'
import UserSchema from 'server/database/schemas/user'
import passportLocalMongoose from 'passport-local-mongoose'

UserSchema.plugin(passportLocalMongoose)
export default mongoose.model('userModel', UserSchema, null, { cache: false })
