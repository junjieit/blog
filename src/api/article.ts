import { submitData } from '../ajax'

export function addArticle({ params } = {}) {
  submitData('/api/article/add', params)
}