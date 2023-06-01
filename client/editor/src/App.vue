<template>
  <div id="app">
    <Editor />
  </div>
</template>

<script>
import Editor from './views/editor/Editor.vue'

export default {
  name: 'App',
  components: {
    Editor
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
