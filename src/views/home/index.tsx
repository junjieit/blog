import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { IArticle, IArticles, IConfig, INav } from '../../App'
import Card from '../../components/Card'
import ContentWrap from '../../components/ContentWrap'
import ConfigContext from '../../ConfigContext'
import PageParcel from '../../template/PageParcel'
import { screenFitMedia } from '../../util/screen'


const MainCard = styled(Card)`
  flex: 1;
  min-height: 70vh;
`

const NavUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0 !important;
  li {
    list-style: none !important;
    &:not(first-child) {
      margin-right: 3em;
    }
  }
  @media ${screenFitMedia('small')} {
    margin-left: 3em !important;
    display: block;
    li {
      line-height: 1.2;
      list-style: disc !important;
    }
    li + li {
      margin: .7em 0  0;
    }
  }
`

const NavLink = styled(Link)`
  /* color: rgba(0, 0, 0, .6);
  font-weight: 500; */
  line-height: 1;
`

interface IMatchArticleResult {
  id: string;
  title: string;
  articleGroup: {
    [propName: string]: IArticle;
  }
}

function matchArticleByNavs(navs:INav[], articles: IArticles) {
  let results:IMatchArticleResult[] = []

  navs.forEach(nav => {
    const { id } = nav
    const articleGroup = articles[id]
    if (nav.childrens.length) {
      const childrenResults = matchArticleByNavs(nav.childrens, articles)
      results = [
        ...results,
        ...childrenResults
      ]
    } else {
      results.push({
        id,
        title: nav.name,
        articleGroup,
      })
    }
  })
  return results
}

const getMatchArticle = function({ navs, articles }:IConfig, id:string) {
  let matchNav:INav[] = []
  navs.some(nav => {
    if (nav.id === id) {
      matchNav.push(nav)
      return true
    }
  })
  if (!matchNav.length) {
    matchNav = [...navs]
  }
  return matchArticleByNavs(matchNav, articles)
}

const Home = () => {
  const { id } = useParams()
  const config = useContext(ConfigContext)

  const matchArticle = getMatchArticle(config, id)
  return (
    <PageParcel>
      <MainCard>
        <ContentWrap loading={!config.navs.length}>
          {matchArticle.map(item => {
            const { id, title, articleGroup } = item
            return (
              <div key={id}>
                <h3>{title}</h3>
                <NavUl>
                  {Object.values(articleGroup).map(article => (
                    <li key={article.id}><NavLink to={`/article/${article.id}`}>{article.title}</NavLink>  </li>
                  ))}
                </NavUl>
              </div>
            )
          })}
        </ContentWrap>
      </MainCard>
    </PageParcel>
  )
}

export default Home