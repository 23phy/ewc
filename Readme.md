## Stay tuned.

[image]: /images/acrylic.png "Acrylic Image"

Achieve this natively in Electron on Windows 10 version 1803 and up:
![Acrylic Background][image]

## API
### `setAcrylic(window, tint)` - Applies the acrylic background to the window.
### `removeAcrylic(window)` - Removes the acrylic background of the window.

## Example: 
```javascript
const { app, BrowserWindow } = require('electron');
const electronAcrylic = require('electron-acrylic');

const mousetrap = require('mousetrap');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 800,
        transparent: true,
        frame: false
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // registering shortcuts
    mousetrap.bind('ctrl+a', () => {
        electronAcrylic.setAcrylic(mainWindow, 0xFFFFFF);
    });
    mousetrap.bind('ctrl+d', () => {
        electronAcrylic.removeAcrylic(mainWindow);
    })
});
```
### Here you can use the shortcuts `Ctrl+A/D` to enable or disable the acrylic effect.

## Note
- `removeAcrylic(window)` has no effect right now, this is a WIP.