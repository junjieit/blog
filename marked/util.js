const path = require('path')
const fs = require('fs')
const shortid = require('shortid')

const util = {}

util.getRandom = function() {
  return shortid.generate()
}

util.getPathLinkNames = function(prevPath) {
  const splitSymbol = prevPath.indexOf('/') === -1 ? '\\' : '/'
  return prevPath.split(splitSymbol)
}

util.writeFile = function(targetPath, file, _errback) {
  let prevPath = path.dirname(targetPath)
  const splitSymbol = prevPath.indexOf('/') === -1 ? '\\' : '/'
  let splitPrevPath = splitSymbol
  prevPath.split(splitSymbol).forEach(levelPathName => {
    if (levelPathName && levelPathName !== '.') {
      splitPrevPath = path.join(splitPrevPath, levelPathName)
      if (!fs.existsSync(splitPrevPath)) {
        fs.mkdirSync(splitPrevPath)
      }
    }
  })
  try {
    fs.writeFileSync(targetPath, file)
  } catch (error) {
    console.error('writeFile targetPath:' + targetPath)
    if (typeof _errback === 'function') {
      _errback(error)
    } else {
      throw new Error(error)
    }
  }
}

util.matchDirectory = function(directorys, compare) {
  const len = directorys.length
  let isMatch = false
  for (let i = len - 1;i >= 0;i--) {
    const directory = directorys[i]
    if (directory.level >= compare.level) {
      continue;
    } else if (Array.isArray(directory.childrens)) {
      let isMatchChildren = util.matchDirectory(directory.childrens, compare)
      if (!isMatchChildren) {
        directory.childrens.push(compare)
      }
      return true
    } else {
      isMatch = true
      if (Array.isArray(directory.children)) {
        directory.childrens.push(compare)
      } else {
        directory.childrens = [compare]
      }
      break
    }
  }
  return isMatch
}

module.exports = util