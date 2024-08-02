import React, { Fragment, useEffect, useState } from 'react'
import { Select, useTheme } from '@mui/material'
import useI18n from '../../../../i18n/useI18n'
import { Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { ErrorMessage } from '@hookform/error-message'
import { SelectChangeEvent } from '@mui/material/Select'

interface FormSelectControlProps {
    register?: any,
    control?: any,
    errors?: any,
    id: string,
    name: string,
    options: { label: string, value: string, disabled?: boolean }[],
    label: string,
    defaultOptionLabel: string,
    defaultValue?: string,
    readonly?: boolean,
    type?: string
    handleChange?
}

const FormSelectControl = ({
    register,
    control,
    errors,
    name,
    id,
    label,
    defaultOptionLabel,
    defaultValue,
    options,
    readonly,
    handleChange
}: FormSelectControlProps) => {
    const theme = useTheme()
    const { t } = useI18n()
    const isError = !!errors[name]

    const [value, setValue] = useState(defaultValue)

    const onChange = (event: SelectChangeEvent, field) => {

        const selectedValue = options.find(s=> s.value == event.target.value);

        // this will update the UI with the new dropdown value
        setValue(event.target.value)

        // this is what React Hook Form is going to send back when the form is submitted
        field.onChange(selectedValue?.value)

        // pass updates up to parent
        handleChange(event.target.value)
    }

    return (
        <Fragment>
            <input type='hidden' value={defaultValue} name={name} {...register(name)}/>

            <Controller
                control={control}
                name={name}
                defaultValue={value}
                render={({ field }) =>
                    <Select {...field}
                            native
                            id={id}
                            fullWidth
                            disabled={readonly}
                            onChange={(event) => onChange(event, field)}
                            // onChange={(event, value) => {
                            //     field.onChange(value)
                            // }}
                            value={value}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: theme.palette.custom.moduleBorder
                                }
                            }}>

                        <option value="">{defaultOptionLabel}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}

                    </Select>
                }/>
            <ErrorMessage errors={errors} name={name}
                          render={({ message }) => <Typography variant="inherit"
                                                               sx={{ color: theme.palette.custom.nomadRed }}>{message} </Typography>}
            />

        </Fragment>
    )
}

export {
    FormSelectControl
}
