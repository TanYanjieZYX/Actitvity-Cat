import i18next from 'i18next'
import { firstLetterUpper } from './utils/firstLetterUpper'

const env = process.env
let LANGUAGE = process.env.LANGUAGE
LANGUAGE = typeof LANGUAGE === 'string' ? JSON.parse(LANGUAGE) : LANGUAGE

const { defaultLng, resources } = LANGUAGE

i18next.init({
  lng: defaultLng,
  fallbackLng: defaultLng,
  defaultNS: 'common',
  keySeparator: false,
  debug: env.NODE_ENV === 'development',
  resources,
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  }
})

function isMatch(str, substr) {
  return str.indexOf(substr) > -1 || str.toLowerCase().indexOf(substr) > -1
}

export const changeLanguage = locale => {
  i18next.changeLanguage(locale)
}

// Uppercase the first letter of every word. abcd => Abcd or abcd efg => Abcd Efg
export const tUpper = (str, allWords = true) => {
  return firstLetterUpper(i18next.t(str), allWords)
}

// Uppercase all letters. abcd => ABCD
export const tUpperCase = str => {
  return i18next.t(str).toUpperCase()
}

export const translate = (str, funcName = 'default') => {
  if (!['tUpper', 'tUpperCase'].includes(funcName)) funcName = 'default'
  try {
    return {
      tUpper: tUpper,
      tUpperCase: tUpperCase,
      default: str => i18next.t(str)
    }[funcName](str)
  } catch (error) {
    console.error(error)
    return str
  }
}

export const loadResource = lng => {
  let p

  return new Promise((resolve, reject) => {
    if (isMatch(defaultLng, lng)) resolve()

    switch (lng) {
      case 'id':
        p = import('../i18n/locales/en.json')
        break
      default:
        p = import('../i18n/locales/id.json')
    }

    p.then(data => {
      i18next.addResourceBundle(lng, 'common', data)
      changeLanguage(lng)
    })
      .then(resolve)
      .catch(reject)
  })
}

export default i18next
