'use strict';

//@ts-ignore
import ewc from 'node-loader!../../../build/Release/ewc.node';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';
const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow: BrowserWindow;

protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow (width: number, height: number, show: boolean, frame: boolean) {
  mainWindow = new BrowserWindow({ height, width, show, frame, backgroundColor: '#00000000' });

  ewc.setComposition(mainWindow.getNativeWindowHandle(), 4, 0x14800020);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools({mode: 'detach'});
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html');
  }

  if(!show) {
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.show();
    });
  }

  mainWindow.on('closed', () => {
    //@ts-ignore
    mainWindow = null;
  });
  mainWindow.on('maximize', () => mainWindow.webContents.send('EV::windowMaximized'));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('EV::windowUnmaximized'));
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    await installVueDevtools();
  }
  createWindow(600, 450, false, false);
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

function saveAndQuit() {
  app.quit();
}

ipcMain.on('EV::windowClose', () => {
  console.log(`[_EV]:Closing the app.`);
  saveAndQuit();
});
ipcMain.on('EV::windowMinimize', () => {
  console.log(`[_EV]:Minimizing the app.`);
  if (mainWindow) {
    mainWindow.minimize();
  }
});
ipcMain.on('EV::windowMaximize', () => {
  console.log(`[_EV]:Maximizing the app.`);
  if (mainWindow && !mainWindow.isMaximized()) {
    //@ts-ignore
    mainWindow.maximize();
  }
  //@ts-ignore
});
ipcMain.on('EV::windowRestore', () => {
  console.log(`[_EV]:Restoring the app.`);
  if (mainWindow && mainWindow.isMaximized()) {
    mainWindow.restore();
  }
});