const Router = require('koa-router')

const article = new Router()

article.post('/add', async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = ctx.request.body
})

module.exports = article