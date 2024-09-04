import * as React from 'react'
import BaseModalDialog from './BaseModalDialog.jsx'

import Button from '@mui/material/Button'
import { Box, Stack } from '@mui/material'
import { useState } from "react";

const normalText = 'black';
const errorText = 'firebrick'

export const DialogButtons = ({ onConfirmClick, onCancelClick }) => {    
    return <>
        <Button sx={{ color: errorText }} onClick={onConfirmClick}>Ok</Button>
        <Button sx={{ color: normalText }} onClick={onCancelClick}>Cancel</Button>
    </>
}

export function FileNameModalDialog({
    open,
    maxWidth,
    handleClose,
    modalTitle,
    confirmMessage,
    handleConfirm,
    handleCancel    
}) {
    
    const [data, setData] = useState("");
    const [fileName, setFileName] = useState("");

    const handleOk = (e) => {

        let fileName = document.getElementById('fileName').value;
        console.log('fileName: ', fileName);

        handleConfirm(fileName);
    }

    return (
        <BaseModalDialog 
            open={open} 
            handleClose={handleClose} 
            modalTitle={modalTitle} 
            maxWidth={maxWidth}
            dialogButtons={
                <DialogButtons onConfirmClick={handleOk} onCancelClick={handleCancel}/>
            }                         
        >
            <Stack direction="row" sx={{minWidth: '300px'}}>
                <Box  style={{width: '100%'}}>
                    <Box sx={{marginBottom: '10px'}}>
                        <label>Enter a file name.</label>
                    </Box>
                    <input id="fileName" type="text" style={{width: '100%'}}/>
                </Box>                
            </Stack>
        </BaseModalDialog>
    )
}
