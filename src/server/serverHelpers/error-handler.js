export class CustomError extends Error {
  constructor(message) {
    super(message)
  }
}

export default async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.constructor.name === 'CustomError') {
      console.log('Custom error throwing: ', err.message)
      ctx.status = 400
      ctx.body = {
        success: false,
        error: err.message,
      }
    } else {
      console.log('Express throwing error: ', err.message)

      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  }
}
