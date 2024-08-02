import React, { useState, Fragment } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
// import IOSSwitch from '../../../inputs/switches/IOSSwitch'

import { styled } from '@mui/material/styles';

import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from "react-hook-form";
import { Radio, RadioGroup, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Theme } from "../../../../generated/client/Theme";


interface NTCSwitchProps {
    onChange: any
    checked: boolean
}


const NTCSwitch = styled((props: NTCSwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple checked={props.checked} {...props} />
))<NTCSwitchProps>(({ theme }) => ({
    width: 29,
    height: 16,
    padding: 0,
    margin: '4px',
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: '2.5px 3px 3px 3px',
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.custom.nomadRed,
                opacity: 1,
                border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[600]
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 11,
        height: 11
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#bdbdbd',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
        marginTop: '2.5px',
        marginLeft: '0px'
    }
}))


interface FormSwitchControlProps {
    register?: any,
    control?: any,
    errors?: any,
    // id: string,
    name: string,
    label: string,
    // labelPlacement: string,
    checked: boolean,
    // whenChanged?: any
}

const FormSwitchControl = ({register, control, errors, name, label, checked} : FormSwitchControlProps) => {

// const FormSwitchControl = ({control, errors, id, name, label, labelPlacement, checked, whenChanged} : FormSwitchControlProps) => {
    const theme = useTheme();

    const [isChecked, setIsChecked] = useState(checked);

    // const isError = !!errors[name]
    // const color = isError ? theme.palette.custom.nomadRed : `${theme.palette.custom.moduleTitle} !important`
    // const textColor = isError ? theme.palette.custom.nomadRed : `${theme.palette.custom.moduleTitle} !important`

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // whenChanged();
        //console.log('jb handleChange: ', isChecked);
        setIsChecked(!isChecked);
    }

    //console.log('jb switch: ', label, checked);

    return (
        <Fragment>
            <Controller
                        name={name}
                        control={control}
                        defaultValue={isChecked}

                        render={({ field: {onChange} }) =>

                            <FormControlLabel
                                value={isChecked}
                                control={
                                    <NTCSwitch checked={isChecked} onChange={(e) => {handleChange(e); onChange(e);}} />
                                }
                                label={label}
                                labelPlacement="start"
                                sx={{ml: '0'}}
                            />

                        }
            />
            {/*<Typography>*/}
            {/*    {errors[name]?.message}*/}
            {/*</Typography>*/}

        </Fragment>
    )
}


export default FormSwitchControl;

