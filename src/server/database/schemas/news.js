import { Schema } from 'mongoose'

const NewsSchema = new Schema({
  title:String,
  imgUrl:String,
  description:String,
})

export default NewsSchema
