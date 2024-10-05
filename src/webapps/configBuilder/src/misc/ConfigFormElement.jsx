import React, {useState, useEffect, useContext} from 'react'

// MUI
import Box from '@mui/material/Box';
//import {useTheme} from "@mui/material";

// NTC
import FormTextControl from "../base/FormTextControl.jsx";
import FormSwitchControl from "../base/FormSwitchControl.jsx";

// EXTRAS
import {FormMultiSelectControl} from "../base/FormMultiSelectControl.jsx";
import {FormSelectControl} from "../base/FormSelectControl.jsx";
import {buildDropdownDefaults} from "../util/configBuilderUtils";
import ConfigDataTable from "./ConfigDataTable.jsx";
import HardwareInput from "../inputs/HardwareInput.jsx";
import ExclusionInput from "../inputs/ExclusionInput.jsx";
import TriggerInput from "../inputs/TriggerInput.jsx";
import PreconditionInput from "../inputs/PreconditionInput.jsx";
import InterlockMap from "../interlockMap/InterlockMap.jsx";
import TranslationInput from "../translation/TranslationInput.jsx";


/**
 * Summary:  Factory pattern used to create one of many types of inputs.
 * @param data - JSON representing the schema and values of this form element.
 * @param options - Global data that may be needed for a form element (ex.  Modules, Systems)
 * @param rhf - React Hook Form object containing (Register, UnRegister, SetValue, Errors, Control) *
 * @returns {Element}
 * @constructor
 */
 //export default function ConfigFormElement({data, options, register, unregister, setValue, errors, control}) {
export default function ConfigFormElement({data, options, rhf, getModuleSystems}) {
    const {label, type, path, value, values } = data;
    const {register, unregister, setValue, errors, control } = rhf;
    //const theme = useTheme()

    function factory(type, label, path, value) {
        console.log('Factory: ', label, type, path, value);

        if (type === "input") {
            // disable the input
            const readonly = data.readonly ?? false;
            const isNumber = (data?.format === "int" || data?.format === "double" )

            return <>
                <FormTextControl
                    id={label}
                    readonly={readonly}
                    name={label}
                    defaultValue={value}
                    label={label}
                    isNumber={isNumber}
                    {...{
                        register,
                        errors
                    }}
                />
            </>
        }
        else if (type === "separator") {
            const nomadRed = "#CC2027";
            const glacierBlue = "#0079bd";
            return <Box sx={{margin: '10px 0', border: `14px solid ${glacierBlue}`, borderRadius: '4px'}}></Box>
        }
        else if (type === "dropdown") {
            let dropDownOptions= [];
            if (options && options[values]) {
                // set options from dynamic global variable
                dropDownOptions = options[values];
            }
            else {
                // set options as defined in schema
                dropDownOptions = data.defaultOptions.map(item => {
                    return { label: item, value: item }
                });
            }

            let dropDownValue = value;
            if (!dropDownValue) {
                dropDownValue = [];
            }

            let defaultValues = buildDropdownDefaults(dropDownOptions, [dropDownValue], "label")[0]?.value ?? null;
            //console.log('jb defaultValues: ', defaultValues)

            // Disable the input (ex.  Type dropdown)
            const readonly = data.readonly ?? false;

            return <Box>
                <label>{label}</label>
                <FormSelectControl
                    name={path}
                    label={label}
                    defaultValue={defaultValues}
                    options={dropDownOptions}
                    handleChange={(val) => { console.log('jb dropdown changed: ', val) }}
                    readonly={readonly}
                    {...{
                        register,
                        control,
                        errors
                    }}
                />

            </Box>
        }
        else if (type === "multiselect") {

            let dropDownOptions= [];
            if (options && options[values]) {
                // set options from dynamic global variable
                dropDownOptions = options[values];
            }
            else {
                // set options as defined in schema
                dropDownOptions = data.defaultOptions.map(item => {
                    return { label: item, value: item }
                });
            }

            // Need to translate ids into label/value objects.
            let defaultValues = buildDropdownDefaults(dropDownOptions, value, "value");
            if (options[values] !== undefined && options[values][0] && options[values][0].type === 'interlock') {
                let usedSystems = getModuleSystems()
                dropDownOptions = options[values].filter((opt) => usedSystems.indexOf(opt.value) < 0).concat(defaultValues)
            }

            const readonly = data.readonly ?? false;
            return <Box sx={{margin: '10px 0px'}}>
                <label>{label}</label>
                <FormMultiSelectControl
                    id={`multiselect-${path}`}
                    //name={path}
                    name={data.label}
                    label={''}
                    defaultValues={defaultValues}
                    options={dropDownOptions}
                    readonly={readonly}
                    {...{
                        register,
                        control,
                        errors
                    }}
                />
            </Box>
        }
        else if (type === "translation") {
            return (
                <Box>
                    <label>{label} - (Translated Text)</label>
                    <Box sx={{border: '0px solid #ccc', padding: '00px 00px'}}>
                        {/* PUT THIS BACK LATER */}
                        <TranslationInput data={value} type={label} lists={options.translationsList} rhf={rhf}/>
                    </Box>
                </Box>
            )
        }
        else if (type === "interlock-map") {
            return (
                <Box>
                    <label>{label}</label>

                    <Box sx={{border: '1px solid #ccc', padding: '10px'}}>
                        <InterlockMap data={data} rhf={rhf} globalData={options} />
                    </Box>
                </Box>
            )
        }
        else if (type === "hardwareInputs" || type === "hardwareOutputs") {          
            // This is the structure of a new item.
            const addObject =  {
                "unit": 1,
                "block": 0,
                "bit": 0,
                "event": {
                    "type": "action",
                    "key": "power",
                    "value": "on"
                }
            }

            const showCommand = (type === "hardwareOutputs");

            // This is what gets rendered for each data item.
            const renderItem = (name, item, index, handleUpdates, rhf, formOptions) => {
                return <HardwareInput name={name} index={index} data={item} handleUpdates={handleUpdates} rhf={rhf} showCommand={showCommand}></HardwareInput>
            }

            return (
                <ConfigDataTable
                    label={`${label}`}
                    name={`${label}`}
                    fields={value}
                    addObject={addObject}
                    renderItem={renderItem}
                    rhf={rhf}
                    formOptions={options}
                ></ConfigDataTable>
            )
        }
        else if (type === "exclusions") {
            // This is the structure of a new item.
            const addObject =  {
                "unit": 1,
                "block": 0,
                "bit": 0,
                "command": "none"
            }

            // This is what gets rendered for each data item.
            const renderItem = (name, item, index, handleUpdates, rhf, formOptions) => {
                return <ExclusionInput name={name} index={index} data={item} handleUpdates={handleUpdates} rhf={rhf}></ExclusionInput>
            }

            return (
                <ConfigDataTable
                    label={`Hardware ${label}`}
                    name={label}
                    fields={value}
                    addObject={addObject}
                    renderItem={renderItem}
                    rhf={rhf}
                    formOptions={options}
                ></ConfigDataTable>
            )
        }
        else if (type === "preconditions") {

            // This is the structure of a new item.
            const addObject = {
                "name": {
                    "value": ""
                },
                "targetSystemId": "",
                "filters": {
                    "state": {
                        "status": "met"
                    }
                }
            }

            // This is what gets rendered for each data item.
            const renderItem = (name, item, index, handleUpdates, rhf, formOptions) => {
                return <PreconditionInput name={name} index={index} data={item} handleUpdates={handleUpdates} rhf={rhf}
                                          item={item} formOptions={formOptions}></PreconditionInput>
            }

            return (
                <ConfigDataTable
                    label={label}
                    name={label}
                    fields={value}
                    addObject={addObject}
                    renderItem={renderItem}
                    formOptions={options}
                    rhf={rhf}
                ></ConfigDataTable>
            )
        }
        else if (type === "triggers") {
            // This is the structure of a new item.
            const addObject =  {
                "filters": {
                    "action": {
                        "key": "",
                        "value": ""
                    },
                    "state": {
                        "status": "met"
                    },
                },
                "event": {
                    "type": "",
                    "key": "",
                    "value": ""
                }
            }

            // This is what gets rendered for each data item.
            const renderItem = (name, item, index, handleUpdates, rhf, formOptions) => {
                return <TriggerInput name={name} index={index} data={item} handleUpdates={handleUpdates} rhf={rhf} formOptions={formOptions}></TriggerInput>
            }

            return (
                <ConfigDataTable
                    label={label}
                    name={label}
                    fields={value}
                    addObject={addObject}
                    renderItem={renderItem}
                    rhf={rhf}
                    formOptions={options}
                ></ConfigDataTable>
            )
        }
        else if (type === "switch") {
            return (
                <Box>
                    {/*<label>{label}</label>*/}
                    <FormSwitchControl
                        label={label}
                        //name={path}
                        name={label}
                        checked={value}
                        {...{
                            register,
                            errors,
                            control
                        }}
                    />
                </Box>
            )
        }
        else {

            if (data.type) {
                console.log('jb ----------------------------------------');
                console.log('jb MISSING ConfigFormElement: ', data);
                console.log('jb ----------------------------------------');

                return (
                    // <></>
                    <div><h1>No Element Type {type} Defined</h1></div>
                )
            }
        }
    }

    return (
        <>{factory(type, label, path, value)}</>
    );

}