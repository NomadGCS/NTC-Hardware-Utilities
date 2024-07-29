import React, {useState, useEffect, useContext} from 'react'
import BaseModalDialog from '../base/modals/BaseModalDialog.jsx'

//import useI18n from '../../../../i18n/useI18n'
import {DialogButtons} from "../base/modals/ConfirmModalDialog.jsx";

// MUI
import Box from '@mui/material/Box';
//import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'


export default function ConfigBuilderCreateNewModal({
                                      options,
                                      type,
                                      open,
                                      maxWidth,
                                      handleClose,
                                      confirmMessage,
                                      handleConfirm,
                                      handleCancel,
                                      errors
                                  }) {

    //const { t } = useI18n()

    const [types, setTypes] = useState([])

    const MODULE = 0;
    const SYSTEM = 1;

    const title = (type === MODULE) ? 'Module' : 'System';

    useEffect(() => {
        if (type === MODULE) {
            setTypes(options.moduleTypes)
        }
        else {
            setTypes(options.systemTypes)
        }

        console.log('Options: ', options);

    }, [])

    const handleClick = (val) => {
        handleConfirm(val);
    }

    return (
        <BaseModalDialog open={open} handleClose={handleClose} modalTitle={`Create New ${title}`} dialogButtons={
            <DialogButtons onConfirmClick={handleConfirm} onCancelClick={handleCancel}/>} maxWidth={maxWidth}
        >
            <Typography>
                {confirmMessage}
            </Typography>

            {/* DROPDOWN with TYPES*/}
            {/*<ConfigFormElement key={'type-dropdown'} data={data} options={options} register={register} errors={errors} control={control}/>*/}

            <div className='wonder-wall'>
                {types && types.map(item => (
                    <Box key={crypto.randomUUID()} className={'clickable-panel'} onClick={() => handleClick(item.label)}>
                        {item.label}
                    </Box>
                ))}
            </div>



            {/*<textarea id="importTextArea"  rows={25} cols={70} />*/}
            <div style={{maxWidth:'40ch'}}>
                <Typography sx={{color:'red'}}>
                    {errors}
                </Typography>
            </div>
        </BaseModalDialog>
    )
}