import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentWrap from '../../components/ContentWrap'

const MainDiv = styled.div`
  display: flex;
  padding: 1em 2em;
`

const EditorWrap = styled.div`
  flex: 1;
  display: flex;
`

const Editor = styled.textarea`
  padding: 7px 12px;
  flex: 1;
  height: 50vh;
  background-color: #fff;
  border: solid 1px #ddd;
`

const PreviewWrap = styled.div`
  flex: 1;
  margin-left: 1em;
  background-color: #fff;
  border: solid 1px #ddd;
`

let markedRender:any

const MdEditor = function() {
  const [mdValue, setMdValue] = useState('')
  const [result, setResult] = useState('')
  
  useEffect(() => {
    const MarkedRenderSync = import(/* webpackChunkName: "MarkedRender" */ '../../MarkedRender')
    MarkedRenderSync.then((syncComponent:any) => {
      const MarkedRender = syncComponent.default
      markedRender = new MarkedRender()
    })
  }, [])

  useEffect(() => {
    import(/* webpackChunkName: "mermaid" */ 'mermaid').then((mermaid:any) =>{
      mermaid.init('.mermaid-wrap')
    })
  }, [result])
  console.log(1)

  const handleEditorInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setMdValue(e.target.value)

    if (markedRender) {
      setResult(markedRender.marked(e.target.value))
    }
  }

  return (
    <MainDiv>
      <EditorWrap>
        <Editor
          // contentEditable
          value={mdValue}
          onChange={handleEditorInput}
        />
      </EditorWrap>
      <PreviewWrap>
        <ContentWrap dangerouslySetInnerHTML={{ __html:result  }} />
      </PreviewWrap>
    </MainDiv>
  )
}

export default MdEditor