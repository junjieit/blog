const express = require("express")
const fs = require("fs")
const path = require("path")
const ReactDOMServer = require("react-dom/server")
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'Hello world Koa'
})

app.use(router.routes())

app.listen(3000)

console.log('Application is running on http://127.0.0.1:3000')