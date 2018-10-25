export default async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    console.log('Express throwing error: ', err.message)
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
}
