import NTCButton from "./NTCButton.jsx";
import { useTheme } from '@mui/material'
import TrashIcon from "@mui/icons-material/Delete";
//import { FormMode } from "../forms/Forms";
import ConfirmModalDialog from "../modals/ConfirmModalDialog";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";


enum FormMode {
    CREATE = 'create',
    EDIT = 'edit',
    VIEW = 'view',
    CLONE = 'clone',
    DELETE = 'delete'
}

/**
 * Button used for Delete actions.  Includes a confirm/cancel modal.
 * Any strings passed in are assumed to be Translated.
 * @param confirmAction - Delete function to run when user clicks 'confirm'
 * @param buttonText - Text to display on the button
 * @param modalTitle - Title of the modal window
 * @param modalMessage - Message to display on the modal
 * @constructor
 */
export default function DeleteButton({confirmAction, buttonText, modalTitle, modalMessage }) {

    const theme = useTheme()
    const [mode, setFormMode] = useState<FormMode>(FormMode.VIEW)

    return (
        <>
            {buttonText &&
            <NTCButton text={buttonText} endIcon={<TrashIcon/>}
                       onClick={() => setFormMode(FormMode.DELETE)}
                       backgroundColor={theme.palette.custom.nomadRed}
                       sx={{ color: theme.palette.custom.whiteText }}
            />
            }
            {!buttonText &&
                <IconButton
                    aria-label="delete"
                    sx={{margin: '10px', color: theme.palette.custom.nomadRed}}
                    onClick={() => setFormMode(FormMode.DELETE)}
                >
                    <TrashIcon></TrashIcon>
                </IconButton>
            }

            {/* When user clicks delete button this Modal is displayed. */}
            {mode == FormMode.DELETE &&
            <ConfirmModalDialog open={true} handleClose={() => setFormMode(FormMode.VIEW)}
                                modalTitle={modalTitle}
                                handleConfirm={ () => { confirmAction(); setFormMode(FormMode.VIEW)} }
                                handleCancel={() => setFormMode(FormMode.VIEW)}
                                confirmMessage={modalMessage} />
            }
        </>
    )
}