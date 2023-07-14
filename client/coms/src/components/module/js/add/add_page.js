import { createAddForm } from "./add_form";

export const createAddPage = (moduleInfo) => {

    const formAdd = createAddForm(moduleInfo)

    const add_page = {
        com_name: "div",
        com_version: '1',
        com_info: {
            style: {
                background: '#F5F6F7',
                flex: 1,
                display: 'flex',
            },
        },
        com_slots: {
            default: [
                {
                    com_name: 'el-container',
                    com_props: {
                        direction: 'vertical',
                    },
                    com_slots: {
                        default: [
                            {
                                com_name: 'el-header',
                                com_info: {
                                    style: {
                                        padding: '50px',
                                        'text-align': 'center',
                                    },
                                },
                                com_slots: {
                                    default: [
                                        {
                                            com_name: 'div',
                                            com_text: moduleInfo.add_form.title,
                                        },
                                    ],
                                },
                            },
                            {
                                com_name: 'el-main',
                                com_slots: {
                                    default: [
                                        {
                                            com_name: 'div',
                                            com_info: {
                                                style: {
                                                    width: '800px',
                                                    margin: 'auto',
                                                },
                                            },
                                            com_slots: {
                                                default: [
                                                    {
                                                        com_name: 'nc_data_source',
                                                        com_props: {
                                                            data_sources: [
                                                                ...moduleInfo.data_sources,
                                                            ],
                                                        },
                                                        com_slots: {
                                                            default: [
                                                                formAdd,
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
        },
    }

    return add_page
}
