const { ipcRenderer } = require('electron');

let closeButton = document.querySelector('.button').addEventListener('click', (event) => {
    ipcRenderer.send('closeApp', event)
});

ipcRenderer.on('closeAppReply', (event, args) => {
    console.log(args);
})