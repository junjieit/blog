import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getData } from '../ajax'
import ConfigContext from '../ConfigContext'
import Footer from '../template/footer'
// import LeftInfo from './template/LeftInfo'
import TopNav from '../template/topNav'

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

const App = (props: any) => {
  const [data, setData] = useState<IConfig>({
    navs: [],
    articles: {}
  })

  useEffect(() => {
    getData('/config.json').then((result:any) => {
      setData(result)
    })
  }, [])

  const { navs } = data

  return (
    <OuterParcel>
      <TopNav navs={navs} />
      <ConfigContext.Provider value={data}>
        {props.children}
      </ConfigContext.Provider>
      <Footer />
    </OuterParcel>
  )
}

export default App