import mongoose from 'mongoose'
import NewsSchema from 'server/database/schemas/news'

export default mongoose.model('NewsModel', NewsSchema, null, { cache: false })
