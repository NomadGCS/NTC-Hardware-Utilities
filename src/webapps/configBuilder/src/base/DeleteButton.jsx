import NTCButton from "./NTCButton.jsx";
//import { useTheme } from '@mui/material'
import TrashIcon from "@mui/icons-material/Delete";
//import { FormMode } from "../forms/Forms";
import ConfirmModalDialog from "./modals/ConfirmModalDialog.jsx";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";


// enum FormMode {
//     CREATE = 'create',
//     EDIT = 'edit',
//     VIEW = 'view',
//     CLONE = 'clone',
//     DELETE = 'delete'
// }

const VIEW = 0;
const DELETE = 1;

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

    //const theme = useTheme()
    const [mode, setFormMode] = useState(VIEW)

    return (
        <>
            {buttonText &&
            <NTCButton text={buttonText} endIcon={<TrashIcon/>}
                       onClick={() => setFormMode(DELETE)}
                       backgroundColor='#CC2027'
                       sx={{ color: '#fff' }}
            />
            }
            {!buttonText &&
                <IconButton
                    aria-label="delete"
                    sx={{margin: '10px', color: '#CC2027'}}
                    onClick={() => setFormMode(DELETE)}
                >
                    <TrashIcon></TrashIcon>
                </IconButton>
            }

            {/* When user clicks delete button this Modal is displayed. */}
            {mode == DELETE &&
            <ConfirmModalDialog open={true} handleClose={() => setFormMode(VIEW)}
                                modalTitle={modalTitle}
                                handleConfirm={ () => { confirmAction(); setFormMode(VIEW)} }
                                handleCancel={() => setFormMode(VIEW)}
                                confirmMessage={modalMessage} />
            }
        </>
    )
}