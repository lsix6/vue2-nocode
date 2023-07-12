import _ from 'lodash'

export class ComsManager {
    Vue = null
    coms = {}

    constructor(vue) {
        this.Vue = vue
    }

    register(component, schema) {
        const groupName = schema.viewSchema.group || 'default'
        const comName = schema.comSchema.com_name
        //
        if (component) {
            this.Vue.component(comName, component)
        }
        //
        this.coms[groupName] = (this.coms[groupName] || {})
        this.coms[groupName][comName] = schema
    }

    getComs() {
        return _.cloneDeep(this.coms)
    }
}
