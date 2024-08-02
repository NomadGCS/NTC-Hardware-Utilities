import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { english } from './translations/en/us'
// import { Language } from '../generated/client/Language'

i18n
// .use(Backend)
.use(initReactI18next)
.init({
    resources: {
        // en: {
        //     translation: {
        //       "key": "hello world"
        //     }
        //   }
        en: english
        // Custom translation files located in browser/js/src/i18n/translations
        // en and es must match menu items in LanguageChanger.tsx for i18n to work
        //[Language.EN_US]: english        
    },
    debug: true,
    // lng: Language.EN_US,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
        format: function (value, format, lng) {
            if (format === 'uppercase') return value?.toUpperCase()
            return value
        }
    }
})

export default i18n
