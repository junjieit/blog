import React, { useEffect } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import ContentWrap from '../../../components/ContentWrap'

interface IMainProps {
  doc: any;
}

const MainCard = styled(Card)`
  flex: 1;
  max-width: 100%;
  min-height: 70vh;
  overflow: hidden;
`

const Main = ({ doc }:IMainProps) => {

  useEffect(() => {
    if (doc) {
      import(/* webpackChunkName: "mermaid" */ 'mermaid').then((mermaid:any) =>{
        mermaid.init('.mermaid-wrap')
        const mermaidWraps = document.querySelectorAll('.mermaid-wrap')
        mermaidWraps.forEach(el => {
          el.setAttribute('class', 'mermaid-wrap complete')
        })
      })
    }
  }, [doc])

  return (
    <MainCard>
      <ContentWrap  loading={!doc} dangerouslySetInnerHTML={{ __html: doc }} />
    </MainCard>
  )
}

export default Main