import React, {useEffect, useState} from 'react'
import ConfigBuilderPage from './src/ConfigBuilderPage.jsx';
import {Box, Stack} from "@mui/material";
import './i18n/i18n.js';


export default function ConfigBuilder({assetConfigJSON, assetConfigFileName}) {
  const [modules, setModules] = useState(null)
  const [systems, setSystems] = useState(null)
  const [schema, setSchema] = useState(null)
  const [availableFiles, setAvailableFiles] = useState([]);

  // -------------------------------------------------------------------------------------------------
  // USE EFFECTS
  // -------------------------------------------------------------------------------------------------
  
  useEffect(() => {
    getFromMain();
  }, [])

  useEffect(() => {
    if (modules && systems) {
      const newSchema = {
        "version": "0.9.2",
        "templateVersion": "0.0.1",
        "modules": modules,
        "systems": systems
      }
      setSchema(newSchema);
    }
  }, [modules, systems])

  
  // -------------------------------------------------------------------------------------------------
  // FUNCTIONS
  // -------------------------------------------------------------------------------------------------

  async function getFromMain() {
    setModules(await window.electronAPI.getFolder('modules'))
    setSystems(await window.electronAPI.getFolder('systems'))
  }
  
  
  console.log("Modules: ", modules);
  console.log("Systems: ", systems);
  console.log("Schema: ", schema);

  return (       
    <div name='config-builder-component' style={{height:'100%', background: 'white', borderRadius: '7px'}}>  
      {schema ? 
        <ConfigBuilderPage assetConfigJSON={assetConfigJSON} assetConfigFileName={assetConfigFileName} schemaJSON={schema}> </ConfigBuilderPage>      
        :
        <div>Loading Schemas.  Please wait.</div>
      }
    </div>   
  )
}

  