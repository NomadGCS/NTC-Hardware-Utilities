import React, {useState, useEffect, useContext} from 'react'

// MUI
import Stack from "@mui/material/Stack";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// EXTRAS
import { useTranslation } from 'react-i18next'

// NTC
import ConfigFormElement from "./misc/ConfigFormElement.jsx";

// Extras
import {useForm} from "react-hook-form";
import NTCButton from "./base/NTCButton.jsx";

// CSS
import './styles/configbuilderpage.css'

// DATA
import {
    getValueAtLeaf,
    updateLeaf,
    convertArraysToObjects,
    convertValues,
    updateField
} from "./util/configBuilderUtils";
import IconButton from "@mui/material/IconButton";
import {Box} from "@mui/material";


/**
 * Summary:  Edit form for System or Module.
 * @param id (UUID):    Unique id of the system or module.
 * @param type (INT):   0 = MODULE, 1 = SYSTEM
 * @param data (JSON):  The system or module
 * @param options (obj) :      Global data and functions needed for the form.
 * @param configFormSchema (obj) : config schema
 * @param afterSubmit (fn) :  Parent function to call after form is submitted.
 * @param cancelAction (fn) : Parent function to call after form is cancelled.
 * @returns {Element}
 * @constructor
 */
export default function ConfigBuilderForm({id, type, data, options, configFormSchema, afterSubmit, cancelAction, interlockMapUpdate, getModuleSystems}) {
    const { t, i18n, ready } = useTranslation();
    const [displayName, setDisplayName] = useState(data?.meta?.id ?? "")

    // EDIT FORM
    const [formErrors, setFormErrors] = useState({state: false, error: ''});
    const [selectedFormType, setSelectedFormTypes] = useState(data.type);
    const [selectedSchema, setSelectedSchema] = useState({})
    const [formOptions, setFormOptions] = useState(options);

    const [interlockData, setInterlockData] = useState({})

    const MODULE = 0;
    const SYSTEM = 1;

    //console.log('jb ConfigBuilderForm: ', type, data, options, configFormSchema)
    
    useEffect(() => {

        // HACK:  Update the options.systemTypes to only include systems of the same type as this module/system.
        //        Find a more elegant (less hardcoded) way of doing this.  Maybe in ConfigPage when menuItem is selected.
        let updatedOptions = structuredClone(options);

        let existingSystems = 'existingSystems';
        let existingSystemsForModule = 'existingSystemsForModule'
        if (updatedOptions && updatedOptions[existingSystems]) {
            updatedOptions[existingSystemsForModule] = updatedOptions[existingSystems].filter(s => s.type === selectedFormType);
            setFormOptions(updatedOptions);
        }

        // HACK:  Fix issue where schema is nested in object
        const configSchemaSample = configFormSchema?.configFormSchema ?? null;
        if (configSchemaSample) {
            //setSchemaData(schemaData.configFormSchema);
            console.log('......fixing schema......')
            configFormSchema = configSchemaSample;
        }

    }, [])


    useEffect( () => {
        // Reset Form Error State
        setFormErrors({ state: false, errors: ''})

        // if (!data || !data.type) {
        //     return;
        // }


        // TODO:  Break each block of sections into separate functions

        // ------------------------------------------------------------------------------------------------------
        // MAKE SURE WE HAVE A VALID SCHEMA
        // ------------------------------------------------------------------------------------------------------

        console.log('jb ConfigBuilderForm - useEffect: ', configFormSchema)

        if (!configFormSchema) {
            console.error('There is no schema!')
            setFormErrors({ state: true, errors: 'There is no schema.'})
            return;
        }

        if (type === MODULE) {
            if(!configFormSchema.modules) {
                setFormErrors({ state: true, errors: 'There are no modules defined in schema!'})
                console.error('There are no modules defined in schema!')
                return;
            }
            if (!Object.keys(configFormSchema.modules).includes(data.type)) {
                const message = `There is no schema for module type: ${data.type}`
                setFormErrors({ state: true, errors: message})
                console.error(message)
                return;
            }
        }
        else {
            if (!configFormSchema.systems) {
                setFormErrors({ state: true, errors: 'There are no systems defined in schema!'})
                console.error('There are no systems defined in schema!')
                return;
            }
            if (!Object.keys(configFormSchema.systems).includes(data.type)) {
                const message = `There is no schema for system type: ${data.type}`
                setFormErrors({ state: true, errors: message})
                console.error(message)
                return;
            }
        }

        // ------------------------------------------------------------------------------------------------------
        // CREATE A COPY OF THE GLOBAL SCHEMA CONFIG
        // ------------------------------------------------------------------------------------------------------

        // Create a deep copy of the schemas template, so we can modify it and not break other templates.
        const allSchemas = structuredClone(configFormSchema);
        const schema = (type === MODULE) ? Object.entries(allSchemas.modules).find(s => s[0] === selectedFormType)
                                                          : Object.entries(allSchemas.systems).find(s => s[0] === selectedFormType);

        // ------------------------------------------------------------------------------------------------------
        // START LOADING DATA FOR THE EDIT FORM
        // ------------------------------------------------------------------------------------------------------

        // This is our form template schema which we are going to populate with values.
        let formTemplate = {};
        formTemplate = {
            ...schema[1],
            //type: schema[0]
        }

        //console.log('jb formTemplate: ', schema, formTemplate);

        // Loop through each node in the form template schema and update its value
        // with the actual data for this Module/System (if data exists), or leave it alone and keep the default values
        // defined in the schema.
        let fields = Object.values(formTemplate);
        fields.forEach(field => {
            let existingValue = getValueAtLeaf(data, field.path);
            if (existingValue !== undefined && existingValue !== null) {
                field.value = existingValue;
            }
        })


        // TODO - Handle scenario where Form Type was not found (schema object is empty).
        //console.log('jb setSelectedSchema: ---------------------------------', formTemplate);
        setSelectedSchema(formTemplate);

    }, [data])


    const {
        register,
        unregister,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({})

    const rhf = { register, unregister, control, setValue, errors, handleSubmit, interlockData, setInterlockData }

    /**
     * Summary: Takes data from the form, converts it, and updates the UI state.
     *          This uses the schemas 'label' field as the primary key in React-Hook-Form.
     *          Certain data (like multiselects) need to be modified before being used by the UI.     *
     *
     *  TODO:   Write some unit tests against this function as it is the most important function in the config builder.
     * @param formData
     * @returns {Promise<void>}
     */
    const onSubmit = async (formData) => {
        console.log('jb onSubmit: ', selectedSchema, formData);
        //console.log('jb onsubmit data: ', data);
        try {
            // Loop through all fields in the schema.
            Object.values(selectedSchema).forEach(field => {

                if (field.type === "separator") {
                    return;
                }

                // Updates global data based on the field's schema and what is in formData.
                // Separated out so can run tests against it.
                updateField(data, formData, field);

                /*
                    // FUTURE:  1.  Instead of updateField doing everything should have a method to do the data logic, then call updateLeaf.
                    //          2.  Inputs should manage their data entirely instead of using delete flags.  Would cut down on data logic.

                    const result = processField(formData, field);
                    updateLeaf(data, field.path, result.value)
                 */

            });

            if (formData.type === 'interlock' && Object.keys(interlockData)) {
                Object.keys(interlockData).map((system) => {
                    let selectedSystem = interlockMapUpdate(system)
                    let interlock = interlockData[system][0]
                    updateLeaf(selectedSystem, 'config.x', interlock.x);
                    updateLeaf(selectedSystem, 'config.y', interlock.y);
                    updateLeaf(selectedSystem, 'config.height', interlock.height);
                    updateLeaf(selectedSystem, 'config.width', interlock.width);
                })
            }

        }
        catch(e) {
            console.error('jb Error caught in onSubmit: ', e.message, formData);
        }

        console.log('jb After Submit: ', data);
        // HOC function
        afterSubmit(data);
    }


    /**
     * Summary:  Used to delete a system or module.  Works by assigning a delete flag and sending back to parents
     *           update function.
     */
    const handleDelete = () => {
        if (confirm("Are you sure you wish to delete this system or module?")) {
            data.delete = true;
            afterSubmit(data);
        }
    }

    /**
     * Summary:  Some fields containing similar data should be rendered on the same row, so loop through the
     *           list of schema fields and put them in groups (specific attribute on the field).  If a field doesn't
     *           have a 'group' attribute, then it is put into its own group, which is the case for most fields.
     * @returns {*[]}
     */
    const groupedFields = () => {
        const fields = Object.values(selectedSchema);
        const result = [];

        console.log('Fields: ', fields);

        let currentGroupNumber = 0;
        let currentGroup = [];
        fields.forEach(field => {
            if (!field.group) {
                if (currentGroup.length > 0) {
                    result.push(currentGroup);
                    currentGroup = [];
                }
                result.push([field]);     // Field has no group, make its own group
            }
            else if (field.group === currentGroupNumber) {
                currentGroup.push(field);   // Field is part of current group, add it to group
                currentGroupNumber = field.group;
            }
            else {
                if (currentGroup.length > 0) {
                    result.push(currentGroup);  // Field is part of different group, add current group, start new one
                }
                currentGroup = [field];
                currentGroupNumber = field.group;
            }
        })
        // had a left over group, add it to the list.
        if (currentGroup.length > 0) {
            result.push(currentGroup);
            currentGroup = [];
        }
        return result;
    }
    let groups = groupedFields();
    console.log('Groups: ', groups);

    // RENDER
    if (formErrors.state) {
        return <div style={{padding: '0 20px', color: 'firebrick'}}>
            <h3>Errors</h3>
            <p>{formErrors.errors}</p>
        </div>
    }
    return (
        <div className="module-details">
            {t(`modules.dashboard.name`)}
            <fieldset className="form-wrap">
                <legend style={{maxWidth:'450px', overflow: 'hidden'}}>{displayName}</legend>
                <div style={{fontSize: '0.9em'}}>{id}</div>
                <form>
                    {groups &&
                        <Stack direction={"column"} spacing={2}>
                            {groups.map(group => (
                                // The list of schema fields are now grouped so certain fields can be on the same row
                                (group.length > 1) ?
                                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(auto-fill, 5em)', columnGap: '5em',
                                    background: "#f1f1f1",
                                    padding: "16px",
                                    paddingBottom: "32px",
                                    borderRadius: "8px",
                                    // borderTop: "6px solid #0079bd"
                                }}
                                     key={crypto.randomUUID()}
                                >
                                    {group.map(item => (
                                        <ConfigFormElement key={crypto.randomUUID()} data={item} options={formOptions} rhf={rhf} getModuleSystems={getModuleSystems} />
                                    ))}
                                </Box>
                                    :
                                <Box key={crypto.randomUUID()}>
                                    {group.map(item => (
                                        <ConfigFormElement key={crypto.randomUUID()} data={item} options={formOptions} rhf={rhf} getModuleSystems={getModuleSystems} />
                                    ))}
                                </Box>
                            ))}
                        </Stack>
                    }
                </form>
            </fieldset>
            <div className="action-row">
                    <div style={{ position: 'absolute', top: '15px', left: '5px' }} title="Delete">
                        <IconButton className={'action-button delete'} aria-label="copy to clipboard" size="small" onClick={() => handleDelete()}>
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                    </div>

                    <div className="tertiary-button" onClick={cancelAction}>
                        Cancel
                    </div>

                    <NTCButton
                        onClick={handleSubmit(onSubmit)}
                        text="Submit"
                        backgroundColor='#0079bd'
                    />
            </div>
        </div>
    )
}

