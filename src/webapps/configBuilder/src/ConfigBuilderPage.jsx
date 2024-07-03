import React, {useState, useEffect, useRef} from 'react'

// MUI
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';


// ICONS
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


// JS
import ConfigViewButtonGroup from "./misc/ConfigViewButtonGroup.jsx";



// CSS
import './styles/configbuilderpage.css'



export default function ConfigBuilderPage() {

    // STATE
    const [showSchema, setShowSchema] = useState(false);
    const [showBuilderForm, setShowBuilderForm] = useState(false);


    // FUNCTIONS
    const handleAddClick = () => {
        console.log('handleAddClick')
    }
    const copyToClipBoard = () => {
        console.log('copyToClipBoard')
        alert('Copy to clipboard')
    }
    const handleImportModal = () => {
        console.log('handleImportModal')
        alert('Import files')
    }

   
    // RENDER
    return (
        <div>
            <div className='builder-content'>
                <Box className='side-menu'>
                    {/* MODULES */}
                    <Box className="modules">
                        <Stack direction="row" className='section-title'>
                            <div className="heading">Modules</div>
                            <AddBoxOutlinedIcon onClick={handleAddClick}/>
                            {/* <AddBoxOutlinedIcon onClick={() => handleAddClick(MODULE)}/> */}
                        </Stack>
                    </Box>
                    {/* SYSTEMS*/}
                    <Box className='systems'>
                        <Stack direction="row"  className='section-title'>
                            <div className="heading">Systems</div>
                            <AddBoxOutlinedIcon onClick={handleAddClick}/>
                            {/* <AddBoxOutlinedIcon onClick={() => handleAddClick(SYSTEM)}/> */}
                        </Stack>
                    </Box>
                </Box>
                <div className='content'>
                    <div className="builder-form">
                        {/* CONFIG BUILDER FORM GOES IN HERE --> May need to put original CSS back */}
                    </div>
                    <div className="json-layout">
                        <div className="json-header">
                            <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <div className="heading">
                                    <h3>
                                        <ConfigViewButtonGroup updateHOC={(index) => {
                                            if (index === 0) {
                                                setShowSchema(false);
                                            }
                                            else if (index === 1) {
                                                setShowSchema(true);
                                            }
                                            else {
                                                alert('Show Hardware I/O view');
                                                setShowSchema(false);
                                            }
                                        }} />
                                    </h3>
                                </div>
                                <div>
                                    <IconButton aria-label="Import JSON" size="small" onClick={handleImportModal}>
                                        <OpenInBrowserIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            </Stack>
                        </div>
                    </div>
                    <div className="json-code">
                        <pre>
                            {!showSchema &&
                                <textarea
                                    disabled
                                    id="jsonResult"
                                    width="auto"
                                    height="auto"
                                    value="<div>this is some code</div>"
                                    // value={JSON.stringify(configData, null, 2)}
                                />
                            }
                            {showSchema &&
                                <textarea
                                    disabled
                                    id="jsonResult"
                                    value="<div>this is the schema</div>"
                                    // value={JSON.stringify(schemaData, null, 2)}
                                />
                            }
                        </pre>
                        <div className="copy-to-clipboard">
                            <IconButton aria-label="copy to clipboard" size="small" onClick={copyToClipBoard}>
                                <ContentCopyIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   )
}