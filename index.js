"use strict";

const ewc = require('bindings')('ewc');

module.exports = {
	disable: (window) => {
		return ewc.setComposition(window.getNativeWindowHandle(), 0, 0xFFFFFFFF);
	},
	setGradient: (window, tint) => {
		return ewc.setComposition(window.getNativeWindowHandle(), 1, tint);
	},
	setTransparentGradient: (window, tint) => {
		return ewc.setComposition(window.getNativeWindowHandle(), 2, tint);
	},
	setBlurBehind: (window, tint) => {
		return ewc.setComposition(window.getNativeWindowHandle(), 3, tint);
	},
    setAcrylic: (window, tint) => {
        return ewc.setComposition(window.getNativeWindowHandle(), 4, tint);   
    }
}