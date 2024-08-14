import React, {useState} from 'react'
import ConfigBuilderPage from './src/ConfigBuilderPage.jsx';
import {Box, Stack} from "@mui/material";
import './i18n/i18n.js';


export default function ConfigBuilder() {
  const [modules, setModules] = useState(null)
  const [systems, setSystems] = useState(null)

  async function getFromMain() {
    setModules(await window.electronAPI.getFolder('modules'))
    setSystems(await window.electronAPI.getFolder('systems'))
  }

  async function openFolder() {
    await window.electronAPI.showItemInFolder('C:\\Users\\john.bissen\\VS Projects\\NTC-Hardware-Utilities\\configurations\\modules')
  }

  console.log(modules)
  console.log(systems)

  return (       
    <div name='config-builder-component' style={{height:'100%', background: 'white', borderRadius: '7px'}}>  
      <div>
        <button onClick={getFromMain}>Get Files</button>
        <button onClick={openFolder}>Open Folder</button>
      </div>    
      <ConfigBuilderPage></ConfigBuilderPage>
    </div>   
  )
}

  