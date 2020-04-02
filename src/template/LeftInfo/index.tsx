import React from 'react'
import PersonalInfo from './PersonalInfo'
import styled from 'styled-components'

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${props => props.theme.space};
`

const LeftInfo = () => {
  return (
    <MainDiv>
      <PersonalInfo />
    </MainDiv>
  )
}

export default LeftInfo