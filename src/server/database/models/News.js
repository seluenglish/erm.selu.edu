let mongoose =require('mongoose'),
  NewsSchema = require('../schemas/news')


module.exports = mongoose.model('NewsModel', NewsSchema,null, { cache: false })
