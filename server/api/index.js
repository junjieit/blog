const Router = require('koa-router')

const article = require('./article')

const router = new Router()
router.use('/api/article', article.routes(), article.allowedMethods())

module.exports = router