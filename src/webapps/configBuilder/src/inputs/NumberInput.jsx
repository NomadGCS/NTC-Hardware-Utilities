import React from 'react'
import {Stack, useTheme} from "@mui/material";
import {updateLeaf, updateDataAndHOC} from "../util/configBuilderUtils";

const Label = ({children}) => {
    return (
        <label style={{fontSize: '0.8em'}}>
            {children}
        </label>
    )
}

/**
 * Summary:  Represents a three digit hardware input.
 *           Current implementation uses a single text box with each digit(s) separated by a hyphen.
 * @param name (string): schema path of this object
 * @param index (number): position in array of hardware inputs
 * @param fields
 * @param rhf (react-hook-form): methods used by react-hook-form
 * @returns {Element}
 * @constructor
 */
export default function UnitBlockBitInput({ name, label, location, index, defaultValue, data, handleUpdates, rhf } ) {
    const theme = useTheme()
    const {register, setValue } = rhf;

    const handleChange = (e, type) => {

        let newValue = e.target.value;

        // TODO:  Validate Input

        //let location = 'event.delay';
        setValue(`${name}.${index}.${location}`, newValue);

        // Update the HOC
        let newData = updateDataAndHOC({data, index, val: newValue, location, handleUpdates})

    }

    const margin = '3px 2px'
    const padding = '20px 2px'
    const width = '2.5em'


    //console.log('jb render NumberInput: ', index, data)
    return (
        <Stack direction='row'>
            <Stack direction='column' sx={{ margin: margin, width: width }}>
                <Label><span style={{opacity: 0.5}}>{label}</span></Label>
                <input style={{
                    padding: padding,
                    textAlign: 'center',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
                       defaultValue={defaultValue}
                       onChange={(e) => handleChange(e, 0)}
                       data-index={index}
                />
            </Stack>

            {/* HIDDEN INPUTS - These are the actual values of this component */}
            {/*<input type='hidden' value={item.unit} name='unit' {...register(`${name}.${index}.unit`, {shouldUnregister: true})}/>*/}
            <input type='hidden' value={defaultValue}
                   name={'delay'} {...register(`${name}.${index}.event.delay`, {valueAsNumber: true})}/>
        </Stack>
    )
}