import { register_page } from "./components/nc_pages"

const pageHome = {
    "com_name": "div",
    "com_version": '0',
    "com_props": {
        style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            background: '#F5F6F7'
        },
    },
}

export const init_nocode = () => {
    register_page('home', pageHome)
}