// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  // loads json in folder
  getFolder: async (folder) => ipcRenderer.invoke('get-Folder', folder),
  // opens file explorer
  showItemInFolder(fullPath) {
    console.log('showIteminFolder: ', fullPath);
    return ipcRenderer.invoke('showItemInFolder', fullPath);
  }
})