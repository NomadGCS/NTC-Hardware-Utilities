import React, {useEffect, useState} from 'react'
import ConfigBuilderPage from './src/ConfigBuilderPage.jsx';
import {Box, Stack} from "@mui/material";
import './i18n/i18n.js';


export default function ConfigBuilder() {
  const [modules, setModules] = useState(null)
  const [systems, setSystems] = useState(null)
  const [schema, setSchema] = useState(null)
  const [availableFiles, setAvailableFiles] = useState([]);

  async function getFromMain() {
    setModules(await window.electronAPI.getFolder('modules'))
    setSystems(await window.electronAPI.getFolder('systems'))
  }

  async function openFolder() {
    await window.electronAPI.showItemInFolder('C:\\Users\\john.bissen\\VS Projects\\NTC-Hardware-Utilities\\configurations\\modules')
  }
  
  async function listFiles() {
    let fileList = await window.electronAPI.listFilesInFolder();
    console.log('File List: ', fileList);
    setAvailableFiles(fileList);
  }

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

  console.log(modules);
  console.log(systems);
  console.log(schema);

  return (       
    <div name='config-builder-component' style={{height:'100%', background: 'white', borderRadius: '7px'}}>  
      <div>
        <button onClick={getFromMain}>Get Files</button>
        <button onClick={openFolder}>Open Folder</button>
        <button onClick={listFiles}>List Files</button>
      </div>    
      <ConfigBuilderPage></ConfigBuilderPage>
    </div>   
  )
}

  