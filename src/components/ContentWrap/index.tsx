import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { screenFitMedia } from '../../util/screen'
import Skeleton from '../Skeleton'

const ContentWrapDiv = styled.div`
  font-size: 14px;
  padding: 0 20px 30px;
  font: 300 1em/1.8 "PingFang SC", "Lantinghei SC", "Microsoft Yahei", "Hiragino Sans GB", "Microsoft Sans Serif", "WenQuanYi Micro Hei", sans;
  *{
    font: 300 1em/1.8 "PingFang SC", "Lantinghei SC", "Microsoft Yahei", "Hiragino Sans GB", "Microsoft Sans Serif", "WenQuanYi Micro Hei", sans;
  }

  .mermaid-wrap{
    &:not(.complete) {
      width: 60%;
      height: 200px;
      background-color: #eee;
      color: #eee;
      overflow: hidden;
      @media ${screenFitMedia('small')} {
        width: 100%;
        max-height: 30vh;
      }
    }
    svg {
      max-width: 100%;
      max-height: 100%;
    }
    @media ${screenFitMedia('small')} {
      svg {
        height: 100%;
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.2em;
    margin-bottom: 0.6em;
    line-height: 1.35;
  }

  h1 {
    margin-top: 0;
    padding: .3em;
    font-size: 2.4em;
    border-bottom: 2px double #eee;
    font-weight: 700;

    @media ${screenFitMedia('small')} {
      font-size: 2em;
    }
  }

  h2 {
    font-size: 1.8em;
    font-weight: 600;
  }

  h3 {
    font-size: 1.6em;
    font-weight: 600;
  }

  h4 {
    font-size: 1.4em;
    font-weight: 500;
  }

  h5, h6 {
    font-size: 1.2em;
    font-weight: 400;
  }

  ul{
    margin-left: 1.3em;
    li {
      list-style: disc;
    }
  }

  ol{
    margin-left: 1.9em;
    li {
      list-style: decimal;
    }
  }

  ul, ol, li {
    ul, ol {
      margin-bottom: 0.8em;
      margin-left: 2em;
    }
    ul {
      list-style: circle;
    }
  }

  table {
    margin-top: .3em;
    border-collapse: collapse;
    border-spacing: 0;
    th{
      background: #fbfbfb;
      padding: 0;
      color: inherit;
    }
    thead {
      th{
        background: #f1f1f1;
      }
    }
    caption {
      border-bottom: none;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 0.5em 1em;
      color: #666;
    }
  }

  img {
    max-width: 100%;
  }

  address, caption, cite, code, dfn, th, var {
    font-style: normal;
    font-weight: 400;
  }

  em {
    font-family: Georgia-Italic, STSongti-SC-Light, serif;
    font-weight: inherit;
    font-style: inherit;
  }
  strong em,
  em strong {
    font-family: Georgia-BoldItalic, STSongti-SC-Regular, serif;
  }
  strong {
    font-weight: bolder;
    color: #000;
  }

  a {
    color: rgb(26, 188, 156);
    &:hover {
      color: rgba(26, 188, 156, .7);
      text-decoration: underline;
    }
    & + a {
      margin-left: 3em;
    }
  }

  mark {
    background: #fffdd1;
    border-bottom: 1px solid #ffedce;
    padding: 2px;
    margin: 0 5px;
  }

  code {
    color: #EE7C2B;
  }
  pre {
    display: block;
    overflow-x: auto;
    background: #1C1D21;
    color: #c0c5ce;
    padding: 0.5em;
    code, tt {
      color: #c0c5ce;
    font-family: Courier, 'Courier New', monospace;
    }
  }


  /* Death Star Comment */
.hljs-comment,
.hljs-quote 
{
  color: #B6B18B;
}

/* Darth Vader */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion 
{
  color: #EB3C54;
}

/* Threepio */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link 
{
  color: #E7CE56;
}

/* Luke Skywalker */
.hljs-attribute 
{
  color: #EE7C2B;
}

/* Obi Wan Kenobi */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition 
{
  color: #4FB4D7;
}

/* Yoda */
.hljs-title,
.hljs-section 
{
  color: #78BB65;
}

/* Mace Windu */
.hljs-keyword,
.hljs-selector-tag 
{
  color: #B45EA4;
}

/* Millenium Falcon */
.hljs 
{
  display: block;
  overflow-x: auto;
  background: #1C1D21;
  color: #c0c5ce;
  padding: 0.5em;
}

.hljs-emphasis 
{
  font-style: italic;
}

.hljs-strong 
{
  font-weight: bold;
}
`

interface IContentWrapProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

const ContentWrap = ({ loading, children, ...attrProps }:IContentWrapProps, ref:React.Ref<HTMLDivElement>) => {
  return loading ? <Skeleton /> : (
    <ContentWrapDiv ref={ref} { ...attrProps }>
      { children }
    </ContentWrapDiv>
  )
}

export default forwardRef(ContentWrap)