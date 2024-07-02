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
    <div>
      <h1>This is the future home of the config builder.</h1>
      <button onClick={getFromMain}>Get some configs in the console!</button>
      
      {/* Separator */}
      <div style={{margin: '4em 0'}}>
        <hr></hr>
      </div>

      {/* Component Listing - For Migration from NTC into Electron */}
      <div>
        <h3>This is a listing of all the components in the config builder</h3>

        <ConfigBuilderPage></ConfigBuilderPage>

      </div>

    </div>
  )
}

  