/**
 * Created by Liu.Jun on 2020/11/20 17:44.
 */

export default {
    type: 'object',
    required: [],
    properties: {
        path: {
            type: 'string',
            title: 'path',
        },
        menu: {
            type: 'object',
            title: 'menu',
            properties: {
                label: {
                    type: 'string',
                    title: 'label',
                },
            },
        },
    }
};
