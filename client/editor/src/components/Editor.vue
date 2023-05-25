<template>
    <div class="content" id="gjs">
        <h1>Hello World Component!</h1>
    </div>
</template>

<script>

import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'

export default {
    data() {
        return {
        }
    },
    mounted() {
        this.initGrapesjs()
    },
    methods: {
        initGrapesjs() {
            grapesjs.init({
                container: '#gjs',
                fromElement: true,
                height: 'auto',
                width: 'auto',
                storageManager: false,
                panels: {
                    defaults: []
                },
            })
        },
    },
}
</script>

<style lang="scss">
/* Let's highlight canvas boundaries */
#gjs {
    /* border: 3px solid #444; */
    flex: 1;
}

/* Reset some default styling */
.gjs-cv-canvas {
    top: 0;
    width: 100%;
    height: 100%;
}
</style>