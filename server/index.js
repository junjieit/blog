
const fs = require("fs")
const path = require("path")
const ReactDOMServer = require("react-dom/server")
const Koa = require('koa')
const Router = require('koa-router')
const router = require('./api/index')
const koaBody = require('koa-body')

const app = new Koa()

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)

console.log('Application is running on http://127.0.0.1:3000')