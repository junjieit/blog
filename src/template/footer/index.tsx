import React from 'react'
import styled from 'styled-components'
import { screenFitMedia } from '../../util/screen'

const MainWrap = styled.div`
  margin: 2em 0;
  text-align: center;
  color: #999;
  font-size: 12px;
  *{
    color: #999;
    font-size: 12px;
  }
  a{
    margin-left: 12px;
    text-decoration: underline #999;
    &:hover{
      text-decoration: underline #999;
    }
  }

  @media ${screenFitMedia('small')} {
    margin: 1em 0;
  }
`

const EmailWrap = styled.p`
  margin-top: 1em;
`

const Footer = () => {
  return (
    <MainWrap>
      ©2020 
      {/* <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo">
        <img src={ghsImg} />
      </a> */}
      &nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer" href="http://beian.miit.gov.cn/">粤ICP备16099767号</a>
      <EmailWrap>
        <a  target="_blank" rel="noopener noreferrer"href="mailto:wangjunjie0817@foxmail.com">wangjunjie0817@foxmail.com</a>
      </EmailWrap>
    </MainWrap>
  )
}

export default Footer