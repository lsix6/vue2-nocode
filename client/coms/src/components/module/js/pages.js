import { createAddPage } from "./add/add_page"
import { createEditPage } from "./edit/edit_page"
import { createListPage } from "./list/list_page"
import { create_date_sources } from "./data_sources"

export const preProcessModuleInfo = (moduleInfo) => {
    // 预处理模块信息

    // 根据模块信息添加数据源
    const data_sources = create_date_sources(moduleInfo)
    moduleInfo.data_sources = [
        ...data_sources,
    ]
    //
    return moduleInfo
}

export const register_module = (moduleInfo) => {
    const pagesManager = window.nocode.pagesManager
    //
    const mInfo = preProcessModuleInfo(moduleInfo)
    //
    const list_page = createListPage(mInfo)
    const add_page = createAddPage(mInfo)
    const edit_page = createEditPage(mInfo)
    pagesManager.register_page(`${mInfo.name}/list`, list_page)
    pagesManager.register_page(`${mInfo.name}/add`, add_page)
    pagesManager.register_page(`${mInfo.name}/edit`, edit_page)
}