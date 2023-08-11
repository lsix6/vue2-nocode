<template>
    <div :class="[$style.container]">
        <div :class="{
            [$style.contentWrap]: true,
            [$style.closeToolbar]: closeToolbar
        }">
            <div :class="$style.toolBarWrap">
                <div :class="$style.toolsBar">
                    <EditorToolBar :drag-group="dragOptions.group" :config-tools="configTools"
                        @onFilter="$message.error('该组件添加数目已达上限！')" @preview="onPreview" @showJson="onShowJson">
                    </EditorToolBar>
                </div>
                <span :class="$style.leftCaret" @click="closeToolbar = !closeToolbar">
                    <i class="el-icon-caret-right"></i>
                </span>
            </div>

            <div :class="[$style.contentBox]">
                <nc_root :is_in_edit="true">
                    <template slot-scope="slotScope">
                        <NestedEditor :child-component-list="componentList" :drag-options="dragOptions"
                            :form-data="rootFormData" :form-props="formProps" :com_root="slotScope.com_root">
                        </NestedEditor>
                    </template>
                </nc_root>
                <div v-if="componentList.length === 0" :class="$style.tipBox">
                    <p>拖拽左侧栏的组件进行添加</p>
                </div>
            </div>
            <div :class="$style.rightForm">
                <el-tabs v-model="activeName">
                    <el-tab-pane v-if="curEditorItem" label="属性" name="compConfig">
                        <VueJsonFrom v-model="curEditorItem.componentValue" :class="$style.configForm"
                            :schema="getEditorItem(curEditorItem.componentValue.com_name).componentPack.propsSchema"
                            :form-props="{
                                labelPosition: 'right',
                                labelWidth: '110px',
                                size: 'small',
                            }" :form-footer="{
    show: false
}">
                        </VueJsonFrom>
                    </el-tab-pane>
                    <el-tab-pane label="组件配置" name="formConfig">
                        <VueJsonFrom v-model="formConfig" :class="$style.configForm" :schema="FormConfSchema" :form-props="{
                            labelPosition: 'right',
                            labelWidth: '110px',
                            size: 'small',
                        }" :form-footer="{
    show: false
}">
                        </VueJsonFrom>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <ComPreviewDlg ref="comPreviewDlg" />
        <ComJsonDlg ref="comJsonDlg" @change="onJsonChange" />
        <SelectFieldDlg ref="selectFieldDlg" />
        <SetDataSourceDlg ref="setDataSourceDlg" />
        <SelectParamsDlg ref="selectParamsDlg" />
        <DialogsManager ref="setCommandDlg">
            <SetCommandDlg />
        </DialogsManager>
    </div>
</template>

<script>
import VueJsonFrom from '@lljj/vue-json-schema-form';

import FormConfSchema from './viewComponents/FormConf';
import EditorToolBar from './EditorToolBar.vue';
import ComPreviewDlg from './ComPreviewDlg.vue'
import ComJsonDlg from './ComJsonDlg.vue'
import DialogsManager from './components/edit/DialogsManager.vue'
import SelectFieldDlg from './components/edit/SelectFieldDlg.vue'
import SetDataSourceDlg from './components/edit/SetDataSourceDlg.vue'
import SelectParamsDlg from './components/edit/SelectParamsDlg.vue'
import SetCommandDlg from './components/edit/SetCommands/SetCommandDlg.vue'

import { deepFreeze } from './common/utils';
import configTools, { getCom } from './config/tools';
import { formatFormLabelWidth } from './common/editorData';

import NestedEditor from './components/NestedEditor';
window.Vue.component('NestedEditor', NestedEditor)
import SelectRef from './components/edit/SelectRef.vue'
window.Vue.component('SelectRef', SelectRef)
import SelectRefCom from './components/edit/SelectRefCom.vue'
window.Vue.component('SelectRefCom', SelectRefCom)
import SelectField from './components/edit/SelectField.vue'
window.Vue.component('SelectField', SelectField)
import SetBinds from './components/edit/SetBinds.vue'
window.Vue.component('SetBinds', SetBinds)
import SetEnumMap from './components/edit/SetEnumMap.vue';
window.Vue.component('SetEnumMap', SetEnumMap)
import SetDataSource from './components/edit/SetDataSource.vue';
window.Vue.component('SetDataSource', SetDataSource)
import SetCommands from './components/edit/SetCommands/SetCommands.vue'
window.Vue.component('SetCommands', SetCommands)
import SetParams from './components/edit/SetParams.vue'
window.Vue.use(SetParams)
import SetParam from './components/edit/SetParam.vue'
window.Vue.use(SetParam)

deepFreeze(configTools);

export default {
    name: 'Editor',
    components: {
        VueJsonFrom,
        EditorToolBar,
        NestedEditor,
        ComPreviewDlg,
        ComJsonDlg,
        DialogsManager,
        SelectFieldDlg,
        SetDataSourceDlg,
        SelectParamsDlg,
        SetCommandDlg,
    },
    inject: [
        'notifyPreview',
    ],
    provide() {
        return {
            genFormProvide: {
                fallbackLabel: true
            },
            getCurEditorItem: () => this.curEditorItem,
            getCurEditorItemWrapper: () => this.curEditorItemWrapper,
            getEditorItem: (comName) => this.getEditorItem(comName),
            getEditorRefs: () => this.$refs,
        };
    },
    props: {
        com_id: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            closeToolbar: false,
            loading: false,
            configTools,
            rootFormData: {},
            curEditorItem: null, // 选中的formItem
            curEditorItemWrapper: null, // 选中的formItem的外壳对象
            componentList: [],
            FormConfSchema,
            formConfig: {},
            activeName: 'formConfig',
            preSaveData: '',
        };
    },
    watch: {
        componentList: {
            handler() {
                // console.log('watch componentList')
                //
                this.$nextTick(() => {
                    this.saveData()
                })
            },
            deep: true,
        },
        formConfig: {
            handler() {
                this.$nextTick(() => {
                    this.saveData()
                })
            },
            deep: true,
        }
    },
    computed: {
        formProps() {
            if (!this.formConfig.formProps) return {};
            return {
                ...this.formConfig.formProps,
                labelWidth: formatFormLabelWidth(this.formConfig.formProps.labelWidth)
            };
        },
        formFooter() {
            return this.formConfig.formFooter || {};
        },
        dragOptions() {
            return {
                animation: 300,
                group: 'listComponentsGroup',
                disabled: false,
                ghostClass: 'ghostItem',
                filter: this.$style.disabled,
                draggable: '.draggableItem',
                tag: 'div',
                swapThreshold: 0.3,
                // forceFallback: true
                // fallbackTolerance: 0
            };
        },
    },
    mounted() {
        console.log('configTools', this.configTools);
        window.document.body.classList.add('page-decorate-design');
        //
        this.loadData()
    },
    destroyed() {
        window.document.body.classList.remove('page-decorate-design');
    },
    created() {
        this.$on('onSetCurEditorItem', ({ editorItem, wrapper }) => {
            this.activeName = editorItem ? 'compConfig' : 'formConfig';
            this.curEditorItem = editorItem;
            this.curEditorItemWrapper = wrapper;
        });
    },
    methods: {
        getEditorItem(comName) {
            return getCom(comName)
        },
        saveData() {
            const saveData = {
                componentList: [
                    ...this.componentList
                ],
                page: {
                    ...this.formConfig
                },
            }
            const s = JSON.stringify(saveData)
            if (s !== this.preSaveData) {
                window.nocode.customizedComsManager.saveComData(this.com_id, saveData)
                //
                this.notifyPreview({
                    com_id: this.com_id,
                })
                //
                this.preSaveData = s
            }
        },
        loadData() {
            const saveData = window.nocode.customizedComsManager.loadComData(this.com_id)
            if (saveData) {
                this.componentList = [
                    ...saveData.componentList
                ]
                this.formConfig = {
                    ...saveData.page
                }
            }
            //
            this.preSaveData = JSON.stringify(saveData)
        },
        onPreview() {
            // console.log('[Editor] onPreview')
            //
            const config = this.formConfig
            if (((config.type === 'module' || config.type === 'page') && config.path)) {
                const url = location.origin + '/editor/preview/' + config.path + (config.type === 'module' ? '/list' : '')
                this.$emit('preview', url)
            } else if (this.com_id === window.nocode.customizedComsManager.getMainComId()) {
                // main com
                const url = location.origin + '/editor/preview'
                this.$emit('preview', url)
            } else {
                this.$refs.comPreviewDlg.open(this.com_id)
            }
        },
        onShowJson() {
            const savedData = window.nocode.customizedComsManager.loadComSavedData(this.com_id)
            this.$refs.comJsonDlg.open(savedData)
        },
        onJsonChange(v) {
            this.formConfig = v.page
            this.componentList = window.nocode.customizedComsManager.comObjs2SchemaItems(v.componentList)
        },
    }
};
</script>

<style>
body.page-decorate-design {
    overflow: hidden;
}

.flip-list-move {
    transition: transform 0.3s;
}

.no-move {
    transition: transform 0s;
}
</style>
<style module>
@import '../../assets/css/variable.css';

:root {
    --site-top-height: 80px;
    --tool-bar-width: 260px;
    --right-form-width: 380px;
    --drag-area-width: auto;
}

/*预览模式 同步样式重置*/
.container {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    transition: 0.2s ease;
}

.hasTools {
    padding-left: var(--tool-bar-width);

    :global .el-icon-caret-right {
        transform: rotate(180deg);
    }
}

/*tools*/
.toolBarWrap,
.rightForm {
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--color-white);
    box-shadow: 0 0 0 1px rgba(171 171 171, 0.3);
    z-index: 2;
}

.rightForm,
.toolsBar {
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}

.toolBarWrap {
    padding-top: 10px;
    width: var(--tool-bar-width);
    left: 0;
    overflow: visible;
}

.toolsBar {
    height: 100%;
}

.leftCaret {
    cursor: pointer;
    position: absolute;
    display: flex;
    width: 18px;
    height: 38px;
    align-items: center;
    justify-content: center;
    top: 2px;
    right: 0;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
    border-radius: 2px 0 0 2px;

    :global .el-icon-caret-right {
        transition: all .3s ease;
        transform: rotate(180deg);
    }

    &:hover {
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.4));
        opacity: 1;
    }
}

.rightForm {
    box-sizing: border-box;
    padding: 10px;
    right: 0;
    width: var(--right-form-width);
}

.configForm {
    padding: 0 20px;

    &>h3 {
        font-size: 15px;
        font-weight: bold;
    }
}

/*content area*/
.contentWrap {
    position: relative;
    overflow: auto;
    height: 100%;
    padding-left: var(--tool-bar-width);
    padding-right: var(--right-form-width);

    &::-webkit-scrollbar {
        width: 6px;
        height: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: var(--background-color-base);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--color-text-placeholder);
    }
}

.closeToolbar {
    padding-left: 0;

    .toolBarWrap {
        left: calc(0px - var(--tool-bar-width));

        .leftCaret {
            right: -18px;
        }

        :global {
            .el-icon-caret-right {
                transform: rotate(0);
            }
        }
    }
}

.contentBox {
    position: relative;
    padding: 0;
    height: 100%;
    display: flex;
}

.tipBox {
    pointer-events: none;
    top: 20px;
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 30vh 0;

    p {
        margin: 20px 0;
        font-size: 16px;
    }
}
</style>
