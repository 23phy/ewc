<template>
  <div class="button" id="min-button" @click="store.dispatch(action)">
    <span ref="text"></span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from 'vuex';
import store from '@/store';

export default Vue.extend({
  name: "WindowButton",
  data() {
    return {
      store: store,
    }
  },
  props: {
    text: { required: true },
    action: { required: true },
  },
  mounted() {
    //@ts-ignore
    this.$refs.text.innerHTML = this.text;
  },
});
</script>

<style scoped>
.button {
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  user-select: none;
  cursor: default;
  opacity: 0.8;
}
</style>
