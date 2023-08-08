<template>
    <div class="MenuNavigator">
        <el-aside width="160px" style="display: flex; border: 1px solid #eee; background-color: rgb(238, 241, 246)">
            <el-menu :router="true" style="flex: 1; display: flex; flex-direction: column;" :defaultActive="activeMenu">
                <el-menu-item v-for="(menu, i) in menus" :key="i" :index="menu.index"
                    style="margin: 10px; text-align: center; background-color: aliceblue;">
                    {{ menu.label }}
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header height="48px" style="border: 1px solid #eee; text-align: right; font-size: 12px">

            </el-header>
            <el-main style="display: flex;">
                <nc_view ref="ncView" />
            </el-main>
        </el-container>
    </div>
</template>
  
<script>

const custComsMgr = window.nocode.customizedComsManager

export default {
    name: 'MenuNavigator',
    props: {
        base_path: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            menus: [],
            activeMenu: '',
        }
    },
    created() {
        this.init()
        this.setActiveMenuByRoute()
        //
        window.addEventListener('message', ev => {
            if (ev.source === window.opener) {
                console.log('[MenuNavigator] message, ev: ', ev)
                const cmd = JSON.parse(ev.data)
                console.log('[MenuNavigator] message, cmd: ', cmd)
                //
                if (cmd.name === 'update') {
                    this.init()
                    //
                    const pageRoute = this.$refs.ncView.getPageRoute()
                    if (pageRoute) {
                        const comData = window.nocode.customizedComsManager.loadComData(cmd.data.com_id)
                        const pagePath = comData?.page?.path
                        if (pagePath && pageRoute.indexOf(pagePath) === 0) {
                            this.$refs.ncView.refresh()
                        }
                    }
                }
            }
        })
    },
    methods: {
        init() {
            this.menus = []
            //
            const pagesManager = window.nocode.pagesManager
            //
            let basePath = this.base_path
            if (!basePath.endsWith('/')) {
                basePath += '/'
            }
            pagesManager.set_base_path(basePath)
            //
            const coms = custComsMgr.loadComsList()
            coms.forEach(com => {
                const comData = window.nocode.customizedComsManager.loadComData(com.id)
                const page = comData?.page
                if (page && (page.type === 'module' || page.type === 'page') && page.path) {
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
                    const isModulePage = (page.type === 'module')
                    if (isModulePage) {
                        pagesManager.register_page(page.path + '/list', rootObj)
                        pagesManager.register_page(page.path + '/add', rootObj)
                        pagesManager.register_page(page.path + '/edit', rootObj)
                    } else {
                        pagesManager.register_page(page.path, rootObj)
                    }
                    //
                    if (page.menu && page.menu.label) {
                        this.menus.push({
                            path: page.path,
                            index: pagesManager.get_base_path() + page.path + (isModulePage ? '/list' : ''),
                            label: page.menu.label,
                        })
                    }
                }
            })
            //
        },
        setActiveMenuByRoute() {
            const subPath = this.$route.params[0]
            console.log('[MenuNavigator] setActiveMenuByRoute, subPath: ', subPath)
            //
            if (subPath) {
                for (let i = 0; i < this.menus.length; i++) {
                    const menu = this.menus[i]
                    if (subPath.indexOf(menu.path) === 0) {
                        this.activeMenu = menu.index
                        break
                    }
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.MenuNavigator {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: row;
}
</style>