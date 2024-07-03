import React, {useState, useRef, useEffect} from 'react'

import {Box, useTheme, TableBody } from "@mui/material";
import {NTCTable, NTCTableRow,  } from "../../../display/tables/NTCTable";
import NTCButton from "../../../inputs/buttons/NTCButton";
import HardwareInput from "../inputs/HardwareInput";


/**
 * Summary:  Used for labels.  Splits up a camelcase word into multiple words and capitalizes each word.
 * @param {string} word:  "hardwareInputs"
 * @returns {*}:  "Hardware Inputs"
 */
const splitCapitalize = (word) => {
    return word = word.replace(/([A-Z])/g, ' $1').trim()
}

export default function ConfigDataTable({ label, name, fields, renderItem, addObject, rhf, formOptions } ) {
    const theme = useTheme()
    const [inputs, setInputs] = useState([]);
    const updates = useRef(fields);
    const sectionLabel = (label) ? label : 'Hardware Inputs';


    useEffect(() => {
        if (fields) {
            const fieldArray = Object.values(fields);
            setInputs(fieldArray);
        }
    }, [])

    const handleAdd = () => {
        const newRow = addObject;

        let updatedArray = [];
        if (inputs) {
            updatedArray = Array.from(updates.current);
        }
        updatedArray.push(newRow);

        updates.current = updatedArray;
        setInputs(updatedArray);
    }

    /**
     * Summary:  Replaces object in array at a given index.
     *           Two-way binding work-around used to keep this components data in sync when
     *           it changes within a child component.
     * @param {int} index
     * @param {JSON} item
     */
    const updateChild = (index, item) => {
        let updatedArray = Array.from(updates.current);
        updatedArray[index] = item;
        updates.current = updatedArray;         // Store field updates but don't cause a re-render (or input field will lose focus).
    }

    return (
        <Box>
            <label style={{textTransform: 'capitalize'}}>{splitCapitalize(sectionLabel)}</label>
            <Box sx={{margin: '0px 0px', border: '1px solid #ccc', backgroundColor: '#f1f1f1'}}>
                <NTCTable>
                    <TableBody>

                        {/* LIST OF HARDWARE INPUTS */}
                        {inputs && inputs.map((item, index) => (
                            <NTCTableRow key={crypto.randomUUID()} >
                                <td style={{margin: '10px 0px'}}>

                                    {/* HARDWARE INPUT */}
                                    {renderItem(name, item, index, updateChild, rhf, formOptions)}

                                </td>
                            </NTCTableRow>
                        ))}
                        {/* ADD BUTTON */}
                        <NTCTableRow>
                            <td>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '5px'}}>
                                    <NTCButton text={'Add'} backgroundColor={theme.palette.custom.nomadRed} onClick={handleAdd}></NTCButton>
                                </Box>
                            </td>
                        </NTCTableRow>
                    </TableBody>
                </NTCTable>
            </Box>
        </Box>
    )
}