<template>
  <header id="titlebar">
    <div id="drag-region">
      <div id="window-title">
        <span>Electron quick start</span>
      </div>
      <div id="window-controls">
        <WindowButton text="&#xE921;" id="minimize" action="windowMinimize"/>
        <WindowButton v-if="!this.$store.state.windowMaximized" text="&#xE922;" id="maximize" action="windowMaximize"/>
        <WindowButton v-else text="&#xE923;" id="restore" action="windowRestore"/>
        <WindowButton text="&#xE8BB;" id="close" action="windowClose"/>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import WindowButton from "./WindowButton.vue";
import { ipcRenderer } from "electron";

export default Vue.extend({
  name: "TitleBar",
  components: {
    WindowButton
  },
  mounted() {
    ipcRenderer.on('EV::windowMaximized', () => {
      this.$store.commit('changeWindowMaximized', true);
    });
    ipcRenderer.on('EV::windowUnmaximized', () => {
      this.$store.commit('changeWindowMaximized', false);
    });
  }
});
</script>

<style scoped>
#titlebar {
  display: block;
  position: fixed;
  height: 30px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  background: rgba(80, 0, 20, .8);
  color: #FFF;
  padding: 4px;
}
#titlebar #drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  display: grid;
  grid-template-columns: auto 138px;
}
#window-title {
  grid-column: 1;
  display: flex;
  align-items: center;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  margin-left: 8px;
  overflow-x: hidden;
}
#window-title span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  line-height: 1.5;
}
#window-controls {
  display: grid;
  grid-template-columns: repeat(3, 46px);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  font-family: "Segoe MDL2 Assets";
  font-size: 10px;
  -webkit-app-region: no-drag;
}

#minimize           { grid-column: 1; }
#maximize, #restore { grid-column: 2; }
#close              { grid-column: 3; }

#minimize:hover, #maximize:hover, #restore:hover, #close:hover {
  background: rgba(255,255,255,0.2);
  opacity: 1;
}
#close:hover { background: #E81123; }
</style>
