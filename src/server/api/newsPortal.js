import NewsModel from 'server/database/models/news'
import User from 'server/database/models/user'

import sanitizer from 'sanitizer'

export async function getNews(ctx) {
  ctx.body = await NewsModel.find({}).then()
}

export function setNews(ctx) {
  if (ctx.session.passport) {
    User.findOne({ username: ctx.session.passport.user }, function (err, user) {
      if (user.verified === true) {
        NewsModel.create({
          title: sanitizer.sanitize(ctx.request.body.title),
          imgUrl: sanitizer.sanitize(ctx.request.body.imgUrl),
          description: sanitizer.sanitize(ctx.request.body.description),
        }, function (err, response) {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  }
  ctx.body = (ctx.request.body)
}

export function editNews(ctx) {
  if (ctx.session.passport) {
    User.findOne({ username: ctx.session.passport.user }, function (err, user) {
      if (user.verified === true) {
        NewsModel.findByIdAndUpdate(ctx.params.id, {
          title: sanitizer.sanitize(ctx.request.body.title),
          imgUrl: sanitizer.sanitize(ctx.request.body.imgUrl),
          description: sanitizer.sanitize(ctx.request.body.description),
        }, function (err, response) {
          if (err) {
            console.log(err)
          } else {
            console.log(response)
          }
        })
      }
    })
  }

  ctx.body = (ctx.request.body)
}

export async function deleteNews(ctx) {

  let message
  if (ctx.session.passport) {
    let inCharge = await User.findOne({ username: ctx.session.passport.user })
    if (inCharge.verified) {
      message = {
        deletion: true,
        message: 'Post deleted',
      }
    } else {
      message = {
        deletion: false,
        message: 'You do not have permission',
      }
    }
    User.findOne({ username: ctx.session.passport.user }, function (err, user) {
      if (user.verified === true) {
        NewsModel.findByIdAndRemove(ctx.params.id, function (err, response) {
          if (err) {
            console.log(err)
          } else {

          }
        })
      }
    })

  }
  ctx.body = message
}
