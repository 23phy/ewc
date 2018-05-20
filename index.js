const electronAcrylic = require('bindings')('ElectronAcrylic');

module.exports = electronAcrylic;

function SetAcrylic(window, tint) {
    return electronAcrylic.SetAcrylic(window.getNativeWindowHandle(), tint, true)
}

function RemoveAcrylic(window) {
    return electronAcrylic.SetAcrylic(window.getNativeWindowHandle(), 0xFFFFFF, false);
}

module.exports = {
    setAcrylic: (window, tint) => {
        return SetAcrylic(window, tint);   
    },
    removeAcrylic: (window) => RemoveAcrylic(window)
}