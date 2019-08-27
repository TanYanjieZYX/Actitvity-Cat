import URL from 'url'
import qs from 'qs'

const isEmptyObject = obj => {
  for (var n in obj) {
    return false
  }
  return true
}

export const mergeQueryInUrl = (url, query) => {
  if (!(query && String(query))) return url
  if (isEmptyObject(query)) return url
  if (typeof query === 'object') {
    const urlObject = URL.parse(url)
    const queryObject = qs.parse(urlObject.query)

    Object.assign(queryObject, query)

    urlObject.search = `?${qs.stringify(queryObject)}`

    return URL.format(urlObject)
  }
  return url + (url.includes('?') ? '&' : '?') + query
}
