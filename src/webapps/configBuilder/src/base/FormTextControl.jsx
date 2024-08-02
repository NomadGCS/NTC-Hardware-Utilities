import React, { Fragment } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
// import { useTheme } from '@mui/material'
// @ts-ignore
import { ErrorMessage } from '@hookform/error-message'


// interface FormTextControlProps {
//     register?: any,
//     errors?: any,
//     id: string,
//     name: string,
//     label: string,
//     defaultValue?: string,
//     readonly?: boolean,
//     type?: string,
//     required?: boolean,
//     isNumber?: boolean
// }

const normalText = 'black';
const errorText = 'firebrick'

const FormTextControl = ({
    register,
    errors,
    name,
    id,
    label,
    defaultValue,
    readonly,
    type,
    required = true,
    isNumber = false
}) => {
    // const theme = useTheme()
    const isError = !!errors[name]
    const textColor = isError ? errorText : normalText
    const rhfOptions = (isNumber) ? { valueAsNumber: true } : {};

    return (
        <Fragment>
            <TextField
                InputLabelProps={{ shrink: true }}
                type={type}
                disabled={readonly}
                required={required}
                id={id}
                name={name}
                label={label}
                fullWidth
                variant={'standard'}
                defaultValue={defaultValue}
                margin={'dense'}
                {...register(name, rhfOptions)}
                error={isError}
                sx={{
                    '& .MuiFormLabel-root': { color: textColor },
                    '& fieldset': { borderColor: textColor },
                    '& .MuiInput-underline::after': { borderBottomColor: normalText }
                }}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <Typography sx={
                    { color: 'firebrick' }}>
                    {message}
                </Typography>}
            />

        </Fragment>
    )
}

export default FormTextControl