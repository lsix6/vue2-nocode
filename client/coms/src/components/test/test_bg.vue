<template>
    <div class="test-bg">
        <img class="img" src="../../assets/img/bg.jpg" />
        <div class="img img2" />
        <div>
            <el-switch v-model="imgOn" />
            <div>
                <img class="img" :src="img3" />
            </div>
        </div>
        <img class="img" :src="baseUrl + 'static/img/test.png'" />
    </div>
</template>

<script>

console.log('process.env: ', process.env)

const bg1 = require('../../assets/img/bgLeft.png')
import bg2 from '../../assets/img/loginLogo.png'

export default {

    data() {
        return {
            imgOn: true,
        }
    },
    computed: {
        baseUrl() {
            return process.env.BASE_URL
        },
        img3() {
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