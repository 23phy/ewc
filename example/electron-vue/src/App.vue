<template>
  <div id="app">
    <TitleBar/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TitleBar from "./components/TitleBar.vue";

export default Vue.extend({
  name: "app",
  components: {
    TitleBar
  }
});
</script>

<style>
* {margin: 0; padding: 0; border: 0; vertical-align: baseline;}
html {box-sizing: border-box; background: transparent !important}
*, *:before, *:after {box-sizing: inherit;}
html, body {height: 100%;}
body {
  border: 1px solid #48545c;
  overflow-y: hidden;
}
#app {
  font-family: "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
