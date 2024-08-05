
// Convert System Ids to Label/Value object for Dropdown
export function buildDropdownDefaults(allItems, selectedIds, key) {
    let results = [];

    //console.log('jb buildDropdownDefaults: ', allItems, selectedIds, key)
    if (!selectedIds) return results;

    // Try to find the system objects which matches these ids.
    selectedIds.forEach((id) => {
        let found = allItems.find(s => s[key] === id);
        if (found) {
            results.push(found);
        }
    })

    //console.log('jb buildDropdownDefaults: ', allItems, selectedIds, results)

    return results;
}


/**
 *  Summary:  Fix a side effect of React-Hook-Form where data which should be an object is being stored as an array.
 *  How:      If an array is detected (presets below) and it is not in the list of valid arrays, convert it and its values
 *            to an object.
 *
 * "config": {
 *         "presets": [
 *             null,
 *             "#ffffff",
 *             "#ff0000",
 *             "#0034ff"
 *         ]
 *     }
 * }
 *
 * @param data
 */
export function convertArraysToObjects(data, validArrays) {
    // TODO - Combine this with replaceArrays()
    replaceArrays(data, validArrays);
    return data;
}


/**
 * Summary:  Converts Array to Object and removes any empty elements.  Indexes will be converted to Keys
 *           (array[0] becomes object { "0" : value }).
 * @param obj
 * @returns {{[p: string]: unknown}}
 */
function convertToObject(obj) {
    obj = Object.assign({}, obj);
    let result = Object.fromEntries(Object.entries(obj).filter(([_,v]) => v != null));

    if (Object.values(result).filter(item => (item !== "" && item !== '-delete-')).length === 0) {
        return null;
    }

    return result;
}


/**
 * Summary: Traverses an Object and converts any nested arrays into Objects, unless they are listed as a valid array
 *          (systemIds).
 *
 * Why:     In some cases, React-Hook-Form is sending back formData as arrays (with holes) instead of nested Objects.
 *           "config": {
 *                  "presets": [
 *                       null,
 *                       "#ffffff",
 *                       "#ff0000",
 *                      "#0034ff"
 *                  ]
 *              }
 *
 * @param obj :  Object to be modified.
 */
function replaceArrays(obj, validArrays) {
    for (var key in obj) {
        // Convert any arrays that are not in the safe list to Objects
        if ( obj[key] instanceof Array ) {
            // Sometimes arrays are OK.  Check the whitelist before converting.
            if (!validArrays.includes(key)) {
                obj[key] = convertToObject(obj[key]);
            }
        }
        if (typeof obj[key] == 'object') {
            replaceArrays(obj[key], validArrays)
        }
    }
}

function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}



// --------------------------------------------------------------------------------------------------------------------

/**
 * Summary:  Purpose is to update the data object for this filter and pass it back up to its parent.
 *           Without this, the parent may accidentally overwrite this value.
 * @param {JSON} data: JSON object containing a leaf that needs to be updated
 * @param {int} index: Index in array of the JSON object to be updated.  Used by HOC.
 * @param {string} val: new value at a particular leaf in JSON object.
 * @param {string} location: path to the leaf in JSON object.
 * @param {function} handleUpdates: Function used by HOC to update this data (simulates Two way binding).
 */
export const updateDataAndHOC = ({data, index, val, location, handleUpdates}) => {
    console.log('jb updateDataAndHOC: ', 'data: ', data, ' index: ', index, " UpdatedVal: ", val, " Location: ", location);

    // create a copy so we don't modify the original data
    let newData = structuredClone(data);

    // update the json
    newData = updateLeaf(newData, location, val);

    // update parent component
    handleUpdates(index, newData);

    return newData;
}

/**
 *
 * Summary:  This is used to update the config with new values.
 * @param obj : JSON object containing config which needs to be updated
 * @param path :  string path to object to be updated ('meta.id')
 * @param value :  value to set ('Lights - Red')
 * @returns {*}:  JSON object containing the updated config
 *
 *  Source: https://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object
 *         (search 'Inspired by @bpmason1's answer')
 */
export function updateLeaf(obj, path, value) {
    const pList = path.split('.');
    const key = pList.pop();
    const pointer = pList.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
        return accumulator[currentValue];
    }, obj);
    pointer[key] = value;
    return obj;
}

export function deleteLeaf(obj, path) {
    const pList = path.split('.');
    const key = pList.pop();
    const pointer = pList.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
        return accumulator[currentValue];
    }, obj);
    delete pointer[key];
    return obj;
}

/**
 * Summary:         Traverses an object to a given leaf node path and returns the value.
 *                  This is used to build the initial edit form object with existing values.
 *
 *                  Original code came from StackOverflow (updateLeaf above).
 *
 * @param obj :     Object to traverse.  ex:  { meta {id: 'light' } }
 * @param path :    String representing the flat path to a leaf node.  ex:  ('meta.id').
 * @returns {any} : Value of the leaf node.  ex: 'light'
 */

export function getValueAtLeaf(obj, path) {
    let result = null;
    try {
        const pList = path.split('.');
        const key = pList.pop();
        const pointer = pList.reduce((accumulator, currentValue) => {
            if (accumulator[currentValue] === undefined) {
                return null;
            }
            return accumulator[currentValue];
        }, obj);

        if (typeof pointer[key] !== 'undefined') {
            result = pointer[key];
        }

    }
    catch(e) {
        // bury any errors from trying to access invalid indices.
    }
    return result;
}


// --------------------------------------------------------------------------------------------


/**
 * Purpose:  This is how dropdown values are cleared.  When user selects -delete- in a dropdown,
 *           remove that field from JSON.  Also prevents empty Number inputs from showing up as Null, and empty text inputs
 *           from showing up as "".
 * @param obj
 * @returns {any}
 */
export function sanitize(obj) {
    // Safety check
    if (!obj || obj === "" || obj === null) {
        return obj;
    }

    // hijack the JSON parse function to remove any keys that are marked for deletion.
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        let result = value;

        // remove any keys that are blank or have delete flag or empty.
        if ((value === null || value === "" || value === "-delete-" || Number.isNaN(value))) {
            result = undefined;
        }
        return result;
    }));
}


/**
 * Summary:  Transform form data into data the UI is expecting.
 * @param value (JSON):  JSON Form Data
 * @param type (int):  Input Type from the Schema
 * @returns {any[]}
 */
export function convertValues(value, type, prevValue) {
    let result = value;

    if (type === 'multiselect') {
        // values from multiselect come in as label / value pairs.  return just the values.
        result = Object.values(value).map(s => s.value);
    }

    if (type === "preconditions") {
        /*
            Preconditions[] get passed in every form update whether they were updated or not, however, the precondition
            names don't get passed in unless changed (per standard TranslationInput logic).
            Workaround here is to look at the previous values and copy over the old names if they are missing in the new
            list.
         */
        if (value && prevValue) {
            for(let i = 0; i < value.length; i++) {
                if (!value[i].name && i < prevValue.length && prevValue[i].name) {
                    result[i].name = prevValue[i].name;
                }
            }
        }
    }

    // if (type === 'translation') {
    //     // the formdata for translations is "" if they have not been updated, so just put the old value back in.
    //     if (value === "") {
    //         result = prevValue;
    //     }
    // }

    // remove any records with a delete flag (for datatables - hardware inputs, triggers, etc)
    if (type !== 'translation' && typeof value === 'object' && value !== null) {
        result = Object.values(result).filter(item => !item.hasOwnProperty('delete'));
    }

    // anything with a HardwareInputEvent needs to convert arrays to objects
    if (["hardwareInputs", "hardwareOutputs", "triggers"].includes(type)) {
        result = convertArraysToObjects(result, []);
    }

    // search object and remove any blank values (for dropdowns)
    result = sanitize(result);

    return result;
}


/**
 * Summary:  Primary logic to update a form field in the config-builder.  This function updates a single field
 *           from the schema.
 * @param data - Source of record for the data
 * @param formData - updated data from React-Hook-Form (not all of the data are actual updates).
 * @param field - schema entry to an individual field
 */
export function updateField(data, formData, field) {
    console.log('jb updateField', field);

    // Check if the FormData contains an update for this field.
    let formValue = formData[field.label];
    if (formValue !== undefined) {
        // transform the values from the form into the formats needed for the UI
        const prevValue = getValueAtLeaf(data, field.path);
        const newValue = convertValues(formValue, field.type, prevValue);
        updateLeaf(data, field.path, newValue, prevValue);

        // for convenience, there are some values should get copied into a separate path rather than
        // creating a separate field in the schema.  (ex. putting meta.id as the id for readability)
        if (field.additionalPaths) {
            field.additionalPaths.forEach(path => {
                updateLeaf(data, path, newValue);
            });
        }
    }
    else {
        // React-Hook-Form won't tell us about any data that the user didn't change, so this ensures default values
        // like 'type' and system specific data get set.   ***Has the side effect of putting back data user may have deleted. (ex.  Awning.Actions)
        const existingValue = getValueAtLeaf(data, field.path);
        if (!existingValue) {
            updateLeaf(data, field.path, field.value);
        }
    }
}

