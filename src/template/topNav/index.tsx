import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { INav } from '../../App'
import Card from '../../components/Card'
import { screenFitMedia } from '../../util/screen'

const MainCard = styled(Card)`
  display: flex;
  padding: 0 10vw;
  align-items: center;
  height: 2.4rem;
  margin-bottom: ${props => props.theme.space};

  @media ${screenFitMedia('small')} {
    padding: 0 1em;
    overflow-x: scroll;
  }
`

const NavUl = styled.ul`
  display: flex;
`

const NavLi = styled.li`
  white-space: nowrap;
  &:not(:first-child) {
    margin-left: 2em;
  }

  &:last-child {
    margin-right: 1em;
  }
`

const NavLink = styled(Link)`
  color: rgba(0, 0, 0, .6);
  font-weight: 500;
`

interface ITopNavProps {
  navs: INav[] | []
}

const TopNav = (props:ITopNavProps) => {
  const { navs } = props
  return (
    <MainCard>
    <NavUl>
      {process.env.NODE_ENV === 'development' ?
        (<NavLi>
          <NavLink to="/editor">新增</NavLink>
        </NavLi>) : ''
      }
      <NavLi>
        <NavLink to="/">首页</NavLink>
      </NavLi>
      {Object.values(navs).map(item => {
        return (
          <NavLi key={item.id}>
            <NavLink to={`/home/${item.id}`}>{item.name}</NavLink>
          </NavLi>
        )
      })}
    </NavUl>
    </MainCard>
  )
}

export default TopNav