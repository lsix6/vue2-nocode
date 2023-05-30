<template>
    <el-button style="width: 100%; height: 50px;" @click="onClick">
        {{ text }} - {{ counter }}
    </el-button>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            text: 'AAA',
            counter: 0,
        }
    },
    methods: {
        onClick(e) {
            this.counter += 1
        },
    },
})
</script>
