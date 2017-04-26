import locales from './locales'

const fallbackLanguage = 'pt-BR'
const currentLanguage = navigator.language

const strings = locales[currentLanguage] || locales[fallbackLanguage]

export default strings
