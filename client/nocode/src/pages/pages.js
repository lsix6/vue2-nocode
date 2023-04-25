import { register_page } from "@/components/nc_pages"
import { createAddPage } from "./base/add/add_page"
import { createEditPage } from "./base/edit/edit_page"
import { createListPage } from "./base/list/list_page"

export const register_module = (moduleInfo) => {
    const list_page = createListPage(moduleInfo)
    const add_page = createAddPage(moduleInfo)
    const edit_page = createEditPage(moduleInfo)
    register_page(`${moduleInfo.name}/list`, list_page)
    register_page(`${moduleInfo.name}/add`, add_page)
    register_page(`${moduleInfo.name}/edit`, edit_page)
}