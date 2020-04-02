import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import Skeleton from '../../../components/Skeleton'
import { directory } from '../type'

const Main = styled.div`
  /* margin-top: ${props => props.theme.space}; */
  width: 255px;
`


const NavWrap = styled(Card)`
  position: fixed;
  padding: 12px 10px;
  width: 255px;
  max-height: 100vh;
  overflow-y: scroll;
`

const NavUl = styled.ul`
  padding: 0 0 0 1em;
`
const NavLi = styled.li`
  
`

const NavLink = styled.a`
  display: block;
  padding: .3em 0;
  line-height: 1.3;
  color: #6c757d;
  &:hover{
    color: #333;
    & > span {
      border-bottom-color: #333
    }
  }
  &.active{
    color: #fc6423;
    &:hover{
      opacity: .7;
      color: #fc6423;
      & > span {
        border-bottom-color: #fc6423
      }
    }
    & > span {
      border-bottom-color: #fc6423;
    }
  }
  & > span {
    display: inline-block;
    max-width: 100%;
    padding: .3em 0;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: solid 1px #6c757d;
  }
`

interface INavsProps {
  directorys: directory[];
  activeId: string;
  handleClickLink: (arg0: string) => void
}

interface IRightNavProps {
  directorys: directory[];
  activeId?: string;
}

const Navs = ({ directorys, activeId, handleClickLink }:INavsProps) => {

  return (
    <NavUl>
      {directorys.map(directory => 
        <NavLi key={directory.id}>
          <NavLink href={`#${directory.id}`} className={activeId === directory.id ? 'active' : ''} onClick={() => handleClickLink(directory.id)}>
            <span title={directory.text}>{directory.text}</span>
          </NavLink>
          {!Array.isArray(directory.childrens) ? '' :
            <Navs directorys={directory.childrens} activeId={activeId}  handleClickLink={handleClickLink} />
          }
        </NavLi>
      )}
    </NavUl>
  )
}


const RightNav = ({ directorys, activeId }:IRightNavProps) => {
  let mainOffsetTop = 0
  const navEl = useRef(null)
  const [hash, setHash] = useState(decodeURIComponent(window.location.hash).replace('#', ''))

  const handleClickLink = (id:string) => {
    setHash(id)
  }

  useEffect(() => {
    const listenerScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      if (navEl) {
        const diffTop = mainOffsetTop - scrollTop
        if (diffTop <= 0) {
          navEl.current.style.top = '0'
        } else {
          navEl.current.style.top = `${diffTop}px`
        }
      }
    }
    window.addEventListener('scroll', listenerScroll)

    return () => {
      window.removeEventListener('scroll', listenerScroll)
    }
  }, [])

  const setMainOffsetTop = (ref:any) => {
    if (ref) {
      mainOffsetTop = ref.offsetTop
    }
  }

  return (
    <Main ref={setMainOffsetTop}>
      <NavWrap ref={navEl}>
        {directorys.length ?
          <Navs directorys={directorys} activeId={hash} handleClickLink={handleClickLink} /> :
          <Skeleton />
        }
      </NavWrap>
    </Main>
  )
}

export default RightNav