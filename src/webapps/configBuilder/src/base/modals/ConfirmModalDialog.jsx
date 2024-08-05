import * as React from 'react'
import BaseModalDialog from './BaseModalDialog.jsx'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import { Box, Breakpoint, Stack, useTheme } from '@mui/material'
import { useState } from "react";

// interface AssetAlert {
//     assetId: string,
//     severity? //'success' | 'info' | 'warning' | 'error';
//     messageId: string
// }

// interface ConfirmModalDialogProps {
//     open: boolean,
//     maxWidth?: Breakpoint,
//     modalTitle?: string,
//     handleClose,
//     confirmMessage: string,
//     helpMessage?: string,
//     handleConfirm?,
//     handleCancel?,
//     errors?
// }

const normalText = 'black';
const errorText = 'firebrick'

export const DialogButtons = ({ onConfirmClick, onCancelClick }) => {
    //const theme = useTheme()
    //const { t } = useI18n()
    return <>
        <Button sx={{ color: errorText }} onClick={onConfirmClick}>Ok</Button>
        <Button sx={{ color: normalText }} onClick={onCancelClick}>Cancel</Button>
    </>
}

export default function ConfirmModalDialog({
    open,
    maxWidth,
    handleClose,
    modalTitle,
    confirmMessage,
    handleConfirm,
    handleCancel
}) {
    //const { t } = useI18n()
    return (
        <BaseModalDialog 
            open={open} 
            handleClose={handleClose} 
            modalTitle={modalTitle} 
            dialogButtons={
                <DialogButtons onConfirmClick={handleConfirm} onCancelClick={handleCancel}/>
            } 
            maxWidth={maxWidth}
        >
            <Typography>
                {confirmMessage}
            </Typography>
        </BaseModalDialog>
    )
}


export function ImportModalDialog({
                                               open,
                                               maxWidth,
                                               handleClose,
                                               modalTitle,
                                               confirmMessage,
                                               handleConfirm,
                                               handleCancel,
                                                errors
                                           }) {
    //const { t } = useI18n()
    const [data, setData] = useState("")
    const [fileName, setFileName] = useState("")

    const handleFileChange = (e) => {
        const fileReader = new FileReader();
        const files = (e.target).files;

        if (files && files[0]) {
            fileReader.readAsText(files[0], "UTF-8");
            fileReader.onload = e => {
                const content = e?.target?.result;
                if (typeof content === "string") {
                    setData(content);

                    // Get filename if one is present.
                    let selectedFile = files[0]?.name;
                    if (selectedFile) {
                        setFileName(selectedFile);
                    }
                }
                else {
                    
                }
            };
        }
    }



    return (
        <BaseModalDialog open={open} handleClose={handleClose} modalTitle={modalTitle} dialogButtons={
            <DialogButtons onConfirmClick={handleConfirm} onCancelClick={handleCancel}/>} maxWidth={maxWidth}>
            <Stack direction="row">
                <Box>
                    <Box sx={{marginBottom: '10px'}}>
                        <label>Load from existing file.</label>
                    </Box>

                    <input type="file" onChange={handleFileChange}/>
                    <input id="selectedFileName" type='hidden' value={fileName} />
                </Box>
                <Box>
                    <Typography>
                        {confirmMessage}
                    </Typography>
                    <textarea id="importTextArea" rows={25} cols={70} defaultValue={data}/>
                    <div style={{maxWidth:'40ch'}}>
                        <Typography sx={{color:'red'}}>
                            {errors}
                        </Typography>
                    </div>
                </Box>
            </Stack>
        </BaseModalDialog>
    )
}
