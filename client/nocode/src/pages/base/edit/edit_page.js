import { createEditForm } from "./edit_form"

export const createEditPage = (moduleInfo) => {

    const formEdit = createEditForm(moduleInfo)

    const edit_page = {
        com_name: "div",
        com_version: '1',
        com_info: {
            style: {
                background: '#F5F6F7',
                flex: 1,
                display: 'flex',
            },
        },
        com_children: [
            {
                com_name: 'el-container',
                com_props: {
                    direction: 'vertical',
                },
                com_children: [
                    {
                        com_name: 'el-header',
                        com_info: {
                            style: {
                                padding: '50px',
                                'text-align': 'center',
                            },
                        },
                        com_children: [
                            {
                                com_name: 'div',
                                com_text: moduleInfo.edit_form.title,
                            },
                        ],
                    },
                    {
                        com_name: 'el-main',
                        com_children: [
                            {
                                com_name: 'div',
                                com_info: {
                                    style: {
                                        width: '800px',
                                        margin: 'auto',
                                    },
                                },
                                com_children: [
                                    {
                                        com_name: 'nc_data',
                                        com_props: {
                                            fetch_data: {
                                                api: {
                                                    url: `${moduleInfo.name}/detail`,
                                                    method: 'GET',
                                                },
                                                fetch_params: [
                                                    {
                                                        params_source: 'route_query',
                                                        params_fields: [
                                                            '_id',
                                                        ]
                                                    }
                                                ]
                                            },
                                            data_children: [
                                                formEdit,
                                            ],
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    }

    return edit_page
}
