import React from 'react'
import Card from '../../components/Card'
import styled from 'styled-components'

const MainCard = styled(Card)`
  margin-bottom: ${props => props.theme.space};
`

const PersonalInfo = () => {
  return (
    <MainCard>
      这里是个人信息1
    </MainCard>
  )
}

export default PersonalInfo