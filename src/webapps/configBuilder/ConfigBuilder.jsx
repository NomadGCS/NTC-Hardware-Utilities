import React from 'react'

export default function ConfigBuilder() {
  async function getFromMain() {
    let test = await window.electronAPI.getModules()
    console.log(test)
  }
  return (
    <div>
      <h1>This is the future home of the config builder.</h1>
      <button onClick={getFromMain}>Get some modules!</button>
    </div>
  )
}

  