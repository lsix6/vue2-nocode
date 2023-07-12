<template>
    <div id="app">
        <el-aside width="160px" style="display: flex; border: 1px solid #eee; background-color: rgb(238, 241, 246)">
            <el-menu :router="true" style="flex: 1; display: flex; flex-direction: column;">
                <el-menu-item v-for="(menu, i) in menus" :key="i" :index="'/preview/' + menu.index"
                    style="margin: 10px; text-align: center; background-color: aliceblue;">
                    {{ menu.label }}
                </el-menu-item>
            </el-menu>
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

const custComsMgr = window.nocode.customizedComsManager

export default {
    name: 'Preview',
    data() {
        return {
            menus: [],
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const pagesManager = window.nocode.pagesManager
            //
            pagesManager.set_base_path('/preview/')
            //
            const coms = custComsMgr.loadComsList()
            coms.forEach(com => {
                const comData = window.nocode.customizedComsManager.loadComData(com.id)
                const page = comData?.page
                if (page && page.path) {
                    const comObjs = window.nocode.customizedComsManager.loadComObjs(com.id)
                    const rootObj = {
                        com_name: 'div',
                        com_version: '1',
                        com_info: {
                            class: 'flex-container',
                        },
                        com_slots: {
                            default: comObjs,
                        },
                    }
                    pagesManager.register_page(page.path, rootObj)
                    //
                    if (page.menu && page.menu.label) {
                        this.menus.push({
                            index: page.path,
                            label: page.menu.label,
                        })
                    }
                }
            })
            //
        },
    },
}
</script>
  
<style>
#Preview {
    background-color: #fff;
    flex: 1;
    display: flex;
    overflow: hidden;

}
</style>
  