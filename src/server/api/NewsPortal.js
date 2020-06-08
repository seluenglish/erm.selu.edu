let NewsModel= require('../database/models/news');
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

export function editNews(ctx){

  NewsModel.findByIdAndUpdate(ctx.params.id,{

    title:sanitizer.sanitize(ctx.request.body.title),
    imgUrl:sanitizer.sanitize( ctx.request.body.imgUrl),
    description:sanitizer.sanitize(ctx.request.body.description)
  }, function (err,response) {
    if (err){
      console.log(err)
    } else {
      console.log(response)
    }
  })
  ctx.body =  (ctx.request.body)
}
export function deleteNews(ctx){
  console.log('------------')
  console.log(ctx.params.id)
  let deletion=false;
  NewsModel.findByIdAndRemove(ctx.params.id, function (err, response) {
    if (err){
      console.log(err)
    } else {
      deletion=true
    }
  })
  ctx.body =  (deletion)
}
