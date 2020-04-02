const path = require('path')
const ConvertArticle = require('./ConvertArticle')

const mdPath = path.resolve(__dirname, './md/')
const htmlPath = path.resolve(__dirname, '../public/docs')
const configPath = path.resolve(__dirname, '../public/config.json')

const convertArticle = new ConvertArticle({
  mdPath,
  htmlPath,
  configPath,
  markedConfig: {
    baseUrl: '/article/',
  }
})

convertArticle.createHtmlFile()
