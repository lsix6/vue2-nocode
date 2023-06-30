
const routes = [
    {
        path: '/editor',
        component: () => import('@/views/editor/ComsEditor.vue')
    },
    {
        path: '/preview',
        component: () => import('@/views/preview/Preview.vue')
    },
    { path: '*', redirect: '/editor' }
]

export default routes