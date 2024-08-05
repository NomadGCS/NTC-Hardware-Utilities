/**

 LIST FORMAT:
 {
    path: 'location.streetside',
    value: 'Streetside'
 },

 Lists we need:
 1.  Main List
        - module.x.name
        - module.x.name_other
        - preconditions -> flattened

 2.  Description List
        - module.x.name
        - module.x.variants -> flattened

 3.  Location List
         - location -
         - common -> flattened
         - misc

 4.  Display Formats
          - display

 */
        import {english} from "../../i18n/translations/en/us";


        export const isEmpty = (obj) => {
            return (Object.keys(obj).length === 0);
        }
          
          
        export const sortArray = (arr) => {
            return arr.sort((a,b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()));
        }
        
        
        /**
         * Summary:  Takes a nested object, and converts to a single dimensional array.
         *           Used for dropdowns.
         *           @Andrew - https://stackoverflow.com/questions/33036487/one-liner-to-flatten-nested-object
         * @param obj
         * @returns {{}}
         */
        export function flattenObject(obj) {
            const result = {};
            for (const key of Object.keys(obj)) {
                if (typeof obj[key] === 'object') {
                    const nested = flattenObject(obj[key]);
                    for (const nestedKey of Object.keys(nested)) {
                        result[`${key}.${nestedKey}`] = nested[nestedKey];
                    }
                } else {
                    result[key] = obj[key];
                }
            }
            return result;
        }
          
          
        /**
         * Summary:  Takes an object and returns a one dimensional array of path/value objects to
         *           be used for dropdowns.
         * @param leafName - ex "modules".  This is the object key being traversed and gets added to the path variable.
         * @param obj - Objecct to traverse.
         * @param regexStr - used to filter results (ex. give me only modules.name* instead of all modules.*)
         * @returns {*[]}
         */
        export function getTranslationDropdownValues(leafName, obj, regexStr = null) {
            let result = [];
        
            const flatObject = flattenObject(obj);
        
            for (const property in flatObject) {
                const path = `${leafName}.${property}`;
                const value = `${flatObject[property]}`
        
                let match = true;
                if (regexStr) {
                    match = new RegExp(regexStr).test(path);
                }
                if (match) {
                    result.push(
                        {
                            path,
                            value
                        }
                    )
                }
            }
            return result;
        }
        
        
        export function loadTranslations() {
            //console.log('LoadTranslations: ', english);

            const moduleNameList  = getTranslationDropdownValues("modules", english.translation.modules, "modules\.([a-zA-Z]+)\.name");
            const variantList  = getTranslationDropdownValues("modules", english.translation.modules, "modules\.([a-zA-Z]+)\.variants");
            const preconditionList  = getTranslationDropdownValues("preconditions", english.translation.preconditions);
            const locationList = getTranslationDropdownValues("location", english.translation.location);
            const miscList = getTranslationDropdownValues("misc", english.translation.misc);
            const commonList = getTranslationDropdownValues("common", english.translation.common);
            const displayList = getTranslationDropdownValues("display", english.translation.display);
        
            const lists = {
                moduleNameList, variantList, preconditionList, locationList, miscList, commonList, displayList
            }

            //console.log('Lists: ', lists);
            return lists;
        }
          