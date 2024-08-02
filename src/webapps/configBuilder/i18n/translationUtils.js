
/**
 * Responsible for taking in a Key object and returning a formatted string.
 * @param t : Translation object for i18next
 * @param key : object being translated. May have child keys to be translated.
 * @returns : formatted string like 'Awning - Curbside Front' or 'Rack Control - Room 2'
 */
export function translateKey(t, key) {
    // Only translate string values.  Translating a numeric value for keys like 'count'
    // will prevent i18next features like plurals from working.
    if (!key.params) return typeof key.value == 'string' ? t(key.value) : key.value

    const options = {}
    Object.entries(key.params).forEach(([k, v]) => options[k] = translateKey(t, v))

    return t(key.value, options)
}
