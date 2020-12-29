import { app, BrowserWindow } from 'electron';


let mainWindow: Electron.BrowserWindow | null;


const createWindow = ( ) => {
  const MODE = "development";
  var path = require('path');
  mainWindow = new BrowserWindow({
    title: "Darkpad",
    height: 600,
    width: 800,
    frame: false,
    backgroundColor: "#000000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  if(MODE === "development"){
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools();
  }else{
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }
  

  mainWindow.setMenu(null);
  mainWindow.on("closed", () => {
    mainWindow = null;
  })
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if(process.platform !== "darwin"){
    app.quit();
  }
})

app.on("activate", () => {
  if(mainWindow === null){
    createWindow();
  }
})