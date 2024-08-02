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
import ConfigBuilderForm from "./ConfigBuilderForm.jsx";
import ConfigViewButtonGroup from "./misc/ConfigViewButtonGroup.jsx";
import ConfigBuilderCreateNewModal from "./misc/ConfigBuilderCreateNewModal.jsx";
import { copyToClipBoard, copyTextFromInput } from './util/configBuilderPageFunctions';
import {loadTranslations, sortArray} from "./translation/TranslationUtils";

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
            setConfigData(configFileSample);
            loadConfigFile(configFileSample);
        }
    }, [])


    // just for debugging, so we know modules and systems got loaded
    useEffect(() =>{
        console.log('Systems: ', systems);
        console.log('Modules: ', modules);
        console.log('Schemas: ', moduleSchemas);
    }, [systems, modules])


    // FUNCTIONS

    /**
     * Summary:  Called when user is trying to create a new MODULE or SYSTEM.  Displays a modal for user to select the
     *           type (Interlock, HVAC, etc)
     * @param type: MODULE or SYSTEM
     */
    const handleAddClick = (type) => {

        // Prevent user from opening a new form before the current one is saved.
        if (showBuilderForm) {
            alert('Edit form is already open.  Submit (or close) the form to open another system or module.')
            return;
        }

        setFormType(type);
        setShowCreateNew(true);
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


    /**
     * Summary:  Creates an object containing all the lists the form and inputs may need.
     */
    const buildFormOptions = (config) => {
        // available systems - Used for dropdowns and multi-selects
        const existingSystems = Object.entries(config.systems).map(item => {
            return {
                label: item[1].meta.id,
                value: item[0],
                type: item[1].type
            }
        });

        //console.log('SchemaData: ', schemaData);
        //console.log('SystemSchemas: ', systemSchemas);

        let systemTypes = [];        
        if (systemSchemas) {
            // available schema types for systems
            systemTypes = systemSchemas.map((item) => {
                return {label: item, value: item}
            });
            systemTypes = sortArray(systemTypes);
        }

        let moduleTypes = [];
        if (moduleSchemas) {
            // available schema types for modules            
            moduleTypes = moduleSchemas.map((item) => {
                return {label: item, value: item}
            });
            moduleTypes = sortArray(moduleTypes);
        }

        /// STOPPED DOING IT THIS WAY BECAUSE MODULESCHEMAS HAD OLD VALUES.....
        // const moduleTypes = moduleSchemas.map((item) => {
        //     return { label: item, value: item}
        // });

        const sensorTypes = ["temperature", "dust", "humidity", "noise", "smoke", "vibration"].map((item) => {
            return {label: item, value: item}
        });;

        // translation lists -> going to need these later and only want to load once
        //const translationsList = loadTranslations();  // TODO -> this needs to be fixed
        const translationsList = [];

        // This is used by the Form to populate dropdowns and multi-selects.
        setFormOptions({
            existingSystems,
            systemTypes,
            moduleTypes,
            translationsList,
            sensorTypes
        })
    }


    /**
         * Summary:  Called when user is creating a new Module/System, at this point they have selected the new type (interlock, hvac, etc)
         *           and this opens the edit form.
         * @param val: represents a schema type ('light', 'awning');
         */
    const createNewCallback = (val) => {

        // close modal
        setShowCreateNew(false);
        setShowBuilderForm(false);
        setExistingItem(false);

        console.log('val: ', val);
        if (!val) {
            return;
        }

        // set up new name
        const titleCase = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
        const name = titleCase(val);

        const id = crypto.randomUUID();
        setSelectedId(id);
        const newObject = {
            id,
            meta: {
                id: (formType === MODULE) ? `${name} Module` : `${name} System`
            },
            type: val
        }
        setSelectedData(newObject);

        // show the edit form
        setTimeout( () => {
            setShowBuilderForm(true);
        }, 350)
    }


    /**
     * Summary:  Used to open edit form for an existing Module or System
     * @param id:  ID of module or system
     * @param type: MODULE or SYSTEM
     */
    const handleMenuItemClick = (id, type) => {

        setShowBuilderForm(false);
        setExistingItem(true);

        setSelectedId(id);
        setFormType(type);

        if (type == MODULE) {
            let module = modules.find(s => s.id == id);
            setSelectedData(module);
        }
        else {
            let system = systems.find(s => s.id == id);
            setSelectedData(system);
        }

        // animate the closing/opening of the form.
        setTimeout( () => {
            setShowBuilderForm(true);
        }, 350)
    }


    /**
     * Checks if schema exists based on name text passed in. 
     * @param {*} isModule 
     * @param {*} name 
     * @returns 
     */
    const doesSchemaExist = (isModule, name) => {
        return (isModule) ? moduleSchemas.includes(name) : systemSchemas.includes(name);
    }


    /**
     * Displays system/module name or related warnings.
     * @param {*} module 
     * @returns 
     */
    const renderModuleName = (module) => {
        const existingSchema = doesSchemaExist(true, module.type);
        if (!existingSchema) {
            return (
                <div style={{fontWeight: '500', padding: '5px', color: 'firebrick', opacity: '0.3'}} title="This module does not have a schema so it cannot be edited.">{module.meta.id}</div>
            );
        }

        const hasSystems = module?.systemIds?.length > 0;
        if (!hasSystems) {
            return (
                <div style={{fontWeight: '500', padding: '5px', color: 'orangered', opacity: '0.5'}} title="This module has no systems!">{module.meta.id}</div>
            );
        }

        return (
                <div style={{fontWeight: '500', padding: '5px'}}>{module.meta.id}</div>
        );
    }

   
    // RENDER
    return (
        <div>

            {showCreateNew &&
                <ConfigBuilderCreateNewModal
                    options={formOptions}
                    maxWidth={'lg'}
                    open={true} handleClose={() => setShowCreateNew(false)}
                    handleConfirm={createNewCallback}
                    handleCancel={() => setShowCreateNew(false)}
                    confirmMessage="Select the type to create"
                    errors={importErrors}
                    type={formType}
                />
            }

            <div className='builder-content'>
                <Box className='side-menu'>
                    {/* MODULES */}
                    <Box className="modules">
                        <Stack direction="row" className='section-title'>
                            <div className="heading">Modules</div>                            
                            <AddBoxOutlinedIcon onClick={() => handleAddClick(MODULE)}/>                            
                        </Stack>
                        <div className='systems-list'>
                        {modules.map((item, index) => (
                            <div key={`module-item-${index}`} className={`module-link ${item.id === selectedId ? "selected" : ""}`} onClick={() => handleMenuItemClick(item.id, 0) }>
                                <Stack direction="row" sx={{alignItems:"center", position: "relative"}}>
                                    <SpaceDashboardOutlinedIcon sx={{margin:" 0 10px", opacity: "0.5"}}/>

                                    {/*  DOES SCHEMA EXIST?  */}                                    
                                    {renderModuleName(item)}                                    
                                    <div style={{fontWeight: '600', fontSize: '0.7rem', padding: '5px', position: "absolute", right:"10px"}}>
                                        <Stack direction="row" sx={{alignItems: "center", }}>
                                            {item?.systemIds?.length > 0 &&
                                                <>
                                                    <ViewInArOutlinedIcon sx={{margin:"-0.0rem", scale: "0.5", color: 'gray' }}/>
                                                    {item?.systemIds?.length}
                                                </>
                                            }
                                        </Stack>
                                    </div>
                                </Stack>
                            </div>
                        ))}
                    </div>
                    </Box>
                    {/* SYSTEMS*/}
                    <Box className='systems'>
                        <Stack direction="row"  className='section-title'>
                            <div className="heading">Systems</div>                            
                            <AddBoxOutlinedIcon onClick={() => handleAddClick(SYSTEM)}/>
                        </Stack>
                        <div className='systems-list'>
                        {systems.map((item,index) => (
                            <div key={`system-item-${index}`}  className={`system-link ${item.id === selectedId ? "selected" : ""}`} onClick={() => handleMenuItemClick(item.id, 1) }>
                                <Stack direction="row" sx={{alignItems:"center"}}>
                                    <ViewInArOutlinedIcon sx={{margin:" 0 10px", opacity: "0.5", scale: "0.8", color: 'firebrick'}}/>

                                    {/*  DOES SCHEMA EXIST?  */}
                                    {systemSchemas.includes(item.type) ?
                                        <div style={{fontWeight: '500', padding: '5px', overflow: 'hidden'}}>{item.meta.id}</div> :
                                        <div style={{fontWeight: '500', padding: '5px', color: 'firebrick', opacity: '0.3'}}>{item.meta.id}</div>
                                    }

                                    {/*<div style={{fontWeight: '500', padding: '5px'}}>{item.meta.id}</div>*/}
                                </Stack>
                            </div>
                        ))}
                    </div>
                    </Box>
                </Box>
                <div className='content'>
                    <div className="builder-form">
                        {/* CONFIG BUILDER FORM GOES IN HERE --> May need to put original CSS back */}
                        <ConfigBuilderForm id={selectedId} type={formType} data={selectedData} options={formOptions} configFormSchema={schemaData} afterSubmit={updateFormCallback} cancelAction={handleCancelForm} interlockMapUpdate={interlockMapUpdate} getModuleSystems={getModuleSystems}/>
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
                                    value={JSON.stringify(configData, null, 2)}
                                />
                            }
                            {showSchema &&
                                <textarea
                                    disabled
                                    id="jsonResult"                                    
                                    value={JSON.stringify(schemaData, null, 2)}
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