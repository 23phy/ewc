const {app, BrowserWindow, ipcMain } = require('electron');
const electronAcrylic = require(__dirname + '../../')

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 800,
        transparent: true,
        frame: false,
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.webContents.openDevTools({mode: 'detach'})

    electronAcrylic.setAcrylic(mainWindow, 0xFFFFFF);
});

ipcMain.on('closeApp', (event, args) => {
    app.quit();
})
