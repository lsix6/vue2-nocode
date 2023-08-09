<template>
    <div :class="$style.box">
        <el-button @click="$emit('preview')">
            预览
        </el-button>
        <el-collapse style="margin-top: 20px;">
            <div v-for="(group, index) in configTools" :key="index" :class="$style.group">
                <template v-if="!group.hidden">
                    <el-collapse-item :title="`${group.groupName}(${group.componentList.length})`">
                        <draggable v-model="group.componentList" :class="$style.groupList" :sort="false"
                            :filter="`.${$style.disabled}`" :group="{ name: dragGroup, pull: 'clone', put: false }"
                            :clone="cloneDog" @filter="$emit('onFilter')" @start="$emit('onDragStart')"
                            @end="$emit('onDragEnd')">
                            <div v-for="(item, cIndex) in group.componentList" :key="cIndex" :class="{
                                [$style.listItem]: true,
                                draggableToolItem: true,
                            }">
                                <span>{{ item.title }}</span>
                            </div>
                        </draggable>
                    </el-collapse-item>
                </template>
            </div>
        </el-collapse>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import _ from 'lodash'

import { generateEditorItem } from './common/editorData';

export default {
    name: 'EditorToolBar',
    components: {
        Draggable,
    },
    props: {
        configTools: {
            type: Array,
            default: () => []
        },
        dragGroup: {
            default: '',
            type: String
        }
    },
    methods: {
        // clone 当前模块
        cloneDog(toolItem) {
            // console.log('[EditorToolBar] cloneDog, toolItem: ', toolItem)
            if (toolItem.isPreDefinedField) {
                let retItem = null
                const comData = window.nocode.customizedComsManager.loadComData(toolItem.comId)
                // console.log('[EditorToolBar] cloneDog, comData: ', comData)
                if (comData.componentList.length > 0) {
                    retItem = _.cloneDeep(comData.componentList[0])
                }
                //
                return retItem
            }
            //
            return generateEditorItem(toolItem);
        }
    }
};
</script>

<style module>
@import '../../assets/css/variable.css';

.box {
    padding: 10px;
}

.group {
    margin-top: 20px;

    &:first-child {
        margin-top: 0;
    }
}

.groupName {
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
}

.groupList {
    margin-top: -10px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    justify-content: space-between;
}

.listItem {
    position: relative;
    margin-top: 10px;
    width: 47%;
    max-width: 120px;
    /* 避免拖动ghost样式异常 */
    height: 36px;
    line-height: 36px;
    cursor: move;
    flex-shrink: 0;
    transition: box-shadow 0.3s ease;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color-selected);
    border: 1px dashed transparent;
    font-size: 12px;

    &>span {
        display: block;
        width: 100%;
        padding: 0 3px;
        @mixin nowrap;
    }

    &:hover {
        color: var(--color-primary);
        border: 1px dashed var(--color-primary);
        box-shadow: 0 0 4px 1px color(var(--color-primary) a(0.8));
    }
}

.line {
    font-size: 12px;
    line-height: 18px;
}

.lineIcon {
    color: var(--color-text-third);
    font-size: 14px;
}

.disabled {
    cursor: no-drop;
    opacity: 0.8;
}
</style>
