import { createContext } from 'react'
import { IConfig } from './App'

const ConfigContext = createContext<IConfig>({
  navs: [],
  articles: {}
})

export default ConfigContext