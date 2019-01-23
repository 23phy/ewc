'use strict';
import Vue from "vue";
import Vuex from "vuex";
import { ipcRenderer } from 'electron';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowMaximized: false
  },
  mutations: {
    changeWindowMaximized(state, payload) {
      state.windowMaximized = payload;
    }
  },
  actions: {
    windowMinimize: () => ipcRenderer.send('EV::windowMinimize'),
    windowMaximize: () => ipcRenderer.send('EV::windowMaximize'),
    windowRestore: () => ipcRenderer.send('EV::windowRestore'),
    windowClose: () => ipcRenderer.send('EV::windowClose'),
  }
});
