let NewsModel= require('../database/models/News');

export function getNews(ctx){
  //  NewsModel.create({
  //   title:'Prashant',
  //   imgUrl: 'basnet',
  //   description:'What the hell is going on?'
  // },function (err,response) {
  //   if(err){
  //
  //   }else{
  //     console.log(response);
  //   }
  // })

  ctx.body='hello from news added';

  // this.body = 'Your request has been logged.';
}


//
// export async function setNews(data){
//
//   await NewsModel.create({
//     title:data.title,
//     imgUrl: data.imgUrl,
//     description:data.description
//   },function (err,response) {
//     if (err){
//       console.log(err)
//     }
//   })
//
// }
//
