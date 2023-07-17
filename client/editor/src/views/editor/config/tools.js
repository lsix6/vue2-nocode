/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

import genSchema from '../viewComponents/genSchema';

/**
 * hidden 隐藏，不显示在工具栏
 * maxNum Number 最大可配置数
 * topDisplay Bool 最顶部显示
 * bottomDisplay Bool 最底部显示
 * onlyCanConfig Bool 是否只能配置数据，不能删除 copy
 * @type {*[]}
 */
const tools = [];

const comsMap = {}

const html = {
    groupName: 'html',
    componentList: [],
}

const tags = ['div', 'span']
tags.forEach(tag => {
    const _com = {
        title: tag,
        btnClass: 'w100',
        groupName: html.groupName,
        comName: tag,
        componentPack: {
            viewSchema: {
                title: tag,
                type: 'object',
            },
            propsSchema: genSchema({}, 'object')
        },
    }
    //
    comsMap[tag] = _com
    html.componentList.push(_com)

});
tools.push(html)

const coms = window.nocode.comsManager.getComs()
console.log('coms', coms)
for (let groupName in coms) {
    const groupComs = coms[groupName]
    const group = {
        groupName,
        componentList: [],
    }
    for (let comName in groupComs) {
        const com = groupComs[comName]
        //
        const _com = {
            title: com.viewSchema.title,
            btnClass: 'w100',
            groupName,
            comName,
            componentPack: {
                ...com,
                propsSchema: genSchema(com.propsSchema, 'object')
            },
        }
        //
        comsMap[comName] = _com
        group.componentList.push(_com)
    }
    //
    tools.push(group)
}

export const getCom = (comName) => {
    return comsMap[comName]
}

const preDefinedFields = {
    groupName: '预定义字段',
    componentList: [],
}

const custComsMgr = window.nocode.customizedComsManager
const custComs = custComsMgr.loadComsList()
custComs.forEach(com => {
    const comData = window.nocode.customizedComsManager.loadComData(com.id)
    const isPreDefinedField = comData?.page?.isPreDefinedField
    if (isPreDefinedField) {
        const _com = {
            title: com.name,
            btnClass: 'w100',
            groupName: preDefinedFields.groupName,
            comName: com.name,
            comId: com.id,
            isPreDefinedField: true,
            componentPack: {
                viewSchema: {
                    title: com.name,
                    type: 'object',
                },
                propsSchema: genSchema({}, 'object')
            },
        }
        //
        comsMap[com.name] = _com
        preDefinedFields.componentList.push(_com)
    }
})

tools.push(preDefinedFields)

export default tools;
