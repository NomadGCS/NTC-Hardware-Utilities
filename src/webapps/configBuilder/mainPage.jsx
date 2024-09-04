import React, {useEffect, useState} from 'react'
import ConfigBuilder from './ConfigBuilder.jsx';

import './index.css';

// TODO:  add all other config pages to this file

// -------------------------------------------------------------------------------------------------
// Summary:
// On start up, check if any asset-configs exist in asset-configs directory, and display them.  
// when selected, load the config builder page.
// -------------------------------------------------------------------------------------------------
function MainPage() {
  const [selectedAssetConfig, setSelectedAssetConfig] = useState(null);
  const [availableFiles, setAvailableFiles] = useState([]);

  // -------------------------------------------------------------------------------------------------
  // USE EFFECTS
  // -------------------------------------------------------------------------------------------------

  useEffect(() => {
    listFiles();
  }, [])


  // -------------------------------------------------------------------------------------------------
  // FUNCTIONS
  // -------------------------------------------------------------------------------------------------

  // Gets the asset configs saved locally
  async function listFiles() {
    let fileList = await window.electronAPI.listFilesInFolder();
    console.log('File List: ', fileList);
    setAvailableFiles(fileList);
  }
  
  // Open the aset-config folder so users can manage them
  async function openFolder() {
    await window.electronAPI.showItemInFolder('asset-configs')
  }

  // Refresh the list of files
  async function handleRefresh() {
    listFiles();
  }


  // Loads asset-config, passed data to config-builder component
  async function handleFileSelect(file) {
    console.log('handleFileSelect: ', file);

    if (file.validJson) {
      let json = await window.electronAPI.loadFile(file.fileName);
      console.log('json: ', json);
      setSelectedAssetConfig(json);
    }
    else {
      alert('File is not valid Json. Fix it in a text editor and try again.  Click [Open Folder] to navigate to the directory.');
    }
  }



  return (
    <>
      {selectedAssetConfig === null ? 

      // LOADING SCREEN
      <div>
        <h1>Load/New Screen</h1>      
        <span><button onClick={handleRefresh}>Refresh</button></span>  
        <span><button onClick={openFolder}>Open Folder</button></span>  
        <table id='assetConfigLoader' style={{width: '100%', backgroundColor: 'white', border: '1px solid #ccc'}}>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Size</th>
              <th>JSON</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
          {availableFiles.map((item, index)=> (
            <tr key={`file-${index}`} onClick={() => handleFileSelect(item)} className={(!item.validJson) ? 'invalid' : 'hoverable'}>
              <td>{item.fileName}</td>
              <td>{item.fileSize}</td>
              <td>{(item.validJson) ? 'VALID' : 'NOT VALID'}</td>
              <td>{item.lastModified}</td>
            </tr>
          ))}   
          </tbody>       
        </table>
      </div>
        : 
        <>
          {/* WHEN JSON IS LOADED, DISPLAY CONFIG BUILDER */}
          <ConfigBuilder assetConfigJSON={selectedAssetConfig} />
          <button onClick={() => {setSelectedAssetConfig(null)}}>Back</button>
        </>
      }
    </>
);
}

export default MainPage;
