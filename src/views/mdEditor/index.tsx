import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { addArticle } from '../../api/article'
import ContentWrap from '../../components/ContentWrap'

const MdEditorPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding: 1.5em;
`

const LinkInput = styled.input`
  width: 300px;
`

const MainDiv = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 100%;
  margin-top: 20px;
  overflow: hidden;
`

const EditorWrap = styled.div`
  
`

const Editor = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 7px 12px;
  background-color: #fdf4e0;
  border: solid 1px #ddd;
  line-height: 1.5;
`

const PreviewWrap = styled.div`
  background-color: #fff;
  border: solid 1px #ddd;
  overflow-y: auto;
`

let markedRender:any

function useModel() {
  const [value, setValue] = useState('')
  const result = {
    value,
    onChange: (event:any) => setValue(event.target.value)
  }
  return result
}

const MdEditor = function() {
  const [mdValue, setMdValue] = useState('')
  const [result, setResult] = useState('')
  const modelAttr = useModel()
  const { value: path } = modelAttr
  const editorEl = useRef(null)
  const viewEl = useRef(null)
  
  useEffect(() => {
    const MarkedRenderSync = import(/* webpackChunkName: "MarkedRender" */ '../../MarkedRender')
    MarkedRenderSync.then((syncComponent:any) => {
      const MarkedRender = syncComponent.default
      markedRender = new MarkedRender()
    })
  }, [])

  useEffect(() => {

    const handleScrollEditor = () => {
      // 按比例联动滚动
      const { scrollTop, scrollHeight, clientHeight } = editorEl.current
      const editorMaxScrollTop = scrollHeight - clientHeight
      const viewMaxScrollTop = viewEl.current.scrollHeight - viewEl.current.clientHeight
      const result = scrollTop / editorMaxScrollTop * viewMaxScrollTop
      viewEl.current.scrollTop = result
    }

    editorEl.current.addEventListener('scroll', handleScrollEditor)

    return (() => {
      if (editorEl.current) {
        editorEl.current.removeEventListener('scroll', handleScrollEditor)
      }
    })
  }, [])

  useEffect(() => {
    import(/* webpackChunkName: "mermaid" */ 'mermaid').then((mermaid:any) =>{
      mermaid.init('.mermaid-wrap')
    })
  }, [result])

  const handleEditorInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setMdValue(e.target.value)

    if (markedRender) {
      setResult(markedRender.marked(e.target.value))
    }
  }

  const handleSave = () => {
    addArticle({
      params: {
        path,
        source: mdValue
      }
    })
  }

  return (
    <MdEditorPage>
      <div>
        <LinkInput {...modelAttr} type="text" placeholder="输入链接地址" />
        <button type="button" onClick={handleSave}>保存</button>
      </div>
      <MainDiv>
        <EditorWrap>
          <Editor
            // contentEditable
            value={mdValue}
            onChange={handleEditorInput}
            ref={editorEl}
          />
        </EditorWrap>
        <PreviewWrap ref={viewEl}>
          <ContentWrap dangerouslySetInnerHTML={{ __html:result  }} />
        </PreviewWrap>
      </MainDiv>
    </MdEditorPage>
  )
}

export default MdEditor