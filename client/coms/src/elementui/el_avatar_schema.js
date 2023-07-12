/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

const viewSchema = {
    title: 'ElAvatar',
    type: 'object',
};

export default {
    viewSchema,
    propsSchema: {
        com_props: {
            type: 'object',
            title: 'props',
            properties: {
                size: {
                    type: 'string',
                    title: 'size',
                    enum: [
                        'large',
                        'medium',
                        'small',
                    ],
                    default: 'large'
                },
                shape: {
                    type: 'string',
                    title: 'shape',
                    enum: [
                        'circle',
                        'square',
                    ],
                    default: 'circle'
                },
            }
        }
    },
    comSchema: {
        com_name: 'ElAvatar',
    },
};
