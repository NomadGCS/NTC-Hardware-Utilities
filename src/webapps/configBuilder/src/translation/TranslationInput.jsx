export default function TranslationInput({ data, type, lists, rhf }) {
    return (<div>Translation Input</div>)
}


// import React, {useEffect, useState} from 'react'
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";

// import useI18n from "../../../../i18n/useI18n";
// import {translateKey} from "../../../../i18n/translations/Translation";
// import {useTheme} from "@mui/material";
// import NTCButton from "../../../inputs/buttons/NTCButton";
// import BaseModalDialog from "../../../display/modals/BaseModalDialog";

// import TranslationControls from "./TranslationControls"
// import DisplayFormatSelector from "./DisplayFormatSelector";

// import Label from "../misc/ConfigLabel"
// import {isEmpty, sortArray} from "./TranslationUtils";


// export default function TranslationInput({ data, type, lists, rhf }) {
//     const {register, setValue } = rhf;
//     const theme = useTheme();
//     const nomadRed = theme.palette.custom.nomadRed;
//     const { t } = useI18n()

//     const [showModal, setShowModal] = useState(false);
//     const [translationJSON, setTranslationJSON] = useState({...data})

//     // Name after undergoing translation
//     const [translatedValue, setTranslatedValue] = useState("")

//     // Which displayFormat is selected
//     const [displayFormatIndex, setDisplayFormatIndex] = useState(0)

//     // dropdown values -> list of values, some may not be shown, depending on what display format is selected
//     const [dropDownValues, setDropDownValues] = useState([]);
//     const [textValues, setTextValues] = useState([]);
//     const [translationLists, setTranslationLists] = useState(lists)
//     const [filteredOptions, setFilterOptions] = useState({})
//     const [debugMode, setDebugMode] = useState(false);

//     // REACT-HOOK-FORM  --> This needs to match the name in the configSchema
//     const RHF_NAME = type;
//     const shortenedType = type.split(".").pop();

//     const handleSave = () => {

//         // this is how react-hook-form knows to add it into formData
//         register(RHF_NAME, { value: translationJSON })
//         // setValue(RHF_NAME, translationJSON);

//         setShowModal(false);
//     }

//     const handleCancel = () => {
//         setTranslationJSON(data);           // reset the json since user doesn't want it to save
//         setShowModal(false);
//     }

//     const handleDropdownUpdates = (key, value, params) => {

//         //console.log('jb handleDropdownUpdates: ', key, value, params );

//         // Dropdown values
//         const newDropDownValues = updateState(dropDownValues, key, value);
//         setDropDownValues(newDropDownValues);

//         // Params
//         if (params) {
//             const newTextValues = updateState(textValues, key, params);
//             setTextValues(newTextValues);
//         }
//         else {
//             // Delete the textValue associated with this key
//             let newTextValues = textValues.filter( item => item.key !== key);
//             setTextValues(newTextValues);
//         }

//         //console.log('jb handleDropdownUpdates: ', key, value, dropDownValues, newDropDownValues);
//     }

//     const updateState = (state, key, value) => {
//         // Make a duplicate so we don't accidentally change the original thing
//         let newState = structuredClone(state);

//         let existingValue = newState.find(item => item.key === key);
//         if (existingValue) {
//             // Update existing item
//             existingValue.value = value;
//         }
//         else {
//             // New item
//             newState.push( { key: key, value: value});
//         }

//         // handle deletes ---> Is this actually used?
//         newState = newState.filter( item => item.value !== '-delete-');

//         return newState;
//     }


//     // filter lists when type (name vs location vs precondition) changes
//     useEffect(() => {
//         filterTranslationLists(shortenedType);
//     }, [shortenedType])


//     useEffect(() => {
//         console.log('jb json: ', translationJSON);

//         // inspect incoming JSON to see if it has any existing values we need to save
//         let json = structuredClone(translationJSON);
//         let existingDropdownValues = [];
//         const existingTextValues = [];
//         let keyValue = "";
//         if (json && json.value && json.value.startsWith('display.')) {
//             // Do nothing -> This is the "normal", easier, path to deal with.
//         }
//         else {
//             // Single value JSON which is the name / location1 field.
//             // Need to change the json temporarily to match the normal path.
//             keyValue = shortenedType.toLowerCase();
//             if (shortenedType === "Location") keyValue += "1";           // HACK

//             let newJson = {};
//             newJson = {
//                 "value": keyValue,
//                 "params": json
//             }
//             json = newJson;
//         }

//         if (json?.params) {
//             let lastValidKey = keyValue ?? "name";      // HACK
//             let entries = Object.entries(json.params);
//             entries.map((item) => {
//                 if (item[1].params) {
//                     existingTextValues.push({ key: item[0], value: JSON.stringify(item[1].params) });
//                 }

//                 if (item[0] === "params") {
//                     existingTextValues.push({ key: lastValidKey, value: JSON.stringify(item[1]) });
//                     return;
//                 }

//                 if (item[1].value) {
//                     existingDropdownValues.push({key: item[0], value: item[1].value});
//                 }
//                 else {
//                     existingDropdownValues.push({key: lastValidKey, value: item[1]});
//                 }
//             })
//             console.log('jb dropdown values: ', existingDropdownValues, " | Text Values: ", existingTextValues);
//         }

//         setDropDownValues(existingDropdownValues);
//         setTextValues(existingTextValues);

//     }, [])


//     const filterTranslationLists = (shortenedType) => {
//         let moduleNames = [];
//         let locations = [];
//         let descriptions = [];
//         let displayFormats = [];

//         const lists = translationLists;
//         if (isEmpty(lists)) {
//             // safety check -> stop if react state does not have the values we need.  Due to the timing of React.useEffect
//             // and React.useState, things may not be set properly, but will be next time.
//             return;
//         }

//         // Start creating basic lists of dropdown options we need
//         moduleNames = sortArray(lists.moduleNameList.concat(lists.preconditionList));
//         locations = sortArray(lists.locationList.concat(lists.commonList, lists.miscList));
//         descriptions = sortArray(lists.miscList.concat(lists.variantList));

//         // Depending on the type of Translation Input (Name, Location, Precondition), we only want certain display
//         // formats and values
//         if (shortenedType.toLowerCase() === "name") {
//             const nameDisplays = lists.displayList.filter(i => !i.path.includes('location'));
//             displayFormats = [{path: 'name', value: '{{name}}'}].concat(nameDisplays);
//         }
//         else if (shortenedType.toLowerCase() === "location") {
//             const locationDisplays = lists.displayList.filter(i => i.path.includes('location'));
//             displayFormats = [{path: 'location1', value: '{{location1}}'}].concat(locationDisplays);
//         }
//         else {
//             const nameDisplays = lists.displayList.filter(i => !i.path.includes('location'));
//             displayFormats = [{path: 'name', value: '{{name}}'}].concat(nameDisplays);
//         }

//         // these values are what will show up in the translation modal dropdowns
//         const options = {  displayFormats, moduleNames, locations, descriptions }
//         setFilterOptions(options);

//         // figure out what display format is being used
//         calculateDisplayIndex(displayFormats);
//     }

//     const calculateDisplayIndex = (displayFormatList) => {
//         // figure out which display format to use
//         let display = 0;

//         for (let i = 0; i < displayFormatList?.length; i++) {
//             if (translationJSON?.value?.includes(displayFormatList[i].path)) {
//                 display = i;
//             }
//         }
//         setDisplayFormatIndex(display);
//     }


//     // when translation JSON changes, translate name
//     useEffect(() => {
//         const tName = translateKey(t, translationJSON);
//         setTranslatedValue(tName);
//     }, [translationJSON])


//     // when display format type changes, recalculate the translation json
//     useEffect(() => {

//         if (isEmpty(filteredOptions)) {
//             // safety check -> stop if react state does not have the values we need.  Due to the timing of React.useEffect
//             // and React.useState, things may not be set properly, but will be next time.
//             return;
//         }

//         // Single Value Translation
//         if (displayFormatIndex === 0) {

//             // Search through the list of existing dropdown values for (name / location1).  If unable to find,
//             // set the value as whatever it previously was.
//             let path = filteredOptions.displayFormats[displayFormatIndex].path;
//             let newValue = dropDownValues.find(i => i.key === path);
//             if (!newValue) {
//                 newValue = { "value": translationJSON?.value }
//             }

//             let newJSON = {};

//             // does this name/value have any textValues (parameters) associated with it?
//             const existingValue = textValues.find(i => i.key === path);
//             if (existingValue) {
//                 const textValue = JSON.parse(existingValue.value);
//                 newJSON = {
//                     "value": newValue?.value,
//                     "params": textValue
//                 }
//             }
//             else {
//                 newJSON = {
//                     "value": newValue?.value
//                 };
//             }

//             setTranslationJSON(newJSON);

//             //exit the useEffect
//             return;
//         }


//         // Translation with Params
//         let value = filteredOptions.displayFormats[displayFormatIndex].value;
//         let path = filteredOptions.displayFormats[displayFormatIndex].path;
//         const params = [];

//         // Look through each field in the display format and copy over existing dropdown values.
//         let fields = value.split(" ")
//         fields.forEach((field) => {
//             if (field !== "-") {
//                 const strippedField = field.replace("{{", "").replace("}}", "");

//                 // Check if it has a stored value
//                 const existingValue = dropDownValues.find(i => i.key === strippedField);
//                 if (existingValue) {
//                     params.push(existingValue);
//                 }
//                 else {
//                     params.push({ key: strippedField, value: ''})
//                 }
//             }
//         })


//         // create new JSON to display
//         let newJSON = {
//             "value": path
//         };
//         if (params.length > 0) {
//             newJSON.params = {};
//             params.forEach(param => {

//                 // does this name/value have any textValues associated with it?
//                 const existingValue = textValues.find(i => i.key === param.key);
//                 if (existingValue) {
//                     const textValue = JSON.parse(existingValue.value);
//                     newJSON.params[param.key] = {
//                         "value": param.value,
//                         "params": textValue
//                     }
//                 }
//                 else {
//                     newJSON.params[param.key] = {"value": param.value}
//                 }
//             })
//         }
//         setTranslationJSON(newJSON);

//     }, [displayFormatIndex, dropDownValues, textValues]);


//     const glacierBlue = "#0079bd";
//     const buttonColor = (translatedValue && translatedValue.length > 0) ? glacierBlue : theme.palette.custom.nomadRed;

//     return (
//         <Stack direction='row'>

//             {/*<input type='hidden' value={data} name={RHF_NAME} {...register(RHF_NAME)}/>*/}

//             <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px'}}>
//                 {translatedValue}
//             </Box>
//             <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '5px'}}>
//                 <NTCButton text={'Edit'} backgroundColor={buttonColor} onClick={() => {setShowModal(true)}}></NTCButton>
//             </Box>
//             {showModal &&
//                 <BaseModalDialog open={showModal} handleClose={() => setShowModal(false)}
//                                  modalTitle={'Edit Translated Text'} maxWidth={'xl'}
//                 >
//                     {/*  DISPLAY STRUCTURE  */}
//                     <Box sx={{minWidth: '50vw'}}>
//                         <DisplayFormatSelector selectedIndex={displayFormatIndex} options={filteredOptions} update={(index) => {setDisplayFormatIndex(index)}} />
//                         <Box sx={{border: '1px solid #ccc', padding: '10px'}}>
//                             <TranslationControls type={shortenedType} options={filteredOptions} displayFormat={filteredOptions?.displayFormats[displayFormatIndex]} values={dropDownValues} textValues={textValues} updates={handleDropdownUpdates}/>
//                         </Box>
//                     </Box>

//                     {/*  DROPDOWN VALUES */}
//                     {debugMode &&
//                         <>
//                             <Box sx={{
//                                         borderTop: '1px solid #ccc', marginTop: '10px', padding: '10px 0px',
//                                         borderBottom: '1px solid #ccc', marginBottom: '10px'
//                                     }}>
//                                 <label>Dropdown Values:</label>
//                                 {dropDownValues.map(item => (
//                                     <Box key={crypto.randomUUID()}>
//                                         {item.key} - {item.value}
//                                     </Box>
//                                 ))}
//                             </Box>

//                             <Box sx={{
//                                 borderBottom: '1px solid #ccc', marginBottom: '10px'
//                             }}>
//                                 <label>Text Values:</label>
//                                 {textValues.map(item => (
//                                     <Box key={crypto.randomUUID()}>
//                                         {item.key} - {item.value}
//                                     </Box>
//                                 ))}
//                             </Box>
//                         </>
//                     }

//                     {/*  LIVE RESULT  */}
//                     <Box sx={{marginTop: '2em'}}>
//                         <p style={{textAlign:'center', fontSize: '1.2em', color: nomadRed}}>
//                             {translatedValue}
//                         </p>
//                     </Box>

//                     {/*  JSON  */}
//                     <Box sx={{minWidth: '50vw', marginTop: '0em'}}>
//                         <Stack direction='row' sx={{justifyContent: 'space-between'}}>
//                             <Label>JSON</Label>
//                             {/*<Label><span>Result: </span><span style={{color: 'firebrick'}}>{translatedValue}</span></Label>*/}
//                         </Stack>
//                         <Box>
//                             <textarea
//                                 disabled
//                                 style={{width: '100%', height: '14em'}}
//                                 value={JSON.stringify(translationJSON, null, 2)}
//                             />
//                         </Box>

//                     </Box>

//                     {/*  VALUE & ACTION */}
//                     <Box sx={{minWidth: '50vw', marginTop: '0em'}}>
//                         <Stack direction={'row'} sx={{justifyContent: 'flex-end'}}>
//                             <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '0.5em'}}>
//                                 <div className="tertiary-button" style={{color: `${theme.palette.custom.nomadRed}`}} onClick={handleCancel}>
//                                     Cancel
//                                 </div>
//                                 <NTCButton text={'Save'} backgroundColor={theme.palette.custom.nomadRed} onClick={handleSave}></NTCButton>
//                             </Box>
//                         </Stack>
//                     </Box>
//                 </BaseModalDialog>
//             }
//         </Stack>
//     )
// }