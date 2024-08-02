import * as React from 'react'
import { useTheme } from '@mui/material'
import { Fragment, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import Typography from '@mui/material/Typography'
import { Controller } from 'react-hook-form'
import { SelectChangeEvent } from "@mui/material/Select";

interface FormMultiSelectControlProps {
    control?: any,
    errors?: any,
    name: string,
    label: string,
    options: { label: string, value: string, disabled?: boolean }[],
    readonly?: boolean,
    defaultValues?: any
}

const prepareSelectedList = (options, selectedValues) => {
    return options.filter((option) => selectedValues.includes(option.value))
}
const icon = <CheckBoxOutlineBlankIcon fontSize={'medium'}/>
const checkedIcon = <CheckBoxIcon fontSize={'medium'}/>
const isOptionEqualToValue = (option, value) => option.value === value.value

const FormMultiSelectControl = ({
    control,
    errors,
    name,
    label,
    options = [],
    readonly,
    defaultValues
}: FormMultiSelectControlProps) => {

    const theme = useTheme()
    const isError = errors[name] ? true : false
    const color = isError ? theme.palette.custom.nomadRed : `${theme.palette.custom.moduleTitle} !important`

    const [value, setValue] = useState(defaultValues)


    return (
        <Fragment>
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <Autocomplete
                        {...field}
                        options={options}
                        multiple
                        defaultValue={defaultValues}
                        disabled={readonly}
                        disableCloseOnSelect
                        getOptionDisabled={(option) => option.disabled}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={isOptionEqualToValue}
                        onChange={(event, value) => {
                            field.onChange(value)
                        }}
                        renderOption={(props, option, { selected }) => {
                            return <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                    sx={{
                                        '&.Mui-checked': { color: `${theme.palette.custom.nomadRed} !important` }
                                    }}
                                />
                                {option.label}
                            </li>
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label={label} placeholder={label} sx={{
                                '& .MuiFormLabel-root': { color: color },
                                // '& fieldset': { borderColor: color }
                            }}/>
                        )}
                    />
                }
            />
            <Typography variant="inherit" sx={
                { color: color }}>
                {errors[name]?.message}
            </Typography>
        </Fragment>
    )
}

export {
    FormMultiSelectControl,
    prepareSelectedList
}
