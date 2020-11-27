const {app, BrowserWindow, ipcMain } = require('electron');
const ewc = require(`${__dirname}../../../`);

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 800,
        backgroundColor: '#00000000',
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools({mode: 'detach'})
    ewc.setAcrylic(mainWindow, 0x14800020);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
});
ipcMain.on('closeApp', (_) => {
    app.quit();
})
ipcMain.on('acrylic', (_) => {
    ewc.setAcrylic(mainWindow, 0x14800020);
});
ipcMain.on('blurBehind', (_) => {
    ewc.setBlurBehind(mainWindow, 0x14800020);
});
ipcMain.on('gradient', (_) => {
    ewc.setGradient(mainWindow, 0x14800020);
});
ipcMain.on('trGradient', (_) => {
    ewc.setTransparentGradient(mainWindow, 0x14800020);
});
ipcMain.on('disable', (_) => {
    ewc.disable(mainWindow, 0x14800020);
});
