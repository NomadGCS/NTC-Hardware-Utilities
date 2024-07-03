import React, { useState } from 'react'
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
export default function UnitBlockBitInput({ name, index, data, handleUpdates, rhf } ) {
    const theme = useTheme()
    const {register, setValue } = rhf;

    const [unit, setUnit] = useState(data.unit)
    const [bit, setBit] = useState(data.bit)
    const [block, setBlock] = useState(data.block);

    //console.log('jb UnitBLockBit - Data: ', data);

    const handleChange = (e, type) => {
        // get the new value
        const index = e.target.dataset.index;
        let newValue = e.target.value;
        newValue = parseInt(newValue);

        // retain data if additional rows are added
        let currentUnitBlockBit = {
            ...data,
            unit,
            block,
            bit
        }

        // TODO:  Validate Input

        // set the new value in the appropriate location
        let location = '';
        if (type == 0) {
            setValue(`${name}.${index}.unit`, newValue);
            location = 'unit';
            setUnit(newValue);
            currentUnitBlockBit.unit = newValue;
        }
        else if (type === 1) {
            setValue(`${name}.${index}.block`, newValue);
            location = 'block';
            setBlock(newValue);
            currentUnitBlockBit.block = newValue;
        }
        else {
            setValue(`${name}.${index}.bit`, newValue);
            location = 'bit';
            setBit(newValue);
            currentUnitBlockBit.bit = newValue;
        }

        // Update the HOC
        let newData = updateDataAndHOC({data: currentUnitBlockBit, index, val: newValue, location, handleUpdates});
    }

    const margin = '3px 2px'
    const padding = '20px 2px'
    const width = '2.5em'

    //console.log('jb render UnitBlockBitInput: ', index, data)
    return (
        <Stack direction='row'>
            <Stack direction='column' sx={{ margin: margin, width: width }}>
                <Label>Unit</Label>
                <input style={{
                    key: 'unit',
                    padding: padding,
                    textAlign: 'center',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
                       defaultValue={unit}
                       onChange={(e) => handleChange(e, 0)}
                       data-index={index}
                />
            </Stack>

            <Stack direction='column' sx={{ margin: margin, width: width }}>
                <Label>Block</Label>
                <input style={{
                    key: 'block',
                    padding: padding,
                    textAlign: 'center',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
                       defaultValue={block}
                       onChange={(e) => handleChange(e, 1)}
                       data-index={index}
                />
            </Stack>

            <Stack direction='column' sx={{ margin: margin, width: width }}>
                <Label>Bit</Label>
                <input style={{
                    key: 'bit',
                    padding: padding,
                    textAlign: 'center',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
                       defaultValue={bit}
                       onChange={(e) => handleChange(e, 2)}
                       data-index={index}
                />

                {/* HIDDEN INPUTS - These are the actual values of this component */}
                {/*<input type='hidden' value={item.unit} name='unit' {...register(`${name}.${index}.unit`, {shouldUnregister: true})}/>*/}
                <input type='hidden' value={data.unit}
                       name='unit' {...register(`${name}.${index}.unit`, { valueAsNumber: true })}/>
                <input type='hidden' value={data.block}
                       name='block' {...register(`${name}.${index}.block`, { valueAsNumber: true })}/>
                <input type='hidden' value={data.bit}
                       name='bit'  {...register(`${name}.${index}.bit`, { valueAsNumber: true })}/>
            </Stack>
        </Stack>
    )
}