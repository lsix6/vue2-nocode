import { createList } from "./list";
import { createListSearch } from "./list_search";
import { list_btnAdd } from "./list_add_button";
import { list_pagination } from "./list_pagination";

export const createListPage = (moduleInfo) => {

    const list = createList(moduleInfo.name, moduleInfo.fields)
    const list_formSearch = createListSearch(moduleInfo.fields)

    const list_page = {
        com_name: "div",
        com_version: '1',
        com_info: {
            style: {
                background: '#F5F6F7',
                flex: 1,
                display: 'flex',
                overflow: 'auto',
            },
        },
        com_children: [
            {
                com_name: 'nc_data_source',
                com_ref: 'list_page_data',
                com_info: {
                    style: {
                        flex: 1,
                        overflow: 'hidden',
                        'min-width': '900px',
                    },
                },
                com_props: {
                    data_sources: {
                        ...moduleInfo.data_sources,
                        __listPageData: {
                            api: {
                                url: `${moduleInfo.name}/list`,
                                method: 'GET',
                            },
                            fetch_params: [
                                {
                                    params_source: 'com_ref',
                                    params_com_ref: 'formSearch',
                                    params_set_name: 'search',
                                },
                                {
                                    params_source: 'com_ref',
                                    params_com_ref: 'list',
                                    params_com_method_name: 'getSort',
                                    params_set_name: 'sort',
                                },
                                {
                                    params_source: 'com_ref',
                                    params_com_ref: 'pagination',
                                    params_set_name: 'page',
                                    params_default_value: {
                                        pageIndex: 1,
                                        pageSize: 20,
                                    },
                                },
                            ]
                        },
                    },
                    data_children: [
                        {
                            com_name: 'div',
                            com_info: {
                                style: {
                                    height: '100%',
                                    display: 'flex',
                                    'flex-direction': 'column',
                                },
                            },
                            com_children: [
                                {
                                    com_name: 'div',
                                    com_info: {
                                        style: {
                                            padding: '10px 0',
                                            display: 'flex',
                                            'flex-direction': 'row',
                                        },
                                    },
                                    com_children: [
                                        list_formSearch,
                                        list_btnAdd,
                                    ],
                                },
                                {
                                    com_name: 'div',
                                    com_info: {
                                        style: {
                                            flex: 1,
                                            overflow: 'hidden',
                                        },
                                    },
                                    com_children: [
                                        list,
                                    ],
                                },
                                {
                                    com_name: 'div',
                                    com_info: {
                                        style: {
                                            padding: '10px 0'
                                        },
                                    },
                                    com_children: [
                                        list_pagination,
                                    ],
                                },
                            ],
                        },
                    ],
                },
            }
        ],
    }

    return list_page
}
