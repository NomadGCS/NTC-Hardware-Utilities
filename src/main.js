const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('node:path');
const fs = require('fs');
const { readFile } = require('node:fs');

let mainWindow;             // This is what is displayed on the screen
let windows = new Set();    // This is the list of available browser windows to display

// ---------------------------------------------------------------------------------------------------------------------------
//  WEB APPS & EXTERNAL SITES
// ---------------------------------------------------------------------------------------------------------------------------

//  ./webapps/default/
const DEFAULT = DEFAULT_WEBPACK_ENTRY;                              
const DEFAULT_PRELOAD = DEFAULT_PRELOAD_WEBPACK_ENTRY; 

// ./webapps/interlockMapper/
const INTERLOCKMAP = INTERLOCK_MAPPER_WEBPACK_ENTRY;                
const INTERLOCKMAP_PRELOAD = INTERLOCK_MAPPER_PRELOAD_WEBPACK_ENTRY; 

// ./webapps/configBuilder/
const CONFIGBUILDER = CONFIG_BUILDER_WEBPACK_ENTRY;                 
const CONFIGBUILDER_PRELOAD = CONFIG_BUILDER_PRELOAD_WEBPACK_ENTRY; 
const MARKDOWN_DOCUMENTATION = "https://www.markdownguide.org/basic-syntax/#emphasis";
const CONFIGURATIONS_PATH = '../../configurations/';

let activeWindow = 0;

// ---------------------------------------------------------------------------------------------------------------------------
//  MENU 
// ---------------------------------------------------------------------------------------------------------------------------


// Menu
function createMenu() {

  let menuTemplate = [
    {
        label: "File",
        submenu: [
            { label: "Tip your local programmer", click: () => {switchWindow(INTERLOCKMAP, INTERLOCKMAP_PRELOAD)} },             
            { label: "Exit", click: () => { shutdown() } },             
        ]
    },
    {
      label: "Apps",
      submenu: [
          { label: "Build Interlock Map", click: () => {switchWindow(INTERLOCKMAP, INTERLOCKMAP_PRELOAD)} },
          { label: "Build Asset-Config", click: () => {switchWindow(CONFIGBUILDER, CONFIGBUILDER_PRELOAD)} },
          { label: "Learn Markdown", click: () => {switchWindow(MARKDOWN_DOCUMENTATION)} }          
      ]
    } 
  ];
  
  if (activeWindow === CONFIGBUILDER) {
    menuTemplate.push({
      label: "Config Builder", 
      submenu: [ 
        { label: "Show Systems/Modules", click: () => { openFolder(CONFIGURATIONS_PATH); } },       
      ]
    })
  }


  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}


// ---------------------------------------------------------------------------------------------------------------------------
//  WINDOW CREATION 
// ---------------------------------------------------------------------------------------------------------------------------

const doesWindowExist = (filepath) => {
  let result = windows.has(i => i.filepath === filepath);  
  return result;
}


const createWindow = (filepath,  preload = "") => {

  //console.log('windows: ', windows, doesWindowExist(filepath))

  let found = false;
  windows.forEach((item) => {
    if (item.filepath === filepath) {
      console.log('THIS WINDOW EXISTS!')
      mainWindow = item.window;
      mainWindow.show();
      found = true;
    }
  })

  if (found) {
    return;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {      
      preload: (preload != "") ? preload : DEFAULT_PRELOAD
    },
  });
  windows.add({filepath, window: mainWindow})

  
  // When X button is clicked, shutdown app & all windows
  mainWindow.on("closed", () => {    
    shutdown();
  })

  // We're either loading a remote website or an internal web app
  if (filepath.startsWith('http')) {
    console.log('load a website')
    mainWindow.loadURL(filepath)  
  }
  else {
    console.log('load a webapp')
    mainWindow.loadURL(filepath)        
  }

  // Open the DevTools.
  console.log('App Packaged?: ', app.isPackaged);
  if (!app.isPackaged) {
    // show dev tools in debug mode
    mainWindow.webContents.openDevTools();
  }
};


// ---------------------------------------------------------------------------------------------------------------------------
//  APP START AND SHUTDOWN
// ---------------------------------------------------------------------------------------------------------------------------

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow(DEFAULT, DEFAULT_PRELOAD);

  // Custom Menu - This will remove devtools ability  (ctrl+shift+i)
  // Possible Fixes - https://stackoverflow.com/questions/30294600/how-to-include-chrome-devtools-in-electron
  //
  createMenu()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    shutdown();
  }
});


// main function to close all windows and close the app
function shutdown() {
  console.log('Shutdown App')

  // close windows
  windows.forEach((item) => {      
    windows.delete(item);      
  });
  app.quit()
}


// ---------------------------------------------------------------------------------------------------------------------------
// MENU CLICKS 
//
// https://abstractentropy.com/notes-on-electron/
// https://stackoverflow.com/questions/66803870/how-to-process-events-from-the-application-menu-in-the-renderer
//
// ---------------------------------------------------------------------------------------------------------------------------
 
function switchWindow(webapp, preload = "") {
  console.log('Switch Window: ', windows.size)

  // hide current window
  mainWindow.hide();  

  // open web app 
  createWindow(webapp, preload);

  // update state
  activeWindow = webapp;

  createMenu();
}

function openFolder(relativePath) {
  shell.openPath(path.join(__dirname, relativePath));
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// This grabs all the text files in the folder name you send it
app.whenReady().then(()=> {
  // loads JSON files
  ipcMain.handle('get-Folder', (event, folder) => {
    const fileContents = {}
    fs.readdirSync(`./configurations/${folder}`).forEach(file => {
      let fileData = JSON.parse(fs.readFileSync(`./configurations/${folder}/${file}`))
      fileContents[fileData.type] = fileData
    })
    return fileContents
  });

  // opens file explorer
  // example: https://github.com/electron/electron/issues/36765
  ipcMain.handle('showItemInFolder', (event, fullPath) => {    
    //shell.openPath(path.join(__dirname, '../../configurations/'));
    openFolder(CONFIGURATIONS_PATH); 
  });
})

