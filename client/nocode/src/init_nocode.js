import { register_page } from "./components/nc_pages"
import { pageProductList } from "./pages/product_list"


export const init_nocode = () => {
    register_page('productList', pageProductList)
}