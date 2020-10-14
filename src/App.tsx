import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from "react-router-dom"
import { ThemeProvider } from 'styled-components'
import Basic from './layout/Basic'
import { GlobalStyle, theme } from './styledGlobal'
// import LeftInfo from './template/LeftInfo'
import Article from './views/article'
import Home from './views/home'
import MdEditor from './views/mdEditor'

function useGtagConfig() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.gtag('config', 'UA-112099216-2', { page_path: pathname })
  }, [pathname])
}

const App = () => {
  useGtagConfig()


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Basic>
            <Home />
          </Basic>
        </Route>
        <Route path="/home/:id">
          <Basic>
            <Home />
          </Basic>
        </Route>
        <Route path="/article/:id">
          <Basic>
          <Article />
          </Basic>
        </Route>
        <Route path="/editor">
          <MdEditor />
        </Route>
        {/* <Route path="*">
          <NoMatch />
        </Route> */}
      </Switch>
    </ThemeProvider>
  )
}

export default App