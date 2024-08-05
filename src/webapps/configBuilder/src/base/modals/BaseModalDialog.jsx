import * as React from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Breakpoint, DialogActions, useTheme } from '@mui/material'
import Box from '@mui/material/Box'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}))

// interface BaseModalDialog {
//     open: boolean,
//     dialogButtons?
//     maxWidth?: Breakpoint, //   'xs' | 'sm' | 'md' | 'lg' | 'xl',
//     modalTitle?: string,
//     handleClose,
//     sx?: any,
//     children,
//     hideCloseIcon?: boolean,
//     disableEscapeKeyDown?: boolean,
//     disableBackdropClick?: boolean
// }

// interface IBootstrapDialogTitleProps {
//     children: React.ReactNode;
//     onClose: () => void;
//     hideCloseIcon?: boolean;
//     id?: string;
// }

const nomadRed = 'firebrick';
const moduleTitle = 'black';

function BootstrapDialogTitle({ children, onClose, hideCloseIcon = false, ...other }) {
    //const theme = useTheme()

    return (
        <DialogTitle sx={{ m: 0, p: 2, color: moduleTitle }} {...other}>
            {children}
            
            {onClose && !hideCloseIcon ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: nomadRed }}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

export default function BaseModalDialog({
    children,
    dialogButtons,
    open,
    hideCloseIcon,
    handleClose,
    modalTitle,
    maxWidth = 'md',
    sx = {}
}) {

    function onCloseEvent(event, reason) {
        if (reason === 'backdropClick') {
            return false
        } else {
            handleClose()
        }
    }

    return (
        <BootstrapDialog
            maxWidth={maxWidth}
            onClose={onCloseEvent}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={sx}
        >
            {modalTitle ? <BootstrapDialogTitle id="customized-dialog-title" hideCloseIcon={hideCloseIcon}
                                                onClose={handleClose}>
                    {modalTitle}
                </BootstrapDialogTitle>
                : null}

            <DialogContent dividers>
                <Box>
                    {children}
                </Box>
            </DialogContent>

            {dialogButtons && (
                <DialogActions>
                    {dialogButtons}
                </DialogActions>
            )}

        </BootstrapDialog>
    )
}