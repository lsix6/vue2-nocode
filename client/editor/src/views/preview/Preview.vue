<template>
    <div id="preview">
        <nc_root v-if="comObjs" :coms_list="comObjs" />
    </div>
</template>
  
<script>

const custComsMgr = window.nocode.customizedComsManager

export default {
    name: 'Preview',
    data() {
        return {
            comObjs: null,
        }
    },
    created() {
        this.init()
        window.addEventListener('message', ev => {
            if (ev.source === window.opener) {
                console.log('[Preview] message, ev: ', ev)
                const cmd = JSON.parse(ev.data)
                console.log('[Preview] message, cmd: ', cmd)
                //
                if (cmd.name === 'update') {
                    if (cmd.data.com_id === custComsMgr.getMainComId()) {
                        this.init()
                    }
                }
            }
        })
    },
    methods: {
        init() {
            const mainComId = custComsMgr.getMainComId()
            if (mainComId) {
                this.comObjs = custComsMgr.loadComObjs(mainComId)
            }
        },
    },
}
</script>
  
<style>
#preview {
    background-color: #fff;
    flex: 1;
    display: flex;
    overflow: hidden;

}
</style>
  