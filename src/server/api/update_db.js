import { Document } from 'server/database/models'

export default function (ctx) {
  const password = ctx.request.body.password
  
  const realPassword = process.env.DB_UPDATE_PASSWORD
  
  if (password === realPassword) {
    ctx.response.body = {success: true}
  } else {
    ctx.response.status = 401
    ctx.response.body = {error: 1, message: 'Wrong password!'}
    return
  }
  
  // const doc1 = new Document({
  //   fileName: 'abcd.xml',
  // })
  //
  // doc1.save().then(() => {console.log('document 1 saved')})
}
