import React, {useState, useEffect, useRef} from 'react'

// MUI
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';


// ICONS
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



// CSS
import './styles/configbuilderpage.css'

export default function ConfigBuilderPage() {

    // function

   
    // RENDER
    return (
        <div style={{background: 'white'}}>
            <div className='builder-content'>
                <Box className='side-menu'>
                    {/* MODULES */}
                    <Box className="modules">
                        <Stack direction="row" className='section-title'>
                            <div className="heading">Modules</div>
                            {/* <AddBoxOutlinedIcon onClick={() => handleAddClick(MODULE)}/> */}
                        </Stack>
                    </Box>
                    {/* SYSTEMS*/}
                    <Box className='systems'>
                        <Stack direction="row"  className='section-title'>
                            <div className="heading">Systems</div>
                            {/* <AddBoxOutlinedIcon onClick={() => handleAddClick(SYSTEM)}/> */}
                        </Stack>
                    </Box>
                </Box>
                <div className='content'>
                    <div className="builder-form"></div>
                    <div className="json-layout"></div>
                </div>
            </div>
        </div>
   )
}