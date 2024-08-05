import React from 'react'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {FormSelectControl} from "../base/FormSelectControl.jsx";
import {updateDataAndHOC} from "../util/configBuilderUtils";
import NumberInput from "./NumberInput.jsx";

const Label = ({children}) => {
    return (
        <label style={{fontSize: '0.8em'}}>
            {children}
        </label>
    )
}

export default function HardwareEventInput({ name, index, data, handleUpdates, rhf} ) {

    //console.log('jb HardwareEventInput: ', name, index, data);

    const {register, control, errors } = rhf;

    const eventTypeOptions = [
        {'label': '-delete-', 'value': '-delete-' },
        {'label': 'action', 'value': 'action' },
        {'label': 'sensor', 'value': 'sensor' },
    ]
    const eventKeyOptions = [
        {'label': '-delete-', 'value': '-delete-' },
        {'label': 'power', 'value': 'power' },
        {'label': 'brightness', 'value': 'brightness' },
        {'label': 'status', 'value': 'status' },
        {'label': 'command', 'value': 'command' },
    ]
    const eventValueOptions = [
        {'label': '-delete-', 'value': '-delete-' },
        {'label': 'on', 'value': 'on' },
        {'label': 'off', 'value': 'off' },
        {'label': 'up', 'value': 'up' },
        {'label': 'down', 'value': 'down' },
        {'label': 'met', 'value': 'met' },
        {'label': 'unmet', 'value': 'unmet' },
        {'label': 'stop', 'value': 'stop' },
        {'label': 'stopping', 'value': 'stopping' },
        {'label': 'stopped', 'value': 'stopped' },
        {'label': 'deploy', 'value': 'deploy' },
        {'label': 'deploying', 'value': 'deploying' },
        {'label': 'deployed', 'value': 'deployed' },
        {'label': 'stow', 'value': 'stow' },
        {'label': 'stowing', 'value': 'stowing' },
        {'label': 'stowed', 'value': 'stowed' },
        {'label': 'lower', 'value': 'lower' },
        {'label': 'lowering', 'value': 'lowering' },
        {'label': 'lowered', 'value': 'lowered' },
        {'label': 'raise', 'value': 'raise' },
        {'label': 'raising', 'value': 'raising' },
        {'label': 'raised', 'value': 'raised' },
        {'label': 'extend', 'value': 'extend' },
        {'label': 'extending', 'value': 'extending' },
        {'label': 'extended', 'value': 'extended' },
        {'label': 'retract', 'value': 'retract' },
        {'label': 'retracting', 'value': 'retracting' },
        {'label': 'retracted', 'value': 'retracted' }
    ]

    const margin = '0 2px';
    return (
        <Stack direction='row'>

            {/* EVENT - TYPE */}
            <Box sx={{margin: margin}}>
                <Label>Event Type</Label>
                <FormSelectControl
                    name={`${name}.${index}.event.type`}
                    label={'Event Type'}
                    defaultValue={data?.event?.type}
                    options={eventTypeOptions}
                    handleChange={(val) => {
                        data = updateDataAndHOC({data, index, val, location: 'event.type', handleUpdates})
                    }}
                    readonly={false}
                    {...{
                        register,
                        control,
                        errors
                    }}
                />
            </Box>

            {/* EVENT - KEY */}
            <Box sx={{margin: margin}}>
                <Label>Event Key</Label>
                <FormSelectControl
                    name={`${name}.${index}.event.key`}
                    label={'Event Key'}
                    defaultValue={data?.event?.key}
                    options={eventKeyOptions}
                    handleChange={(val) => {
                        data = updateDataAndHOC({data, index, val, location: 'event.key', handleUpdates})
                    }}
                    readonly={false}
                    {...{
                        register,
                        control,
                        errors
                    }}
                />
            </Box>

            {/* EVENT - VALUE */}
            <Box sx={{margin: margin}}>
                <Label>Event Value</Label>
                <FormSelectControl
                    name={`${name}.${index}.event.value`}
                    label={'Event Value'}
                    defaultValue={data?.event?.value}
                    options={eventValueOptions}
                    handleChange={(val) => {
                        data = updateDataAndHOC({data, index, val, location: 'event.value', handleUpdates})
                    }}
                    readonly={false}
                    {...{
                        register,
                        control,
                        errors
                    }}
                />
            </Box>

            {/*  OPTIONAL  */}

            {/*  DELAY  */}
            <Box direction='column' sx={{ margin: margin }}>
                <NumberInput
                    name={name}
                    label={'Delay'}
                    location={'event.delay'}
                    defaultValue={data?.event?.delay}
                    data={data}
                    handleUpdates={handleUpdates}
                    index={index}
                    rhf={rhf}
                />
            </Box>

            {/* EVENT - VALUES - 0 */}
            <Box sx={{margin: margin}}>
                <Label><span style={{opacity: 0.5}}>Event Values - 0</span></Label>
                <FormSelectControl
                    name={`${name}.${index}.event.values.0`}
                    label={'Event Value'}
                    defaultValue={data?.event?.values?.[0]}
                    options={eventValueOptions}
                    handleChange={(val) => {
                        data = updateDataAndHOC({data, index, val, location: 'event.values.0', handleUpdates})
                    }}
                    readonly={false}
                    {...{
                        register,
                        control,
                        errors
                    }}
                />
            </Box>

            {/* EVENT - VALUES - 1 */}
            <Box sx={{margin: margin}}>
                <Label><span style={{opacity: 0.5}}>Event Values - 1</span></Label>
                <FormSelectControl
                    name={`${name}.${index}.event.values.1`}
                    label={'Event Value'}
                    defaultValue={data?.event?.values?.[1]}
                    options={eventValueOptions}
                    handleChange={(val) => {
                        data = updateDataAndHOC({data, index, val, location: 'event.values.1', handleUpdates})
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