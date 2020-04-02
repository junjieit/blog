
const marked = require('marked')
const path = require('path')
const fs = require('fs')
const hljs = require('highlight.js')
const Data = require('./data')
const { writeFile, matchDirectory } = require('./util')
const { cleanUrl } = require('marked/src/helpers')

const ConvertArticle = function({ mdPath,  htmlPath, configPath, markedConfig } = {}) {
  this.mdPath = mdPath
  this.htmlPath = htmlPath
  this.markedConfig = markedConfig || {}
  this.marked = null

  this.waitingQueue = {}

  // 当前渲染的文件配置
  this.renderFileConfig = {
    heading: []
  }

  const dbData = new Data(configPath)
  this.dbData = dbData

  this.init()
}

ConvertArticle.prototype.init = function() {
  this.addWaitingQueue(this.mdPath)
  console.log(`添加了${Object.keys(this.waitingQueue).length}个到待转换队列`)
}

ConvertArticle.prototype.markedInit = function() {
  const renderer = new marked.Renderer()
  const convertThis = this

  renderer.link = function(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ' target="_blank">' + text + '</a>';
    return out;
  };

  renderer.heading = function(text, level, raw, slugger) {
    const id = this.options.headerPrefix
    + slugger.slug(raw)
    if (level === 2 || level === 3) {
      convertThis.renderFileConfig.heading.push({
        text,
        level,
        id
      })
    }
    return `<h${level} id="${id}">${text}</h${level}>\n`
  }

  renderer.code = function(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];

    if (lang === 'mermaid') {
      return `<div class="mermaid-wrap">${code}</div>`
    }
    
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape(code, true))
        + '</code></pre>';
    }

    return '<pre><code class="'
      + this.options.langPrefix
      + escape(lang, true)
      + '">'
      + (escaped ? code : escape(code, true))
      + '</code></pre>\n';
  }

  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
    tables: true,
    xhtml: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    },
    ...this.markedConfig,
  })

  this.marked = marked
}

ConvertArticle.prototype.getDirectorysByRenderConfig = function() {
  const { heading } = this.renderFileConfig
  if (!heading) {
    throw new Error('没有渲染配置')
  }
  const directorys = []
  heading.forEach((head, index) => {
    const len = directorys.length
    if (!len) {
      directorys.push(head)
    } else {
      const isMatch = matchDirectory(directorys, head, index)
      if (!isMatch) {
        directorys.push(head)
      }
    }
  })
  this.renderFileConfig = {
    heading: []
  }
  return directorys
}

ConvertArticle.prototype.addWaitingQueue = function(queuePath) {
  if (fs.existsSync(queuePath)) {
    fs.readdirSync(queuePath).forEach((file) => {
        const curPath = path.resolve(queuePath, file)
        if (fs.statSync(curPath).isDirectory()) { // recurse
          this.addWaitingQueue(curPath)
        } else {
          const prevFolderPath = path.dirname(curPath)
          const prevFolderName = prevFolderPath.split(this.mdPath)[1]
          this.waitingQueue[Object.keys(this.waitingQueue).length] = {
            path: curPath,
            title: path.basename(file, '.md'),
            prevFolderName,
          }
        }
    })
  } else {
    console.log(`${queuePath}内未找到文件`)
  }
}

ConvertArticle.prototype.createHtmlFile = function() {
  if (this.marked === null) {
    this.markedInit()
  }
  Object.keys(this.waitingQueue).forEach(key => {
    const { path: mdPath, prevFolderName } = this.waitingQueue[key]
    const mdFile = fs.readFileSync(mdPath, 'utf-8')
    const htmlFile = this.marked(mdFile)
    const targetPath = path.join(this.htmlPath, prevFolderName,  `${path.basename(mdPath, '.md')}.html`)
    /* write */
    let successLen = 0

    writeFile(targetPath, htmlFile, (error) => {
      console.log(`生成html文件，成功：${successLen}个，失败：${Object.keys(this.waitingQueue).length}个`)
      throw new Error(error)
    })
    successLen++
    this.dbData.insertData({
      ...this.waitingQueue[key],
      directorys: this.getDirectorysByRenderConfig()
    })
    delete this.waitingQueue[key]
    if (!Object.keys(this.waitingQueue).length) {
      console.log('生成文件成功')
    }
  })
}

module.exports = ConvertArticle