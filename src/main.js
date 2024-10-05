const { app, BrowserWindow, ipcMain, Menu, shell, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');
const { readFile } = require('node:fs');
const moment = require('moment');

import log from 'electron-log/main';


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
const CONFIGURATIONS_PATH =  'configurations';  //'../../configurations/';
const ASSET_CONFIGS_PATH = 'asset-configs';  //'../../asset-configs/';

// TODO:  Move this to an external .ini eventally
const configBuilderSetup = {
  requiredFolders: [
    {
      name: 'moduleSchemas',
      path: 'configurations\\modules',
      copyFrom: 'O:\\NTC Shared\\Config-Builder\\configurations\\modules\\'
    },
    {
      name: 'systemSchemas',
      path: 'configurations\\systems',
      copyFrom: 'O:\\NTC Shared\\Config-Builder\\configurations\\systems\\'
    },
    {
      name: 'assetConfigs',
      path: 'asset-configs',
      copyFrom: 'O:\\NTC Shared\\Config-Builder\\asset-configs\\'
    }
  ]
}



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
  mainWindow.webContents.openDevTools();  /// bug:  in production inputs don't work without this?
  // if (!app.isPackaged) {
  //   // show dev tools in debug mode
  //   mainWindow.webContents.openDevTools();
  // }
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
  createMenu();

  log.initialize();

  // directories needed for config builder
  initializeDirectories();
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


// Make sure the required directories exist
function initializeDirectories() {  
  configBuilderSetup.requiredFolders.forEach((item) => {  
    const localPath = getLocalPathString(item.path); 

    console.log('LocalPath: ', localPath);
    log.info('LocalPath: ', localPath);

    verifyFolderExists(localPath, item.copyFrom);   
    verifyFilesExist(localPath, item.copyFrom); 
  })
}


// central spot to get local paths for config builder
function getLocalPathString(relativePath) {
  const userDataPath = app.getPath('userData');  console.log('User Data Path: ', userDataPath);
  return path.join(app.getPath('userData'), relativePath);
}


function getFileCount(folderPath) {
  const filesInDirectory = fs.readdirSync(folderPath, (err, files) => {
    if (err) {      
      log.error('Error: ', err);
      return 0;
    }
    else {      
      return files;
    }
  });

  return filesInDirectory.length;     
}

// checks if local folder has file and if not, copy from network drive
function verifyFilesExist(folderPath, copyFromPath) {
  log.info('Verify Files Exist: ', folderPath, copyFromPath);
  let localFileCount = getFileCount(folderPath);
  
  log.info(folderPath.split('\\').pop(), ' | file Count: ', localFileCount);

  if (localFileCount < 1) {
    // copy entire directory      
    log.info('Copy files: ', copyFromPath, folderPath);

    fs.cp(copyFromPath, folderPath, { recursive: true}, (err) => {
      if (err) {
        console.error(err);
        log.error('Error: ', err);
        return;
      } 

      console.log('directory copied successfully!');
      log.info('Directory copied successfully: ', folderPath);
      
      // after 
      let postFileCount = getFileCount(folderPath);  
      log.info(folderPath.split('\\').pop(), ' | post File Count: ', postFileCount);
    });
  }  
}


// checks if folder exists, and create if it doesn't
function verifyFolderExists(folderPath, copyFromPath) {
  if (!fs.existsSync(folderPath)){

    console.log('Folder does not exist, creating it: ', folderPath);
    log.info('Folder does not exist, creating it: ', folderPath);

    fs.mkdirSync(folderPath, { recursive: true });       
  }
  else {
    console.log('Folder exists: ', folderPath);
    log.info('Folder exists: ', folderPath);
  }
}

function openFolder(relativePath) {
  const localPath = getLocalPathString(relativePath);
  shell.openPath(localPath);
}

function parseJsonFile(filePath) {
  let fileData = JSON.parse(fs.readFileSync(filePath));
  return fileData;
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// This grabs all the text files in the folder name you send it
app.whenReady().then(()=> {

  // saves JSON file to directory
  ipcMain.handle('save-json', (event, json, fileName) => {    
    try {
      const fullPath = getLocalPathString(ASSET_CONFIGS_PATH + "\\" + fileName);        
      log.info("Save-Json: ", fileName, ' | ', fullPath);    
      fs.writeFileSync(fullPath, json);
    }
    catch(ex) {
      console.error('Exception caught while saving JSON: ', ex);
      dialog.showErrorBox(`Error saving json to file`, `Error in ${json}, ${fileName}.  ${ex.message}.`);        
    }
  });


  // loads JSON files in a specific folder
  ipcMain.handle('get-Folder', (event, folder) => {
    log.info('get-Folder: ', folder);
    const fileContents = {};
    let numberOfFiles = 0;
    let numberOfFilesLoaded = 0;   
    let folderPath = getLocalPathString(folder);    
    fs.readdirSync(folderPath).forEach(file => {
      try
       {
        numberOfFiles++;        
        let fileData = parseJsonFile(folderPath + '/' + file)        
        const systemType = fileData.type;
        const fields = fileData.fields;        
        fileContents[systemType] = fields;
        numberOfFilesLoaded++;

        log.info('reading file....', file);
        
      }
      catch(ex) {      
        log.error('Exception caught while parsing JSON: ', ex);
        console.error('Exception caught while parsing JSON: ', ex);
        dialog.showErrorBox(`Error Parsing JSON from folder [${folder}]`, `Error in ${file}.  ${ex.message}.  Open the file in a text editor like Notepad++ and verify it is valid JSON.`);        
      }
    })

    return fileContents
  });

  // loads JSON file in folder
  ipcMain.handle('load-File', (event, file) => {
    let fileContents = {};
    
    try {  
      const fullPath = getLocalPathString(ASSET_CONFIGS_PATH);          
      fileContents = parseJsonFile(`${fullPath}/${file}`);     
    }
    catch(ex) {    
      log.error('Exception caught while parsing JSON: ', ex);
      console.error('Exception caught while parsing JSON: ', ex);
      dialog.showErrorBox(`Error Parsing JSON in file [${file}]`, `Error in ${file}.  ${ex.message}.  Open the file in VS Code and verify it is valid JSON.`);        
    }
   
    return fileContents
  });


  // returns a list of file names in a directory
  ipcMain.handle('listFilesInFolder', (event) => {   
    const fileList = []; 
    const fullPath = getLocalPathString(ASSET_CONFIGS_PATH);
    console.log('List Files In Folder: ', fullPath);

    fs.readdirSync(fullPath).forEach(file => {      
      let stats = fs.statSync(`${fullPath}/${file}`);

      // get last modified date/time
      const lastModifiedMS = stats.mtimeMs;          
      const formattedTime = moment(lastModifiedMS).format("dddd, MMMM Do, YYYY h:mm A")

      // get filesize in KB
      const fileSize = Math.ceil(stats.size / 1024) + " KB";          
      
      // attempt to parse file
      let ableToParse = false;
      let fileContents = {};
      try {
        parseJsonFile(`${fullPath}/${file}`);
        ableToParse = true;
      }
      catch (ex) {
        console.log('failed to parse json: ', file)
      }

      fileList.push({
        "fileName": file,
        "lastModified": formattedTime,
        "fileSize": fileSize,
        "validJson": ableToParse,            
      })
    });
    console.log(fileList);
    return fileList;
  });

  // opens file explorer
  // example: https://github.com/electron/electron/issues/36765
  ipcMain.handle('showItemInFolder', (event, name) => {    
    if (name.includes('asset')) {
      openFolder(ASSET_CONFIGS_PATH); 
    }
    else {
      openFolder(CONFIGURATIONS_PATH); 
    }
  });
})

