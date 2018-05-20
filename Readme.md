[image]: /images/acrylic.png "Acrylic Image"
[windowBug]: /images/windowBug.png "Window Bug"

## Achieve this natively in Electron on Windows 10 version 1803 and up:
![Acrylic Background][image]

#
## How to use it
- Install it from npm
  `npm i electron-acrylic`
- Download this repo and follow these steps:
  - copy this repo in your `node_modules`
  - cd into the folder `electron-acrylic`
  - take note of your electron version `electron -v` and make sure it matches the one in `package.json` scripts
  - run `npm i` to install the dependencies
  - add it to your dependencies as `"electron-acrylic": "0.0.4"'`
  - follow the example below

## API
- `setAcrylic(window, tint)` - Applies the acrylic background to the window.
- `removeAcrylic(window)` - Removes the acrylic background of the window.

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
Here you can use the shortcuts `Ctrl+A/D` to enable or disable the acrylic effect.

## Notes
- `removeAcrylic(window)` has no effect right now, this is a WIP.

## Known Issues
I encourage you to look here before opening an issue.
- When hoverig over the `X` button in the example app, top right corner, sometimes half of the window, horizontally, gets the `:hover` effect. Don't know why.
- Sometimes this happens too
  ![Window Bug][windowBug]

These can be "fixed" by restarting the app.

## License
This project is licensed under MIT, for more info see [LICENSE](LICENSE).

## Misc
Sorry, I'm a n00b with all those commits and patches 😂