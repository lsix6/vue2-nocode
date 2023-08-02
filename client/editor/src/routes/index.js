
const routes = [
    {
        path: '/editor/edit',
        component: () => import('@/views/editor/ComsEditor.vue')
    },
    {
        path: '/editor/preview',
        component: () => import('@/views/preview/Preview.vue'),
        children: [
            {
                path: '*',
            }
        ],
    },
    { path: '*', redirect: '/editor/edit' }
]

export default routes