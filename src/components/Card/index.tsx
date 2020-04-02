import React from 'react'
import styled from 'styled-components'

const MainDiv = styled.div`
  background-color: ${props => props.theme.mainBc};
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`

interface IProps {
  loading?: Boolean;
  children?: any;
}


const Card = ({ loading, children, ...attrProps }:IProps, ref:React.Ref<HTMLDivElement>) => {
  return (
    <MainDiv ref={ref} {...attrProps}>
      {children}
    </MainDiv>
  )
}

export default React.forwardRef<HTMLDivElement, IProps>(Card)