import React, {useState} from 'react'
import ConfigBuilderPage from './src/ConfigBuilderPage.jsx';

import {Box, Stack} from "@mui/material";



export default function ConfigBuilder() {
  const [modules, setModules] = useState(null)
  const [systems, setSystems] = useState(null)

  async function getFromMain() {
    setModules(await window.electronAPI.getFolder('modules'))
    setSystems(await window.electronAPI.getFolder('systems'))
  }

  console.log(modules)
  console.log(systems)
  return (       
    <div name='config-builder-component' style={{height:'100%', background: 'white', borderRadius: '7px'}}>      
      <ConfigBuilderPage></ConfigBuilderPage>
    </div>   
  )
}

  