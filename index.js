'use strict';

const ewc = require('bindings')('ewc');

const SWCA = (window, accent, tint) => {
	window = window.getNativeWindowHandle();
	if (!window instanceof Buffer) {
		throw new Error(`The 'window' argument is not a native window handler.`);
	}
	if(typeof tint != 'number') {
		throw new Errow(`The 'tint' argument is not a number.`);
	}
	return ewc.setComposition(window, accent, tint);
}

module.exports = {
	disable: (window) => {
		return SWCA(window, 0, 0x00000000);
	},
	setGradient: (window, tint) => {
		return SWCA(window, 1, tint);
	},
	setTransparentGradient: (window, tint) => {
		return SWCA(window, 2, tint);
	},
	setBlurBehind: (window, tint) => {
		return SWCA(window, 3, tint);
	},
    setAcrylic: (window, tint) => {
		return SWCA(window, 4, tint);
    }
}