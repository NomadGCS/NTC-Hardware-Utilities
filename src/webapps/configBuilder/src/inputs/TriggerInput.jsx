import React, {useState} from 'react'
import {Box, Stack} from "@mui/material";
import DeleteButton from "../base/DeleteButton.tsx";
import FilterInput from "./FilterInput.jsx";
import HardwareEventInput from "./HardwareEventInput.jsx"
import Spacer from "../misc/Spacer.jsx";
import SystemDropdown from "./SystemDropdown.jsx";

/**
 * SCHEMA
 * {
 *           "filters": {
 *             "state": {
 *               "status": "extending"
 *             },
 *             "action": {
 *               "key": "command",
 *               "value": "stop"
 *             }
 *           },
 *           "event": {
 *             "type": "sensor",
 *             "systemId": "db4b2ec1-5bee-4dd9-a7e5-2b1aaf5408aa",
 *             "key": "status",
 *             "value": "extended"
 *           }
 *         },
 *
 */

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
export default function TriggerInput( { name, index, data, handleUpdates, rhf, formOptions } ) {

    //console.log('jb TriggerInput: ', formOptions);

    const {register } = rhf;

    const [isDeleted, setIsDeleted] = useState(false);

    /**
     * Summary:  Delete hardware input.
     * @param index (int): index in hardware input array to delete.
     */
    const handleDelete = (index) => {
        setIsDeleted(true);

        // WORKAROUND -> Unable to unregister an input in RHF, so add a flag so code knows to filter it out later.
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

                    {/* FILTERS */}
                    <FilterInput name={name} index={index} data={data} handleUpdates={handleUpdates} rhf={rhf}></FilterInput>

                    {/* SPACER */}
                    <Spacer></Spacer>

                    {/* HARDWARE EVENT */}
                    <HardwareEventInput name={name} index={index} data={data} handleUpdates={handleUpdates} rhf={rhf}></HardwareEventInput>

                    {/* SYSTEM DROPDOWN */}
                    <SystemDropdown name={name} index={index} data={data} value={data.event.systemId}
                                    handleUpdates={handleUpdates} rhf={rhf}
                                    options={formOptions['existingSystems']}
                                    formSelectName={`${name}.${index}.event.systemId`}
                                    formSelectLocation={'systemId'}
                                    showDelete={true}
                    >
                    </SystemDropdown>

                    {/* DELETE BUTTON */}
                    <Box sx={{alignSelf: 'center', paddingTop: '1.4em'}}>
                        <DeleteButton
                            confirmAction={() => handleDelete(index)}
                            modalTitle={'Delete Trigger'}
                            modalMessage={'Are you sure you want to delete this trigger?'}
                        />
                    </Box>
                </>
            }
        </Stack>
    )
}