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
import { copyToClipBoard, copyTextFromInput } from './util/configBuilderPageFunctions'

// Data
import { configFileSample } from "./data/configUIData";
import { configFormSchema } from "./data/configFormSchema";

// CSS
import './styles/configbuilderpage.css'


export default function ConfigBuilderPage() {

    // STATE
    const [showSchema, setShowSchema] = useState(false);
    const [showBuilderForm, setShowBuilderForm] = useState(false);
    const [configData, setConfigData] = useState({configFileSample})
    const [modules, setModules] = useState([])
    const [systems, setSystems] = useState([])
    const [schemaData, setSchemaData] = useState({configFormSchema})
    const [systemSchemas, setSystemSchemas] = useState(Object.keys(configFormSchema.systems));
    const [moduleSchemas, setModuleSchemas] = useState(Object.keys(configFormSchema.modules));
    const [schemaChanged, setSchemaChanged] = useState(0);
    const [fileName, setFileName] = useState("my-asset-config.json");

    // STATE - IMPORT MODAL
    const [showImportModal, setShowImportModal] = useState(false);
    const [importErrors, setImportErrors] = useState("")

    // STATE - CREATE NEW
    const [showCreateNew, setShowCreateNew] = useState(false);

    // STATE - BUILDER FORM
    const [existingItem, setExistingItem] = useState(false)
    const [selectedId, setSelectedId] = useState(-1);
    const [formType, setFormType] = useState(0);            // 0 = module, 1 = system
    const [selectedData, setSelectedData] = useState({});   //
    const [formTemplate, setFormTemplate] = useState({});   // from configFormSchema
    const [formOptions, setFormOptions] = useState({})

    const MODULE = 0;
    const SYSTEM = 1;

    /**
     * Called first time this component is loaded
     */
    useEffect(()=>{
        const configSchemaSample = schemaData?.configFormSchema ?? null;
        if (configSchemaSample) {
            setSchemaData(schemaData.configFormSchema);
        }

        const configFileSample = configData?.configFileSample ?? null;
        if (configFileSample) {
            console.log(configFileSample)
            //setConfigData(configFileSample);
            //loadConfigFile(configFileSample);
        }
    }, [])


    // FUNCTIONS
    const handleAddClick = () => {
        console.log('handleAddClick')
    }    
    const handleImportModal = () => {
        console.log('handleImportModal')
        alert('Import files')
    }

    /**
     * Summary: Called after the input modal has been submitted.  This replaces the current asset-config JSON and replaces
     *          it with the JSON contained in the import modal.
     */
    const handleImport = () => {
        try {

            // Get the file name
            const fn = document.getElementById("selectedFileName");
            if (fn) {
                setFileName(fn.value);
            }

            // Get JSON from the textarea and use it
            const json = copyTextFromInput("importTextArea");
            const newData = JSON.parse(json);             // This is where the errors will come from.

            // are we loading a new schema or a new config....
            if (showSchema) {
                setSchemaData(newData);
                setSchemaChanged(schemaChanged+1);
            }
            else {
                setConfigData(newData);
            }

            setShowImportModal(false)
        }
        catch (e) {
            const message = `Error caught while parsing JSON.  ${e.message}`;
            setImportErrors(message)
        }
    }


    /**
     * Summary:  Loads JSON into UI state variables
     * @param config: asset-config.json
     */
    const loadConfigFile = (config) => {
        try {

            // Get Modules
            if (config.modules) {
                let moduleArray = Object.entries(config.modules).map(item => {
                    return {
                        id: item[0],
                        ...item[1]
                    }
                });
                setModules(moduleArray);
            }
            else {
                setModules([])
            }

            // Get Systems
            if (config.systems) {
                let systemArray = Object.entries(config.systems).map(item => {
                    return {
                        id: item[0],
                        ...item[1]
                    }
                });
                setSystems(systemArray);

                // create and store all the global form options
                buildFormOptions(config);

            }
            else {
                setSystems([])
            }
        }
        catch(e) {
            const message = `Error caught loading new config file.  ${e.message}`
            console.error('jb loadconfigfile: ', e);
            alert(message);
        }
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