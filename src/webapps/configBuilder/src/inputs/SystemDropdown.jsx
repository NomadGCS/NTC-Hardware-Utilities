import React from 'react'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {FormSelectControl} from "../base/FormSelectControl.tsx";
import {buildDropdownDefaults, updateDataAndHOC} from "../util/configBuilderUtils";

const Label = ({children}) => {
    return (
        <label style={{fontSize: '0.8em'}}>
            {children}
        </label>
    )
}

export default function SystemDropdown( { name, index, data, value, handleUpdates, options, rhf, formSelectName, formSelectLocation, showDelete = false} ) {

    //console.log('jb SystemDropDown: ', name, "data: ", data, "value: ", value);

    const {register, control, errors } = rhf;

    const selectName = (formSelectName) ? formSelectName : `${name}.${index}.targetSystemId`;
    const selectLocation = (formSelectLocation) ? formSelectLocation : 'targetSystemId';


    let dropDownOptions = [];
    if (options) {

        // set options from dynamic global variable
        dropDownOptions = options;
    }
    else {
        // set options as defined in schema
        dropDownOptions = data.defaultOptions.map(item => {
            return { label: item, value: item }
        });
    }

    if (showDelete) {
        dropDownOptions.push({label: '-delete-', value: '-delete-'})
    }

    let dropDownValue = value;
    if (!dropDownValue) {
        dropDownValue = [];
    }

    let defaultValues = buildDropdownDefaults(dropDownOptions, [dropDownValue], "value")[0]?.value ?? null;
    //console.log('jb SystemDropDown Values: ', defaultValues);

    const generateOptions = () => {
        return [ {'label': 'none', 'value': 'none' },]
    }

    return (
        <Stack direction='row'>

            {/* SYSTEM */}
            <Box>
                <Label>System</Label>
                <FormSelectControl
                    //name={`${name}.${index}.targetSystemId`}
                    name={selectName}
                    label={'System'}
                    defaultValue={defaultValues}
                    options={dropDownOptions}
                    handleChange={(val) => {
                        //data = updateDataAndHOC({data, index, val, location: 'targetSystemId', handleUpdates})
                        data = updateDataAndHOC({data, index, val, location: selectLocation, handleUpdates})
                    }}
                    readonly={false}
                    {...{
                        register,
                        control,
                        errors
                    }}
                />
            </Box>

        </Stack>
    )
}