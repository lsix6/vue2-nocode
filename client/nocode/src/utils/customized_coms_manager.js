const C_COMS_LIST = 'coms_list'

const getComSaveName = (comId) => {
    return 'com_' + comId
}

export class CustomizedComsManager {

    loadComsList() {
        let comsList = []
        const s = localStorage.getItem(C_COMS_LIST)
        if (s) {
            comsList = JSON.parse(s)
        }
        console.log('[customized_coms_manager] loadComsList', comsList)
        //
        return comsList
    }

    saveComsList(comsList) {
        console.log('[customized_coms_manager] saveComsList', comsList)
        if (comsList) {
            localStorage.setItem(C_COMS_LIST, JSON.stringify(comsList))
        }
    }

    getComIdByName(comName) {
        let comId = null
        //
        const coms = this.loadComsList()
        for (let i = 0; i < coms.length; i++) {
            if (coms[i].name === comName) {
                comId = coms[i].id
                break
            }
        }
        if (!comId) {
            console.error('[customized_coms_manager] getComIdByName, not found com: ', comName)
        }
        //
        return comId
    }

    loadComData(comId) {
        let comData = null
        //
        const s = localStorage.getItem(getComSaveName(comId))
        if (s) {
            comData = JSON.parse(s)
        }
        //
        console.log('loadComData', comId, comData)
        return comData
    }

    saveComData(comId, comData) {
        console.log('saveComData', comId, comData)
        if (comId && comData) {
            localStorage.setItem(getComSaveName(comId), JSON.stringify(comData))
        }
    }

    removeComData(comId) {
        console.log('removeComData', comId)
        if (comId) {
            localStorage.removeItem(getComSaveName(comId))
        }
    }

    schemaItem2ComObj(editorItem) {
        let comObj = {
            com_name: editorItem.comName,
            ...editorItem.componentValue.baseValue,
            com_info: {
                ...editorItem.componentValue.com_info,
            },
            com_props: {
                ...editorItem.componentValue.com_props,
            },
            com_events: [
                ...(editorItem.componentValue.com_events || []),
            ],
        }
        //
        console.log('[customized_coms_manager] schemaItem2ComObj', comObj)
        return comObj
    }

    schemaItem2ComObjWithChildren(item) {
        const obj = this.schemaItem2ComObj(item)
        if (item.childList.length > 0) {
            const com_children = item.childList.map(child => {
                return this.schemaItem2ComObjWithChildren(child)
            })
            obj.com_children = com_children
        }
        //
        return obj
    }

    loadComObjs(comId) {
        const objs = []
        //
        const schemaData = this.loadComData(comId)
        if (schemaData) {
            schemaData.componentList.forEach(item => {
                const comObj = this.schemaItem2ComObjWithChildren(item)
                objs.push(comObj)
            })
        }
        //
        return objs
    }

}