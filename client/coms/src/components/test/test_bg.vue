<template>
    <div class="test-bg">
        <img class="img" src="../../assets/img/bg.jpg" />
        <div class="img img2" />
        <div>
            <el-switch v-model="imgOn" />
            <img class="img" :src="img3" />
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            imgOn: false,
        }
    },
    computed: {
        img3() {
            const bg1 = require('../../assets/img/bg.jpg')
            const bg2 = require('../../assets/img/bgLeft.png')
            const img = (this.imgOn ? bg1 : bg2)
            return img
        },
    },
}
</script>

<style lang="scss" scoped>
.test-bg {
    .img {
        width: 200px;
        height: 200px;
    }

    .img2 {
        background-image: url('../../assets/img/bg.jpg');
        background-size: contain;
    }
}
</style>