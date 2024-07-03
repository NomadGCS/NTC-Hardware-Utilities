import React, {useState} from 'react'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {FormSelectControl} from "../../../inputs/forms/controls/FormSelectControl";
import {updateDataAndHOC} from "../util/configBuilderUtils";

const Label = ({children}) => {
    return (
        <label style={{fontSize: '0.8em'}}>
            {children}
        </label>
    )
}

export default function CommandDropdown( { name, index, data, handleUpdates, rhf} ) {
    const {register, control, errors } = rhf;

    const [command, setCommand] = useState(data.command);

    const commandOptions = [
        {'label': '-delete-', 'value': '-delete-' },
        {'label': 'stop', 'value': 'stop' },
        {'label': 'deploy', 'value': 'deploy' },
        {'label': 'stow', 'value': 'stow' },
        {'label': 'lower', 'value': 'lower' },
        {'label': 'raise', 'value': 'raise' },
        {'label': 'extend', 'value': 'extend' },
        {'label': 'retract', 'value': 'retract' }
    ]

    return (
        <Stack direction='row'>

            {/* COMMAND */}
            <Box>
                <Label>Command</Label>
                <FormSelectControl
                    name={`${name}.${index}.command`}
                    label={'Command'}
                    defaultValue={command}
                    options={commandOptions}
                    handleChange={(val) => {
                        let currentData = {
                            ...data,
                            command
                        }
                        setCommand(val);
                        data = updateDataAndHOC({data: currentData, index, val, location: 'command', handleUpdates})
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