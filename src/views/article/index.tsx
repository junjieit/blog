import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IArticles } from '../../App'
import ConfigContext from '../../ConfigContext'
import PageParcel from '../../template/PageParcel'
import { screenFit } from '../../util/screen'
import Main from './main'
import RightNav from './RightNav'
import { directory } from './type'

const getDirectoryIds = (directorys:directory[]) => {
  let ids:string[] = []
  directorys.forEach(directory => {
    const { id, childrens } = directory
    ids.push(id)
    if (Array.isArray(childrens)) {
      ids = [
        ...ids,
        ...getDirectoryIds(childrens)
      ]
    }
  })
  return ids
}

function useScrollActiveId(directorys: directory[], doc: string) {
  const [activeId, setActiveId] = useState('')

  // 滚动判断选中目录
  useEffect(() => {
    const listenerScroll = () => {
      const ids = getDirectoryIds(directorys)
      let idsLen = ids.length
      let resultActiveId = ''
      if (idsLen) {
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.body.clientHeight
        const compareTop = scrollTop - clientHeight / 2
        resultActiveId = ids[0]
        while (idsLen > 0) {
          idsLen--
          const id = ids[idsLen]
          const idOffsetTop = document.getElementById(id).offsetTop
          if (idOffsetTop <= compareTop) {
            resultActiveId = id
            idsLen = 0
          }
        }
        if (resultActiveId !== activeId) {
          setActiveId(resultActiveId)
        }
      }
    }
    window.addEventListener('scroll', listenerScroll)

    return () => {
      window.removeEventListener('scroll', listenerScroll)
    }
  }, [doc])

  return activeId
}

const Article = () => {
  const { id } = useParams()
  const [directorys, setDirectorys] = useState([])
  const [doc, setDoc] = useState('')
  const activeId = ''

  useEffect(() => {
    return () => {
      document.querySelector('title').innerText = 'junjie'
    }
  }, [])

  const getArticle = (articles:IArticles) => {
    let result
    Object.values(articles).some(articleGroup => {
      const article = articleGroup[id]
      if (article) {
        result = article
        return true
      }
    })
    if (!result) return ''
    const { prevFolderName, title, directorys } = result
    document.querySelector('title').innerText = title
    if (!doc) {
      fetch(`/docs${prevFolderName}/${title}.html`, { // 在URL中写上传递的参数
        method: 'GET'
      })
      .then((res)=>{
        return res.text()
      })
      .then((res)=>{
        setDoc(res)
        setDirectorys(directorys)
      })
    }
    return ''
  }
  const pageParcelProps:any = {}
  if (!screenFit('small')) {
    pageParcelProps.right = <RightNav directorys={directorys} activeId={activeId} />
  }

  return (
    <PageParcel {...pageParcelProps}>
      {/* <LeftInfo /> */}
      <ConfigContext.Consumer>
        {({ articles }) => getArticle(articles)}
      </ConfigContext.Consumer>
      <Main doc={doc} />
    </PageParcel>
  )
}

export default Article