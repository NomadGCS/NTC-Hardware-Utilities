import { useTranslation } from 'react-i18next'

// This file sets up the I18N language provider
// https://react.i18next.com/
/**
 * @deprecated Use `{ useTranslation } from 'react-i18next'` instead
 */
function useI18n() {
    const { i18n } = useTranslation()

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    const getCurrentLanguage = () => {
        return i18n.language
    }

    return { ...useTranslation(), changeLanguage, getCurrentLanguage }
}

export default useI18n
