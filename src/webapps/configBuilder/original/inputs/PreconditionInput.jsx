import React, {useState} from 'react'
import {Box, Stack} from "@mui/material";
import DeleteButton from "../../../inputs/buttons/DeleteButton";
import FilterInput from "./FilterInput";
import HardwareEventInput from "./HardwareEventInput"
import Spacer from "../misc/Spacer";
import ConfigFormElement from "../misc/ConfigFormElement";
import FormTextControl from "../../../inputs/forms/controls/FormTextControl";
import NameInput from "./NameInput";
import SystemDropdown from "./SystemDropdown";
import TranslationInput from "../translation/TranslationInput";

/**
    Name
    System
    Filter
 */

/**
 * Summary:  Represents a Precondition Input "row" in a table of Precondition Inputs.
 *           A Precondition consists of a Name, a System Id, and a Filter Input.
 * @param name (string): schema path of this object
 * @param index (number): position in array of hardware inputs
 * @param fields
 * @param rhf (react-hook-form): methods used by react-hook-form
 * @returns {Element}
 * @constructor
 */
export default function PreconditionInput( { name, index, data, handleUpdates, rhf, item, formOptions } ) {
    const {register, errors } = rhf;
    const [isDeleted, setIsDeleted] = useState(false);

    /**
     * Summary:  Delete precondition.
     * @param index (int): index in precondition array to delete.
     */
    const handleDelete = (index) => {
        setIsDeleted(true);

        // WORKAROUND -> Unable to unregister an input in RHF, so add a flag so code knows to filter it out later.
        register(`${name}.${index}.delete`, true);
    }

    //console.log(`jb Precondition:  Name - ${name}, Index - ${index}, Data - ${data}, Item - ${item}, Form Options - ${formOptions['existingSystems'][0]}`)

    return (
        <Stack direction='row'
               sx={{padding: '10px', justifyContent: 'flex-start', alignContent: 'center'}}
        >
            {!isDeleted &&
                <>
                    {/*<div style={{paddingTop: '2.1em', margin: '4px'}}>*/}
                    {/*    {index + 1}*/}
                    {/*</div>*/}

                    <Stack>

                        <Box>
                            {/* NAME */}
                            {/*<NameInput name={name} index={index} data={data} handleUpdates={handleUpdates} rhf={rhf}></NameInput>*/}
                            <TranslationInput data={data.name} type={`Preconditions.${index}.name`} lists={formOptions.translationsList} rhf={rhf}/>
                        </Box>

                        {/* SYSTEM SELECTOR */}
                        {/* DROPDOWN */}

                        <Stack direction='row' sx={{marginTop: '4px'}}>
                            {/* SYSTEM DROPDOWN */}
                            <SystemDropdown name={name} index={index} data={data} value={data.targetSystemId} handleUpdates={handleUpdates} rhf={rhf} options={formOptions['existingSystems']}></SystemDropdown>

                            {/* FILTERS */}
                            <FilterInput name={name} index={index} data={data} value={data.targetSystemId} handleUpdates={handleUpdates} rhf={rhf}></FilterInput>

                            {/* DELETE BUTTON */}
                            <Box sx={{alignSelf: 'center', paddingTop: '1.4em'}}>
                                <DeleteButton
                                    confirmAction={() => handleDelete(index)}
                                    modalTitle={'Delete Trigger'}
                                    modalMessage={'Are you sure you want to delete this trigger?'}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </>
            }
        </Stack>
    )
}