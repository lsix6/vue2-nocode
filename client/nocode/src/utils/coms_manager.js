import _ from 'lodash'

export class ComsManager {
    Vue = null
    coms = {}

    constructor(vue) {
        this.Vue = vue
    }

    register(groupName, comName, component, schema) {
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
