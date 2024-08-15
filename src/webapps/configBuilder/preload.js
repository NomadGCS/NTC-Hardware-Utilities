// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  // loads and returns all json files in folder
  getFolder: async (folder) => ipcRenderer.invoke('get-Folder', folder),
  // loads and returns a single json file in folder
  loadFile: async (file) => ipcRenderer.invoke('load-File', file),
  // gets list of files in folder
  listFilesInFolder: async () => ipcRenderer.invoke('listFilesInFolder'),
  // opens file explorer
  showItemInFolder(name) {    
    return ipcRenderer.invoke('showItemInFolder', name);
  }
})