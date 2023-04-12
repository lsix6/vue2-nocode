
export const nc_pages = {}

export const nc_view_route = '/board/'

export const register_page = (route, page) => {
    nc_pages[route] = page;
}

export const get_nc_view_route = () => {
    const paths = Object.keys(nc_pages)
    if (paths.length === 0) {
        console.error('[nc_pages] get_nc_view_route, please first register page, then get nc view route')
        return
    }
    //
    let children = []
    paths.forEach(path => {
        children.push({
            path
        })
    })
    //
    const redirect = nc_view_route + paths[0]
    const route = {
        path: nc_view_route,
        name: 'nc_view',
        redirect,
        component: () => import('./nc_view.vue'),
        children: [
            ...children,
        ]
    }
    console.log('[nc_pages] get_nc_view_route, route: ', route)
    //
    return route
}