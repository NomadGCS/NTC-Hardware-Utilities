import React, {useEffect, useState} from 'react'
import ConfigBuilder from './ConfigBuilder.jsx';

import './index.css';

//add all other config pages to this file
function MainPage() {
  const [selectedAssetConfig, setSelectedAssetConfig] = useState(null);
  const [availableFiles, setAvailableFiles] = useState([]);

  useEffect(() => {
    listFiles();
  }, [])

  async function listFiles() {
    let fileList = await window.electronAPI.listFilesInFolder();
    console.log('File List: ', fileList);
    setAvailableFiles(fileList);
  }
  
  async function openFolder() {
    await window.electronAPI.showItemInFolder('asset-configs')
  }

  async function handleRefresh() {
    listFiles();
  }


  async function handleFileSelect(file) {
    console.log('handleFileSelect: ', file);

    if (file.validJson) {
      let json = await window.electronAPI.loadFile(file.fileName);
      console.log('json: ', json);
    }
    else {
      alert('File is not valid Json. Fix it in a text editor and try again.  Click [Open Folder] to navigate to the directory.');
    }
  }


  // on start up, check if any asset-configs exist in asset-configs directy, and display them.  
  // when selected, load the config builder page.

  return (
    <>
      {selectedAssetConfig === null ? 
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
      <ConfigBuilder/>
      }
    </>
);
}

export default MainPage;
