const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const { getRandom, writeFile, getPathLinkNames } = require('./util')

function Data(dbPath) {
  // writeFile(dbPath, '')
  const adapter = new FileSync(dbPath)
  this.dbPath = dbPath
  this.db = low(adapter)
  this.initData()
}

Data.prototype.initData = function() {
  this.db.defaults({
    navs: [],
    articles: {},
  }).write()
}

Data.prototype.setNavs = function(navs) {
  this.db.set('navs', navs).write()
}

Data.prototype.insertData = function(articleInfo) {
  const { path, prevFolderName, directorys } = articleInfo
  // insert nav
  let navsId = 'index'
  if (prevFolderName) {
    navsId = this.insertNavByArticleName(prevFolderName)
  }
  // insert article
  const articlesDb = this.db.get('articles')
  if (!articlesDb.get(navsId).value()) {
    articlesDb.set(navsId, {}).write()
  }
  const articleDb = articlesDb.get(navsId).findKey({ path })
  if (!articleDb.value()) {
    const articlesId = getRandom()
    const article = {
      id: articlesId,
      navsId,
      ...articleInfo,
    }
    articlesDb.get(navsId).set(articlesId, article).write()
  } else {
    articlesDb.get(navsId).set(`${articleDb.value()}.directorys`, directorys).write()
  }
}

Data.prototype.insertNavByArticleName = function(prevFolderName) {
  let navsId,
      origin = this.db.get('navs')
  const linkNames = getPathLinkNames(prevFolderName)
  const len = linkNames.length
  if (len > 3) {
    throw new Error('目录层级不应该大于 3 级')
  }
  if (!len) {
    throw new Error('传入路径非法')
  }
  linkNames.forEach(name => {
    if (!name) return
    let collection = origin.find({ name })
    if (collection.value()) {
      navsId = collection.value().id
      if (!collection.get('childrens').value()) {
        collection.set('childrens', []).write()
      }
    } else {
      const id = getRandom()
      const nav = {
        id,
        name
      }
      origin.push(nav).write()
      navsId = id
    }
    collection = origin.find({ name })
    if (!collection.get('childrens').value()) {
      collection.set('childrens', []).write()
    }
    origin = collection.get('childrens')
  })
  return navsId
}

module.exports = Data