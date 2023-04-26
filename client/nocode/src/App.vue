<template>
  <div id="app">
    <nc_view />
  </div>
</template>

<script>

import nc_view from './components/core/nc_view.vue'

export default {
  name: 'App',
  components: {
    nc_view
  },
}
</script>

<style>
#app {
  background-color: #fff;
  flex: 1;
  display: flex;
  overflow: hidden;
  padding: 20px;
}
</style>
