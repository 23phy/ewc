const { ipcRenderer } = require('electron');

let closeButton = document.querySelector('.button').addEventListener('click', (event) => {
    ipcRenderer.send('closeApp', event)
});

ipcRenderer.on('closeAppReply', (event, args) => {
    console.log(args);
})

let color = document.querySelector('x-colorselect');

color.addEventListener('change', (_) => {
	document.querySelector('.content').style.backgroundColor = color.value;
});