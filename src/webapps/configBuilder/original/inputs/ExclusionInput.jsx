import React, {useState} from 'react'
import {Box, Stack} from "@mui/material";
import DeleteButton from "../../../inputs/buttons/DeleteButton";
import UnitBlockBitInput from "./UnitBlockBitInput";
import CommandDropdown from "./CommandDropdown";
import Spacer from "../misc/Spacer";


/**
 * Summary:  Represents a Hardware Input "row" in a table of Hardware Inputs.
 *           A hardware input consists of a Unit-Block-Bit component, a Hardware-Event component, and a delete button.
 * @param name (string): schema path of this object
 * @param index (number): position in array of hardware inputs
 * @param fields
 * @param rhf (react-hook-form): methods used by react-hook-form
 * @returns {Element}
 * @constructor
 */
export default function ExclusionInput( { name, index, data, handleUpdates, rhf } ) {
    const {register } = rhf;
    const [isDeleted, setIsDeleted] = useState(false);


    /**
     * Summary:  Delete hardware input.
     * @param index (int): index in hardware input array to delete.
     */
    const handleDelete = (index) => {
        setIsDeleted(true);

        // WORKAROUND -> Unable to unregister an input at this time, so add a flag so code knows to filter it out later.
        register(`${name}.${index}.delete`, true);
    }

    return (
        <Stack direction='row'
               sx={{padding: '10px', justifyContent: 'flex-start', alignContent: 'center'}}
        >
            {!isDeleted &&
                <>
                    <div style={{paddingTop: '2.1em', margin: '4px'}}>
                        {index + 1}
                    </div>

                    {/* UNIT BLOCK BIT */}
                    <UnitBlockBitInput name={name} index={index} data={data} handleUpdates={handleUpdates} rhf={rhf}></UnitBlockBitInput>

                    {/* SPACER */}
                    <Spacer></Spacer>

                    {/* COMMAND */}
                    <CommandDropdown name={name} index={index} data={data} handleUpdates={handleUpdates} rhf={rhf}></CommandDropdown>

                    {/* DELETE BUTTON */}
                    <Box sx={{alignSelf: 'center', paddingTop: '1.4em', marginLeft: 'auto'}}>
                        <DeleteButton
                            confirmAction={() => handleDelete(index)}
                            modalTitle={'Delete Exclusion'}
                            modalMessage={'Are you sure you want to delete this hardware exclusion?'}
                        />
                    </Box>
                </>
            }
        </Stack>
    )
}