<template>
  <div id="app">
    <ComsEditor />
  </div>
</template>

<script>
import ComsEditor from './views/editor/ComsEditor.vue'

export default {
  name: 'App',
  components: {
    ComsEditor
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
