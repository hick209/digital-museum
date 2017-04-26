import locales from './locales'

const fallbackLanguage = 'pt-BR'

let translations = locales[navigator.language]

if (!translations) {
  const languages = navigator.languages
  for (let i = 0; i < languages.length; i++) {
    translations = locales[languages[i]]
    if (translations) break
  }
}

translations = translations || locales[fallbackLanguage]


const strings = translations

export default strings
