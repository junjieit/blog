import React from 'react'
import styled from 'styled-components'
import { screenFitMedia } from '../util/screen'

interface IPageParcelProps {
  right?: React.ReactNode;
  children: React.ReactNode;
}

const InnerParcel = styled.div`
  margin: 0 auto;
  display: flex;
  width: 80vw;

  @media ${screenFitMedia('small')} {
    width: 100vw;
  }
`

const RightInfo = styled.div`
  margin-left: ${props => props.theme.space};
`

const PageParcel = function({ children, right }:IPageParcelProps) {
  return (
    <InnerParcel>
      {children}
      {right ? <RightInfo>{right}</RightInfo> : ''}
    </InnerParcel>
  )
}

export default PageParcel