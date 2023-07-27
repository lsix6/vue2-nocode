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
        com_slots: {
            default: [
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
                        data_sources: [
                            ...moduleInfo.data_sources,
                            {
                                name: 'listPageData',
                                type: 'api',
                                api: {
                                    url: `${moduleInfo.name}/list`,
                                    method: 'GET',
                                    fetch_params: [
                                        {
                                            param_name: 'search',
                                            param_source: 'com_ref',
                                            param_desc: 'formSearch.getData()',
                                        },
                                        {
                                            param_name: 'sort',
                                            param_source: 'com_ref',
                                            param_desc: 'list.getSort()',
                                        },
                                        {
                                            param_name: 'page',
                                            param_source: 'com_ref',
                                            param_desc: 'pagination.getData()',
                                            params_default_value: {
                                                pageIndex: 1,
                                                pageSize: 10,
                                            },
                                        },
                                    ]
                                },
                            },
                        ],
                    },
                    com_slots: {
                        default: [
                            {
                                com_name: 'div',
                                com_info: {
                                    style: {
                                        height: '100%',
                                        display: 'flex',
                                        'flex-direction': 'column',
                                    },
                                },
                                com_slots: {
                                    default: [
                                        {
                                            com_name: 'div',
                                            com_info: {
                                                style: {
                                                    padding: '10px 0',
                                                    display: 'flex',
                                                    'flex-direction': 'row',
                                                },
                                            },
                                            com_slots: {
                                                default: [
                                                    list_formSearch,
                                                    ...(moduleInfo.buttons || []),
                                                    list_btnAdd,
                                                ],
                                            },
                                        },
                                        {
                                            com_name: 'div',
                                            com_info: {
                                                style: {
                                                    flex: 1,
                                                    overflow: 'hidden',
                                                },
                                            },
                                            com_slots: {
                                                default: [
                                                    list,
                                                ],
                                            },
                                        },
                                        {
                                            com_name: 'div',
                                            com_info: {
                                                style: {
                                                    padding: '10px 0'
                                                },
                                            },
                                            com_slots: {
                                                default: [
                                                    list_pagination,
                                                ],
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                }
            ],
        },
    }

    return list_page
}
