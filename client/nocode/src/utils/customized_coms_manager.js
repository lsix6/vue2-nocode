import _ from 'lodash'

const C_COMS_LIST = 'coms_list'
const C_COM_MAIN = 'com_main'

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
            const objsData = JSON.parse(s)
            comData = {
                page: objsData.page,
                componentList: this.comObjs2SchemaItems(objsData.componentList)
            }
        }
        //
        console.log('loadComData', comId, comData)
        return comData
    }

    saveComData(comId, comData) {
        console.log('saveComData', comId, comData)
        if (comId && comData) {
            const objsData = {
                page: comData.page,
                componentList: this.schemaItems2ComObjs(comData.componentList)
            }
            localStorage.setItem(getComSaveName(comId), JSON.stringify(objsData))
        }
    }

    removeComData(comId) {
        console.log('removeComData', comId)
        if (comId) {
            localStorage.removeItem(getComSaveName(comId))
        }
    }

    schemaItem2ComObj(editorItem) {
        const comObj = _.cloneDeep(editorItem.componentValue)
        //
        // console.log('[customized_coms_manager] schemaItem2ComObj', comObj)
        return comObj
    }

    schemaItem2ComObjWithChildren(item) {
        const obj = this.schemaItem2ComObj(item)
        if (item.slots) {
            const com_slots = {}
            for (let slot in item.slots) {
                com_slots[slot] = []
                //
                item.slots[slot].forEach(child => {
                    com_slots[slot].push(this.schemaItem2ComObjWithChildren(child))
                })
            }
            obj.com_slots = com_slots
        }
        //
        return obj
    }

    schemaItems2ComObjs(items) {
        const objs = []
        //
        if (items) {
            items.forEach(item => {
                const comObj = this.schemaItem2ComObjWithChildren(item)
                objs.push(comObj)
            })
        }
        // console.log('schemaItems2ComObjs', items, objs)
        //
        return objs
    }

    comObj2SchemaItemWithChildren(obj) {
        const { com_slots, ...componentValue } = obj
        //
        const ret = {
            componentValue
        }
        //
        if (com_slots) {
            const slots = {}
            Object.entries(com_slots).forEach(([slot, children]) => {
                slots[slot] = []
                children.forEach(child => {
                    slots[slot].push(this.comObj2SchemaItemWithChildren(child))
                })
            })
            ret.slots = slots
        }
        //
        return ret
    }

    comObjs2SchemaItems(objs) {
        const items = []
        //
        if (objs) {
            objs.forEach(obj => {
                const item = this.comObj2SchemaItemWithChildren(obj)
                items.push(item)
            })
        }
        console.log('comObjs2SchemaItems', objs, items)
        //
        return items
    }

    loadComObjs(comId) {
        const objs = []
        //
        const s = localStorage.getItem(getComSaveName(comId))
        if (s) {
            const objsData = JSON.parse(s)
            objs.push(...objsData.componentList)
        }
        console.log('loadComObjs', comId, objs)
        //
        return objs
    }

    saveMainComId(comId) {
        localStorage.setItem(C_COM_MAIN, comId)
    }

    getMainComId() {
        return localStorage.getItem(C_COM_MAIN)
    }

}