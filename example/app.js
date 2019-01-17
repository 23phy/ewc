const { ipcRenderer } = require('electron');

let type = document.getElementById('type');
let closeButton = document.querySelector('.button').addEventListener('click', (event) => {
    ipcRenderer.send('closeApp', event)
});
let acrylic = document.querySelector('#acrylic').addEventListener('click', (_) => {
    type.textContent = 'an acrylic';
    ipcRenderer.send('acrylic');
});
let blurBehind = document.querySelector('#blurBehind').addEventListener('click', (_) => {
    type.textContent = 'a blur behind'
    ipcRenderer.send('blurBehind');
});
let gradient = document.querySelector('#gradient').addEventListener('click', (_) => {
    type.textContent = 'a gradient';
    ipcRenderer.send('gradient');
});
let trGradient = document.querySelector('#trGradient').addEventListener('click', (_) => {
    type.textContent = 'a transparent gradient';
    ipcRenderer.send('trGradient');
});
let disable = document.querySelector('#disable').addEventListener('click', (_) => {
    type.textContent = 'a disabled';
    ipcRenderer.send('disable');
});