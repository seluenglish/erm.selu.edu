let NewsModel= require('../database/models/News');

export function getNews(ctx){


  console.log(ctx.request.body.imgUrl)


  // let {title, imgUrl, description} =ctx.request.body
  console.log('-----test--------')


  // NewsModel.create({
  //   title:title,
  //   imgUrl: imgUrl,
  //   description:description
  // }, function (err, response) {
  //   if (err){
  //
  //   } else {
  //     console.log(response);
  //   }
  // })
  //
  ctx.body =  (ctx.request.body)

  // this.body = 'Your request has been logged.';
}



export function setNews(ctx){

  console.log('-----test--------')
  console.log(ctx.request.body.imgUrl)
  ctx.body =  (ctx.request.body)
  //  NewsModel.create({
  //   title:data.title,
  //   imgUrl: data.imgUrl,
  //   description:data.description
  // },function (err,response) {
  //   if (err){
  //     console.log(err)
  //   }
  // })

}

