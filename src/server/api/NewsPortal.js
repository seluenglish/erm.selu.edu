let NewsModel= require('../database/models/News');
const sanitizer = require('sanitizer')

export async function getNews(ctx){
  ctx.body = await NewsModel.find({}).then()
}

export function setNews(ctx){
  NewsModel.create({
    title:sanitizer.sanitize(ctx.request.body.title),
    imgUrl:sanitizer.sanitize( ctx.request.body.imgUrl),
    description:sanitizer.sanitize(ctx.request.body.description)
  }, function (err,response) {
    if (err){
      console.log(err)
    }
  })
  ctx.body =  (ctx.request.body)
}
