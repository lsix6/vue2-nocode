/**
 * Created by Liu.Jun on 2020/3/31 11:30 上午.
 */

import { getDefaultFormState } from '@lljj/vue-json-schema-form';
import { genId } from '../../../utils/id';
import { isEmptyObject } from './utils';
import _ from 'lodash';
import { getCom } from '../config/tools';

// 生成一个新的editor item
export function generateEditorItem(toolItem) {
    console.log('generateEditorItem', toolItem);
    const currentComponentPack = getCom(toolItem.comName).componentPack;

    const ids = [currentComponentPack.viewSchema.type, genId()];
    const id = ids.filter(item => !!item).join('_');
    const comSchema = currentComponentPack.comSchema

    const ret = {
        componentValue: {
            com_name: toolItem.comName,
            ...!toolItem.componentValue || isEmptyObject(toolItem.componentValue) ? getDefaultFormState(
                currentComponentPack.propsSchema,
                {}, // 初始值为空
                currentComponentPack.propsSchema
            ) : toolItem.componentValue,
            property: (toolItem.componentValue && toolItem.componentValue.property) || id
        },
        id,
        ...(comSchema && comSchema.com_slots)
            ? { slots: _.cloneDeep(comSchema.com_slots) }
            : {}
    };
    delete ret.componentPack
    console.log('generateEditorItem, return', ret);
    return ret;
}

// formLabel格式化
export function formatFormLabelWidth(value) {
    return value ? `${value * 4}px` : undefined;
}

// 转回来
export function deFormatFormLabelWidth(value) {
    return parseFloat(value) / 4;
}
