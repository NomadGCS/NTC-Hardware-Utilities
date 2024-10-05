import React, {useEffect, useState} from 'react'
import ConfigBuilder from './ConfigBuilder.jsx';

import './index.css';
import { FileNameModalDialog } from "./src/base/modals/FileNameModalDialog.jsx";

// TODO:  add all other config pages to this file

// -------------------------------------------------------------------------------------------------
// Summary:
// On start up, check if any asset-configs exist in asset-configs directory, and display them.  
// when selected, load the config builder page.
// -------------------------------------------------------------------------------------------------
function MainPage() {
  const [selectedAssetConfig, setSelectedAssetConfig] = useState(null);
  const [availableFiles, setAvailableFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [showModal, setShowModal] = useState(false);

  
  // -------------------------------------------------------------------------------------------------
  // USE EFFECTS
  // -------------------------------------------------------------------------------------------------

  useEffect(() => {
    listFiles();    
  }, []);


  // this causes the list of asset configs to reload when the user comes back to the loading screen
  useEffect(() => {
    if (!selectedAssetConfig) {
      listFiles();
    }
  }, [selectedAssetConfig])


  // -------------------------------------------------------------------------------------------------
  // FUNCTIONS
  // -------------------------------------------------------------------------------------------------

  // Gets the asset configs saved locally
  async function listFiles() {
    let fileList = await window.electronAPI.listFilesInFolder();
    console.log('File List: ', fileList);
    setAvailableFiles(fileList);
  }

  // Gets the modules/systems saved locally
  async function getFromMain() {
    setModules(await window.electronAPI.getFolder('modules'));
    setSystems(await window.electronAPI.getFolder('systems'));
  }
  
  // Open the aset-config folder so users can manage them
  async function openFolder() {
    await window.electronAPI.showItemInFolder('asset-configs')
  }

  // Refresh the list of files
  async function handleRefresh() {
    listFiles();
  }

  // Check if asset-config is valid
  function checkAssetConfig(json) {
    return (json["systems"] && json["modules"]);    
  }

  // Initialize a blank asset-config
  function createNewSchema() {
    let schema = {
      "version": "0.9.2",
      "modules": {},
      "systems": {}
    }
    return schema;
  }

  // Loads asset-config, passed data to config-builder component
  async function handleFileSelect(file) {
    console.log('handleFileSelect: ', file);

    if (file.validJson) {
      let json = await window.electronAPI.loadFile(file.fileName);
      console.log('json: ', json);      
      setFileName(file.fileName);

      // Make sure this is a valid asset-config.  
      // This will overwrite all contens of the file if it is not.
      if (!checkAssetConfig(json)) {
        json = createNewSchema();
      }

      setSelectedAssetConfig(json);      
    }
    else {
      alert('File is not valid Json. Fix it in a text editor and try again.  Click [Open Folder] to navigate to the directory.');
    }
  }


  // Creates a new blank asset-config
  async function handleNewFile(name) {   
    console.log('handleNewFile: ', name);
    if (name) { 
      setFileName(name);    
      const json = createNewSchema();
      setSelectedAssetConfig(json);      
    }
    setShowModal(false);
  }

  return (
    <>
      {selectedAssetConfig === null ? 

      // LOADING SCREEN
      <div>

        {/* INSTRUCTIONS */}
        <div>
          <h2>Config Builder</h2>
          <h3>Instructions</h3>          
          <p>This tool is used to create and update Asset-Configs.  Files are stored locally on your pc at the locations below.  The fields which show up in the config builder
            are defined in schemas.  You can edit existing schemas (to add a new option to a Light System for example) and you can also create new Systems by creating a new schema.
            If you do edit or create a new schema, remember to check them into github so the rest of the team has access.
          </p>
          <h3>Important Folder Paths</h3>          
          <ul>
            <li><b>Local Folder Path:</b>  C:\Users\[first].[last]\AppData\Roaming\config-builder </li>
            <li><b>Shared Folder Path:</b>  O:\NTC Shared\Config-Builder </li>
            <li><b>Asset Configs:</b>   \asset-configs</li>
            <li><b>Module Schemas:</b>  \configurations\modules</li>
            <li><b>System Schemas:</b>  \configurations\systems</li>
          </ul>
        </div>

        {/* NEW FILE MODAL  */}
        {showModal &&
          <FileNameModalDialog
              maxWidth={'xk'}
              open={true} handleClose={() => setShowModal(false)}
              modalTitle={"New Asset Config"}
              handleConfirm={handleNewFile}
              handleCancel={() => setShowModal(false)}
              confirmMessage="Enter a file name"              
          />
        }

        {/* <h1>Load/New Screen</h1>   */}

        {/* ASSEST CONFIGS */}        
        <div style={{marginTop: '2em'}}>
          <div>
            <span style={{fontSize: '1.4em'}}> Asset Configs </span>
            <span style={{float: 'right'}}><button onClick={handleRefresh}>Refresh</button></span>  
            <span style={{float: 'right'}}><button onClick={openFolder}>Open Folder</button></span>          
          </div>
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
          <button style={{float: 'right', marginTop: '0.5em'}} onClick={() => {setShowModal(true)}}>New</button>
        </div>            
      </div>
        : 
        <>
          {/* WHEN JSON IS LOADED, DISPLAY CONFIG BUILDER */}
          <ConfigBuilder assetConfigJSON={selectedAssetConfig} assetConfigFileName={fileName}/>
          <button onClick={() => {setSelectedAssetConfig(null)}}>Back</button>
        </>
      }      
    </>
);
}

export default MainPage;
