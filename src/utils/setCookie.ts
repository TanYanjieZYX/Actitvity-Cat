export function setCookie(name, value, time) {
  let now = new Date()
  let offset = 8
  let utc = now.getTime() + now.getTimezoneOffset() * 60000
  let nd = utc + 3600000 * offset
  let exp = new Date(nd)
  let domain = document.domain
  exp.setTime(exp.getTime() + time * 1000)
  document.cookie = `${name}=${value};path=/;${
    time ? `expires=${exp.toGMTString()}` : ''
  };domain=${domain};`
}
