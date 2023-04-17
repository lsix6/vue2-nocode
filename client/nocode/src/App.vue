<template>
  <div id="app">
    <nc_view />
  </div>
</template>

<script>

import nc_view from './components/nc_view.vue'

export default {
  name: 'App',
  components: {
    nc_view
  },
}
</script>

<style>
#app {
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
</style>
