let mongoose =require('mongoose'),
  NewsSchema = require('../schemas/News')


module.exports = mongoose.model('NewsModel', NewsSchema,null, { cache: false })
