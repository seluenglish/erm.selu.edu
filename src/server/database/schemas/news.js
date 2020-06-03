let mongooseNews = require('mongoose')

let Schema = mongooseNews.Schema

let NewsSchema = new Schema({
  title:String,
  imgUrl:String,
  description:String,
})

module.exports = NewsSchema
