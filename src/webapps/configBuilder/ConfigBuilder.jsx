import React, {useState} from 'react'

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
    </div>
  )
}

  