const {app, BrowserWindow, ipcMain } = require('electron');
const ElectronAcrylic = require('../build/Release/ElectronAcrylic.node')

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 800,
        transparent: true,
        frame: false
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.openDevTools({ detach: true });
    console.log(mainWindow.getNativeWindowHandle());

    ElectronAcrylic.SetAcrylic(mainWindow.getNativeWindowHandle(), 0xFFFFFF, true);
});

ipcMain.on('closeApp', (event, args) => {
    app.quit();
    event.sender.send('closeAppReply', args);
})
