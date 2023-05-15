<template>
  <div id="app">
    <el-aside width="160px" style="border: 1px solid #eee; background-color: rgb(238, 241, 246)">

    </el-aside>
    <el-container>
      <el-header height="48px" style="border: 1px solid #eee; text-align: right; font-size: 12px">

      </el-header>
      <el-main style="display: flex;">
        <nc_view />
      </el-main>
    </el-container>
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

}
</style>
