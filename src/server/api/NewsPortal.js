let NewsModel= require('../database/models/News');

export function getNews(ctx){

  console.log(ctx.request.body)
 let data=JSON.parse(ctx.request.body)


  // let {title, imgUrl, description} =ctx.request.body
  console.log('-----test--------')
  console.log(data)

  console.log(data.title)
  console.log(data.imgUrl)
  console.log(data.description)

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



export function setNews(data){

  console.log('-----test--------')
  console.log(data)
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

