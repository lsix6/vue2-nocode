
export class PagesManager {

    base_path = '/'

    nc_pages = {}

    set_base_path(basePath) {
        this.base_path = basePath
    }

    get_base_path() {
        return this.base_path
    }

    register_page(route, page) {
        this.nc_pages[route] = page;
    }

    get_page(route) {
        return this.nc_pages[route]
    }

    get_routes() {
        const paths = Object.keys(this.nc_pages)
        if (paths.length === 0) {
            console.error('[pages_manager] get_routes, please first register page, then get nc view route')
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
        const redirect = this.base_path + paths[0]
        const route = {
            path: this.base_path,
            name: 'nc_view',
            redirect,
            children: [
                ...children,
            ]
        }
        if (children.length > 0) {
            route.children.push(
                {
                    path: '*',
                    redirect: children[0]
                }
            )
        }
        console.log('[pages_manager] get_routes, route: ', route)
        //
        return route
    }

}