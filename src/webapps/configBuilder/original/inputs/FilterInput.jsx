import React, { useState } from 'react'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {FormSelectControl} from "../../../inputs/forms/controls/FormSelectControl";
import {updateDataAndHOC} from "../util/configBuilderUtils";
import Spacer from "../misc/Spacer";

const Label = ({children}) => {
    return (
        <label style={{fontSize: '0.8em'}}>
            {children}
        </label>
    )
}

export default function FilterInput( { name, index, data, handleUpdates, rhf} ) {
    const {register, control, errors } = rhf;

    const statusOptions = [
        {'label': 'none', 'value': 'none' },
        {'label': 'met', 'value': 'met' },
        {'label': 'unmet', 'value': 'unmet' },
        {'label': 'extending', 'value': 'extending' },
        {'label': 'extended', 'value': 'extended' },
        {'label': 'retracting', 'value': 'retracting' },
        {'label': 'retracted', 'value': 'retracted' },
        {'label': 'raising', 'value': 'raising' },
        {'label': 'raised', 'value': 'raised' },
        {'label': 'lowering', 'value': 'lowering' },
        {'label': 'lowered', 'value': 'lowered' },
        {'label': 'stowing', 'value': 'stowing' },
        {'label': 'stowed', 'value': 'stowed' },
        {'label': 'deploying', 'value': 'deploying' },
        {'label': 'deployed', 'value': 'deployed' },
    ]

    const keyOptions = [
        {'label': 'none', 'value': 'none' },
        {'label': 'command', 'value': 'command' },
        {'label': 'status', 'value': 'status' },
    ]

    const commandOptions = [
        {'label': 'none', 'value': 'none' },
        {'label': 'lower', 'value': 'lower' },
        {'label': 'deploy', 'value': 'deploy' },
        {'label': 'stop', 'value': 'stop' },
    ]

    const margin = '0 2px';

    return (
        <Stack direction='column'>

            {/*  FILTER   */}
            <Stack direction='row'>

                {/*  STATUS  */}
                <Box sx={{margin: margin}}>
                    <Label>Filter Status</Label>

                    <FormSelectControl
                        name={`${name}.${index}.filters.state.status`}
                        label={'Type'}
                        defaultValue={data?.filters?.state.status}
                        options={statusOptions}
                        handleChange={(val) => {
                            data = updateDataAndHOC({data, index, val, location: 'filters.state.status', handleUpdates})
                        }}
                        readonly={false}
                        {...{
                            register,
                            control,
                            errors
                        }}
                    />
                </Box>

                {/* SPACER */}
                <Spacer></Spacer>

                {/*  ACTION - KEY  */}
                <Box sx={{margin: margin}}>
                    <Label>Action Key</Label>
                    <FormSelectControl
                        name={`${name}.${index}.filters.action.key`}
                        label={'Type'}
                        defaultValue={data?.filters?.action?.key}
                        options={keyOptions}
                        handleChange={(val) => {
                            data = updateDataAndHOC({data, index, val, location: 'filters.action.key', handleUpdates})
                        }}
                        readonly={false}
                        {...{
                            register,
                            control,
                            errors
                        }}
                    />
                </Box>

                {/*  ACTION - VALUE  */}
                <Box sx={{margin: margin}}>
                    <Label>Action Value</Label>
                    <FormSelectControl
                        name={`${name}.${index}.filters.action.value`}
                        label={'Type'}
                        defaultValue={data?.filters?.action?.value}
                        options={commandOptions}
                        handleChange={(val) => {
                            data = updateDataAndHOC({data, index, val, location: 'filters.action.value', handleUpdates})
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
        </Stack>
    )
}