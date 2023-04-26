<template>
    <el-form ref="form" :model="formData" v-bind="form_props" @submit.native.prevent>
        <nc_children ref="children" :com_children="children" :com_params="{ formData, valid, changed, }">
        </nc_children>
    </el-form>
</template>

<script>

import _ from 'lodash'
import { nc_vars } from '../utils/nc_vars.js'
import { filterFields } from '../utils/nc_utils'

const request_api = window.nocode.request_api
const get_params = window.nocode.get_params
const get_com_ref = window.nocode.get_com_ref
const msg_box = window.nocode.msg_box

export default {
    install(Vue) {
        Vue.component('nc_form', this)
    },
    props: {
        com_ref: {
            type: String,
            default: null
        },
        form_props: {
            type: Object,
            default: null
        },
        form_children: {
            type: Array,
            default: () => []
        },
        init_data: {
            type: Object,
            default: () => null,
        },
        commit_data: {
            type: Object,
            default: null
        },
        com_params: {
            type: Object,
            default: null
        },
        mark_form_change: {
            type: Boolean,
            default: false,
        },
        unsave_warning: {
            type: Object,
            default: () => { },
        },
        check_valid_after_change: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            formData: {
            },
            preFormData: {
            },
            formFieldsError: {
            },
            originFormData: {
            },
            valid: false,
            changed: false,
            formDataInited: false,
        }
    },
    computed: {
        valid_and_changed() {
            return (this.valid && this.changed)
        },
        children() {
            let arr = []
            //
            this.form_children.forEach(item => {
                let child = item
                //
                if (child.com_props && child.com_props.form_item_props && child.com_props.form_item_props.prop) {
                    const error = this.formFieldsError[child.com_props.form_item_props.prop]
                    if (error) {
                        child = this.lodash_merge(
                            item,
                            {
                                com_props: {
                                    form_item_props: {
                                        error,
                                    },
                                }
                            }
                        )
                    }
                }
                //
                arr.push(child)
            })
            //
            return arr
        },
        fields() {
            let fields = {}
            let binds = {}
            this.form_children.forEach(child => {
                filterFields(child, fields, binds)
            })
            return fields
        },
    },
    watch: {
        formData: {
            handler() {
                if (this.formDataInited) {
                    const equal = _.isEqual(this.formData, this.preFormData)
                    // console.log('watch formData: ', _.cloneDeep(this.formData))
                    // console.log('watch preFormData: ', _.cloneDeep(this.preFormData))
                    // console.log('watch equal', equal)
                    if (equal) {
                        this.clearFormChanged()
                    } else {
                        this.setFormChanged()
                    }
                    //
                    this.$emit('change')
                }
            },
            deep: true,
        }
    },
    mounted() {
        this.initFormData().then(() => {
            this.$refs.form.clearValidate()
            //
            this.formDataInited = true
        })
    },
    methods: {
        getData() {
            return this.formData
        },
        getOriginData() {
            return this.originFormData
        },
        setData(formData) {
            return new Promise(resolve => {
                this.formData = formData
                this.originFormData = _.cloneDeep(formData)
                //
                this.clearFormChanged()
                //
                resolve()
            })
        },
        initDefaultData() {
            return new Promise(resolve => {
                let data = {}
                for (let k in this.fields) {
                    const field = this.fields[k]
                    if (!(field.field_default === null || field.field_default === undefined)) {
                        data[k] = field.field_default
                    }
                }
                const formData = { ...data }
                console.log('[nc_form] initDefaultData, formData', _.cloneDeep(formData))
                //
                this.setData(formData).then(() => {
                    resolve()
                })
            })
        },
        initFormData() {
            console.log('[nc_form] initFormData')
            //
            return new Promise(resolve => {
                if (this.init_data) {
                    this.formData = {
                        ...this.formData,
                        ...this.init_data,
                    }
                    //
                    resolve()
                } else {
                    // 没有拉取数据的配置，则设置缺省字段的值
                    this.initDefaultData().then(() => {
                        resolve()
                    })
                }
            })
        },
        commitData() {
            // 先清空字段的错误信息
            this.formFieldsError = {}
            //
            return new Promise((resolve, reject) => {
                if (this.commit_data && this.commit_data.api) {
                    // 有提交数据的参数
                    this.formValidate().then(valid => {
                        if (valid) {
                            // 校验通过
                            // 请求 api 提交数据
                            let data = this.formData
                            if (this.commit_data.commit_fields) {
                                // 如果有 commit_fields，则只提交 commit_fields 里指定的字段
                                // console.log('[nc_form] commit_fields', this.commit_data.commit_fields)
                                data = get_params(null,
                                    [{
                                        params_source: 'cmd_data',
                                        params_fields: this.commit_data.commit_fields,
                                    }],
                                    this.formData)
                            }
                            request_api(this.commit_data.api, { data }).then(data => {
                                this.clearFormChanged().then(() => {
                                    const options = (this.commit_data.success_message || '保存成功')
                                    msg_box.success({
                                        options,
                                    })
                                    resolve(data)
                                })
                            }).catch(err => {
                                // 根据后端返回的错误信息设置字段的错误信息（需要使用 this.$set，否则不会触发刷新）
                                console.log('[nc_form] commitData, request_api.catch err:', err)
                                if (err.fieldsError) {
                                    for (let k in err.fieldsError) {
                                        this.$set(this.formFieldsError, k, err.fieldsError[k])
                                    }
                                } else {
                                    // 没有字段相关的错误，则显示整体错误信息
                                    const options = (this.commit_data.error_message || err.msgText || '保存失败')
                                    msg_box.error({
                                        options,
                                    })
                                }
                                resolve(false)
                            })
                        } else {
                            // 校验失败
                            resolve(false)
                        }
                    })
                } else {
                    // 参数不足
                    reject(`[nc_form] not found 'commit_data' or 'commit_data.api'`)
                }
            })
        },
        checkValidAfterChange() {
            return new Promise(resolve => {
                if (this.check_valid_after_change) {
                    this.$nextTick(() => {
                        this.formValidate().then(valid => {
                            this.valid = valid
                            //
                            resolve()
                        })
                    })
                } else {
                    resolve()
                }
            })
        },
        setFormChanged() {
            this.checkValidAfterChange()
            this.changed = true
            // console.log('changed', this.changed)
            if (!this.mark_form_change) {
                return
            }
            nc_vars.formChanged.setChanged(this.com_ref)
        },
        clearFormChanged() {
            const ret = this.checkValidAfterChange()
            this.changed = false
            if (!this.mark_form_change) {
                return ret
            }
            nc_vars.formChanged.clearChanged(this.com_ref)
            this.preFormData = _.cloneDeep(this.formData)
            return ret
        },
        cancelFormChange(methodParams) {
            return new Promise(resolve => {
                if (nc_vars.formChanged.isChanged(this.com_ref)) {
                    // 表单修改过了
                    // 弹出确认框
                    let refDialog = null
                    if (methodParams.dialog_ref) {
                        refDialog = get_com_ref(methodParams.dialog_ref)
                        refDialog.hide(true)
                    }
                    function confirm_resovle(result) {
                        if (refDialog) {
                            refDialog.hide(false)
                        }
                        resolve(result)
                    }
                    this.$confirmDialog({
                        message: methodParams.message
                    }).then(() => {
                        // 清除修改标记
                        this.clearFormChanged().then(() => {
                            // 返回 true
                            confirm_resovle(true)
                        })
                    }).catch(() => {
                        // 返回 false
                        confirm_resovle(false)
                    })
                } else {
                    // 表单没有修改过
                    // 返回 true
                    resolve(true)
                }
            })
        },
        formValidate() {
            return new Promise(resolve => {
                this.$refs.form.validate(valid => {
                    resolve(valid)
                })
            })
        },
        lodash_merge(obj1, obj2) {
            let ret = _.cloneDeep(obj1)
            _.merge(ret, obj2)
            // console.log('lodash_merge', obj1, obj2, ret)
            return ret
        },
        commitDataIfChanged() {
            return new Promise(resolve => {
                const isChanged = !!nc_vars.formChanged.isChanged(this.com_ref)
                console.log('[nc_form] commitDataIfChanged, isChanged: ', isChanged)
                if (isChanged) {
                    this.commitData().then(() => {
                        setTimeout(() => {
                            resolve(true)
                        }, 200);
                    })
                } else {
                    resolve(true)
                }
            })
        },
    }
}
</script>