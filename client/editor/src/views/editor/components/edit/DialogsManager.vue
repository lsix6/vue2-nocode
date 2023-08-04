<template>
    <div>
        <div v-for="(dlg, i) in dialogs" :key="i" ref="dlgs">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogs: [],
        }
    },
    methods: {
        open(...args) {
            this.dialogs.push({})
            this.$nextTick(() => {
                console.log('[Dialogs] open', args, this.$refs.dlgs)
                //
                const dlgs = this.$refs.dlgs
                if (dlgs.length > 0) {
                    const dlg = dlgs[dlgs.length - 1].firstChild.__vue__
                    console.log('[Dialogs] open, dlg', dlg)
                    //
                    const onDlgClose = () => {
                        this.dialogs.pop()
                        dlg.$off('close', onDlgClose)
                        //
                        this.$nextTick(() => {
                            console.log('[Dialogs] onDlgClose, dlg', this.$refs.dlgs)
                        })
                    }
                    dlg.$on('close', onDlgClose)
                    dlg.open(...args)
                }
            })
        }
    },
}
</script>