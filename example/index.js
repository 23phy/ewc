const {app, BrowserWindow, ipcMain } = require('electron');
const ElectronAcrylic = require('../build/Release/ElectronAcrylic.node')

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 800,
        frame: false,
        transparent: true
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.openDevTools({ detach: true });
    console.log(mainWindow.getNativeWindowHandle());
    const buffer = mainWindow.getNativeWindowHandle();


    console.log(buffer, buffer.length)

    ElectronAcrylic.SetAcrylic(mainWindow.getNativeWindowHandle(), 0x909090, true);
});

ipcMain.on('closeApp', (event, args) => {
    app.quit();
    event.sender.send('closeAppReply', args);
})
