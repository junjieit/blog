import React, { useEffect, useState } from 'react'
import { Route, Switch, useLocation } from "react-router-dom"
import styled, { ThemeProvider } from 'styled-components'
import { getData } from './ajax'
import ConfigContext from './ConfigContext'
import { GlobalStyle, theme } from './styledGlobal'
import Footer from './template/footer'
// import LeftInfo from './template/LeftInfo'
import TopNav from './template/topNav'
import Article from './views/article'
import Home from './views/home'
import MdEditor from './views/mdEditor'


const OuterParcel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export interface INav {
  readonly id: string;
  name: string;
  childrens: INav[];
}

export interface Idirectory {
  readonly id: string;
  text: string;
  level: number;
}

export interface IDirectorys {
  [propName: string]: Idirectory;
}

export interface IArticle {
  readonly id: string;
  readonly navsId: string;
  path: string;
  title: string;
  prevFolderName: string;
  directorys: IDirectorys[];
}

export interface IArticles {
  [propName: string]: {
    [propName: string]: IArticle
  };
}

export interface IConfig {
  navs: INav[];
  articles: IArticles;
}

function useGtagConfig() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.gtag('config', 'UA-112099216-2', { page_path: pathname })
  }, [pathname])
}

const App = () => {
  const [data, setData] = useState<IConfig>({
    navs: [],
    articles: {}
  })
  useGtagConfig()

  useEffect(() => {
    getData('/config.json').then((result:any) => {
      setData(result)
    })
  }, [])

  const { navs } = data

  return (
    <ThemeProvider theme={theme}>
      <OuterParcel>
        <GlobalStyle />
        <TopNav navs={navs} />
        <ConfigContext.Provider value={data}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home/:id">
              <Home />
            </Route>
            <Route path="/article/:id">
              <Article />
            </Route>
            <Route path="/editor">
              <MdEditor />
            </Route>
            {/* <Route path="*">
              <NoMatch />
            </Route> */}
          </Switch>
        </ConfigContext.Provider>
        <Footer />
      </OuterParcel>
    </ThemeProvider>
  )
}

export default App