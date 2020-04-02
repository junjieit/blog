import shortid from 'shortid'

export function getRandom() {
  return shortid.generate()
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}

export function isPro() {
  return process.env.NODE_ENV === 'production'
}