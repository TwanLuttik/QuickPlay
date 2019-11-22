'use strict'

const path = require('path');

import { app, protocol, BrowserWindow, globalShortcut  } from 'electron'
// app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow () {
  
  // Create the browser window.
  // disabled webSecurity will enabled to access 
  win = new BrowserWindow({ 
    webPreferences: { webSecurity: false, AutoplayIgnoreWebAudio: false }, 
    width: 1500, 
    height: 1000,
    frame: false
    // icon: path.join(__dirname, './assets/icons/png/256x256.ico')
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')

  }

  win.on('closed', () => {
    // globalShortcut.unregister('MediaPlayPause')
    // globalShortcut.unregisterAll();
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // globalShortcut.unregister('MediaPlayPause')
    // globalShortcut.unregisterAll();
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    globalShortcut.register('MediaPlayPause', () => {
      console.log('MediaPlayPause')
    })
    
    try {
      // console.log(globalShortcut.isRegistered('CommandOrControl+X'))
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
