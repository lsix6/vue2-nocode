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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
