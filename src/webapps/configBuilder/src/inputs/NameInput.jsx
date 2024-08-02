import React, { useState } from 'react'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import FormTextControl from "../../../inputs/forms/controls/FormTextControl";
import FormTextControl from '../base/FormTextControl.tsx';
import {FormSelectControl} from "../base/FormSelectControl.tsx";
import {updateDataAndHOC} from "../util/configBuilderUtils";

const Label = ({children}) => {
    return (
        <label style={{fontSize: '0.8em'}}>
            {children}
        </label>
    )
}

export default function NameInput( { name, index, data, handleUpdates, rhf} ) {
    const {register, control, errors } = rhf;

    const margin = '0 2px';

    //console.log('jb FilterInput: ', name, index, data)

    return (
        <Stack direction='column'>

            {/*  FILTER   */}
            <Stack direction='row'>

                {/*  NAME  */}
                <Box sx={{margin: margin}}>
                    {/*<Label>Precondition</Label>*/}
                    <FormTextControl
                        // id={label}
                        //name={path}
                        label={'Precondition Name'}
                        name={`${name}.${index}.name.value`}
                        defaultValue={data?.name.value}
                        {...{
                            register,
                            errors
                        }}
                    />

                </Box>

            </Stack>
        </Stack>
    )
}