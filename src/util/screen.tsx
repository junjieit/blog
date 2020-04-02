interface IMedia {
  [key: string]: number
}

const media:IMedia = {
  small: 600,
  medium: 1024,
  large: 1440,
  xlarge: 1920,
}

export function screenFit(prev:string, curr?: string) {
  const { clientWidth } = document.documentElement
  if (!media[prev]) return false
  if (curr) {
    if (!media[curr]) return false
    return clientWidth >= media[prev] && clientWidth <= media[curr]
  }
  return media[prev] >= clientWidth
}

export function screenFitMedia(prev:string, curr?: string) {
  if (!media[prev]) return ''
  if (curr) {
    if (!media[curr]) return ''
    return `(${media[prev]}px <= width <= ${media[curr]}px)`
  }
  return `(max-width: ${media[prev]}px)`

}