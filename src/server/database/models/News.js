let mongooseC =require('mongoose'),
  NewsSchema = require('../schemas/News')


module.exports = mongooseC.model('NewsSchema', NewsSchema)
