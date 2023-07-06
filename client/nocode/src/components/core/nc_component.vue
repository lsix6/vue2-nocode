
<script>
import { execute_commands } from '../../commands/nc_commands'
import { getPropValue, parseValue, setPropValue } from '../../utils/nc_utils'

export default {
    install(Vue) {
        Vue.component('nc_component', this)
    },
    name: 'nc_component',
    props: {
        com_root: {
            type: Object,
            default: null
        },
        com_text: {
            type: String,
            default: null
        },
        com_name: {
            type: String,
            default: ''
        },
        com_info: {
            type: Object,
            default: () => { }
        },
        com_props: {
            type: Object,
            default: () => { }
        },
        com_ref: {
            type: String,
            default: null
        },
        com_field: {
            type: Object,
            default: null
        },
        com_syncs: {
            type: Array,
            default: null
        },
        com_events: {
            type: Array,
            default: null
        },
        com_slots: {
            type: Object,
            default: null
        },
        com_binds: {
            type: Array,
            default: null
        },
        com_if: {
            type: Object,
            default: null
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    computed: {
        binds() {
            if (this.com_binds) {
                let m = {}
                this.com_binds.forEach(bind => {
                    const fieldValue = getPropValue(this.com_data, bind.field_name)
                    if (!(bind.field_value === null || bind.field_value === undefined)) {
                        m[bind.prop_name] = (fieldValue === bind.field_value)
                    } else {
                        m[bind.prop_name] = fieldValue
                    }
                })
                return m
            }
            return null
        },
        syncs() {
            if (this.com_syncs) {
                let m = {}
                this.com_syncs.forEach(sync => {
                    const fieldValue = getPropValue(this.com_data, sync.field_name)
                    if (!(sync.field_value === null || sync.field_value === undefined)) {
                        m[sync.prop_name] = (fieldValue === sync.field_value)
                    } else {
                        m[sync.prop_name] = fieldValue
                    }
                })
                return m
            }
            return null
        },
        fields() {
            if (this.com_field) {
                let m = {}
                // console.log('[nc_component] fields, ', this.com_data, this.com_field.field_name)
                const fieldValue = getPropValue(this.com_data, this.com_field.field_name)
                if (this.com_field.prop_name) {
                    m[this.com_field.prop_name] = fieldValue
                } else {
                    m.value = fieldValue
                }
                return m
            }
            return null
        },
        finalBinds() {
            const ret = {
                ...this.com_props,
                ...this.fields,
                ...this.binds,
                ...this.syncs,
                com_ref: this.com_ref,
            }
            // console.log('[nc_component] finalBinds: ', this.com_name, ret)
            return ret
        },
        shouldShow() {
            // console.log('[nc_component] shouldShow', this.com_name, this.com_data, this.com_if)
            // const ret = (!this.com_if || (this.com_data[this.com_if.field_name] === this.com_if.field_value))
            let ret = true
            if (this.com_if) {
                const a = getPropValue(this.com_data, this.com_if.field_name)
                const b = this.com_if.field_value
                const s = this.com_if.compare_symbol || '='
                if (s === '=') {
                    ret = (a === b)
                } else if (s === '!=') {
                    ret = (a !== b)
                } else if (s === '>') {
                    ret = (a > b)
                } else if (s === '>=') {
                    ret = (a >= b)
                } else if (s === '<') {
                    ret = (a < b)
                } else if (s === '<=') {
                    ret = (a <= b)
                }
            }
            return ret
        },
    },
    render: function (createElement, hack) {
        console.log('[nc_component] render', this.com_name, this)
        // 子组件
        const createChildNode = (child, i, props) => {
            // 创建一个子组件
            const node = createElement(
                'nc_component',
                {
                    props: {
                        com_root: this.com_root,
                        // 子组件的数据
                        ...child,
                        // 把 'com_data' 传入子组件
                        com_data: props.com_data,
                    },
                    // 子组件所在的插槽
                    slot: child.com_slot,
                    // 子组件的 key
                    key: '' + i,
                },
                null
                ,
                true,
            )
            //
            return node
        }
        //
        let childrenNodes = []
        if (this.com_text) {
            // 如果有 'com_text'，则添加一个字符串子节点
            childrenNodes.push(this.com_text)
        }
        //
        let scopedSlots = this.$scopedSlots
        //
        if (this.com_slots) {
            if (window.Vue.component(this.com_name)) {
                // vue 组件
                console.log('[nc_component] vue com')
                const slots = this.com_slots
                // 不同的插槽创建对应的函数
                scopedSlots = {}
                for (let slot in slots) {
                    const arr = slots[slot]
                    //
                    scopedSlots[slot] = (props) => {
                        // console.log('[nc_component] scopedSlots', slot, props)
                        //
                        if (this.$scopedSlots[slot]) {
                            const ret = this.$scopedSlots[slot](props)
                            // console.log('[nc_component] scopedSlots, call', slot, ret)
                            return ret
                        }
                        // 在对应的插槽下创建子节点，并传入父节点传下来的参数
                        const children = arr.map((child, i) => {
                            return createChildNode(child, i, props)
                        })
                        // console.log('[nc_component] scopedSlots, children', slot, children)
                        return children
                    }
                }
            } else {
                // 非 vue 组件
                console.log('[nc_component] h5 tag')
                if (this.com_slots.default) {
                    this.com_slots.default.map((child, i) => {
                        childrenNodes.push(createChildNode(child, i, this.$props))
                    })
                }
            }
        }
        // 组件数据
        const comData = {
            ...this.com_info,
            props: {
                com_root: this.com_root,
                ...this.finalBinds,
                com_props: this.com_props,
                com_data: this.com_data,
            },
            scopedSlots,
            ref: 'com',
        }
        console.log('[nc_component] comData', comData, childrenNodes)
        // 创建组件对象
        const vnode = createElement(
            this.com_name,
            comData,
            childrenNodes,
        )
        console.log('[nc_component] vnode', vnode)
        return vnode
    },
    beforeUpdate() {
        // console.log('[nc_component] beforeUpdate', this.com_name, this.com_data)
    },
    created() {
        // console.log('[nc_component] created', this.com_name, this.com_ref, this.$refs.com)
    },
    mounted() {
        // console.log('[nc_component] mounted, com_root', this.com_name, this.com_root)
        // console.log('[nc_component] mounted', this.com_name, this.com_ref, this.$refs.com)
        if (this.$refs.com) {
            this.inMounted()
        } else {
            // 懒加载的组件在 'mounted' 时, this.$refs.com 可能还为空，
            // 加个 timer 等 this.$refs.com 不为空时再执行初始化
            const timerid = setInterval(() => {
                // console.log('[nc_component] mounted setInterval', this.$refs.com)
                //
                if (this.$refs.com) {
                    clearInterval(timerid)
                    //
                    this.inMounted()
                }
            }, 50);
        }
    },
    beforeDestroy() {
        // console.log('[nc_component] beforeDestroy', this.com_name, this.com_ref, this.$refs.com)
        this.inBeforeDestroy()
    },
    methods: {
        getComRef() {
            return this.$refs.com
        },
        inMounted() {
            const comRef = this.$refs.com
            //
            if (this.com_ref) {
                // console.log('[nc_component] register_com_ref', this.com_ref, this.com_root)
                this.com_root.refsMgr.register_com_ref(this.com_ref, comRef)
            }
            // 注册组件里定义的事件
            let eventsMap = {}
            if (this.com_events && comRef) {
                this.com_events.forEach(event => {
                    const event_name = event.event_name
                    eventsMap[event_name] = (e) => {
                        // console.log('[nc_component] event func', this, event, e)
                        execute_commands(this, event.commands, e)
                    }
                    //
                    if (comRef.$on) {
                        comRef.$on(event_name, eventsMap[event_name])
                    } else {
                        comRef.addEventListener(event_name, eventsMap[event_name])
                    }
                    // console.log('[nc_component] $on', event_name, event, this)
                })
            }
            if (this.com_field && comRef) {
                const event_name = 'input'
                const onInput = (value) => {
                    // console.log('[nc_component] onInput, value: ', value, this)
                    if (this.com_field) {
                        let v = parseValue(this.com_field.field_type, value)
                        setPropValue(this.com_data, this.com_field.field_name, v, this)
                    }
                }
                //
                if (comRef.$on) {
                    eventsMap[event_name] = onInput
                    comRef.$on(event_name, eventsMap[event_name])
                    // console.log('[nc_component] $on', event_name, this)
                } else {
                    eventsMap[event_name] = () => { onInput(comRef.value) }
                    comRef.addEventListener(event_name, eventsMap[event_name])
                    // console.log('[nc_component] addEventListener', event_name, this)
                }
            }
            if (this.com_syncs && comRef) {
                this.com_syncs.forEach(sync => {
                    const event_name = 'update:' + sync.prop_name
                    eventsMap[event_name] = (value) => {
                        console.log('[nc_component] onSync, value: ', value, this)
                        let v = parseValue(sync.field_type, value)
                        setPropValue(this.com_data, sync.field_name, v, this)
                    }
                    //
                    if (comRef.$on) {
                        comRef.$on(event_name, eventsMap[event_name])
                    }
                    // console.log('[nc_component] $on', event_name, this)
                })
            }
            this.eventsMap = eventsMap
            // console.log('[nc_component] mounted', this.com_name, this.eventsMap)
        },
        inBeforeDestroy() {
            const comRef = this.$refs.com
            //
            if (this.com_ref) {
                this.com_root.refsMgr.unregister_com_ref(this.com_ref)
            }
            // 注销组件里定义的事件
            // console.log('[nc_component] beforeDestroy', this.com_name, this.eventsMap)
            const eventsMap = this.eventsMap
            if (eventsMap && comRef) {
                for (let event_name in eventsMap) {
                    if (comRef.$on) {
                        comRef.$off(event_name, eventsMap[event_name])
                        // console.log('[nc_component] $off', event_name)
                    } else {
                        comRef.removeEventListener(event_name, eventsMap[event_name])
                        // console.log('[nc_component] removeEventListener', event_name, this)
                    }
                }
            }
        }
    },

}
</script>
