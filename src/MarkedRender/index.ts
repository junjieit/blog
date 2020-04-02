import hljs from 'highlight.js'
import marked from 'marked'
// @ts-ignore
import { cleanUrl } from 'marked/src/helpers'
import { getRandom } from '../util'

const config = {
  baseUrl: '/mdimgs/'
}

const MarkedRender = function(this: any) {
  this.marked = marked
  this.renderFileConfig = {
    heading: []
  }
  this.renderConfig()
} as any

MarkedRender.prototype.renderConfig = function() {
  const renderer = new marked.Renderer()
  const { renderFileConfig } = this

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

  // eslint-disable-next-line max-params
  renderer.heading = function(text, level, raw, slugger) {
    const id = getRandom() + '-' + this.options.headerPrefix
    + slugger.slug(raw)
    renderFileConfig.heading.push({
      text,
      level,
      id
    })
    return `<h${level} id="${id}">${text}</h${level}>\n`
  }

  renderer.code = function(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];

    if (lang === 'mermaid') {
      return `<div class="mermaid-wrap">${code}</div>`
    }
    
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape(code))
        + '</code></pre>';
    }

    return '<pre><code class="'
      + this.options.langPrefix
      + escape(lang)
      + '">'
      + (escaped ? code : escape(code))
      + '</code></pre>\n';
  }

  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
    xhtml: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    },
    ...config,
  })
  this.marked = marked
}

export default MarkedRender