import _ from 'lodash'

let listProducts = [
    {
        no: '1',
        name: '1',
        price: 10,
    },
    {
        no: '2',
        name: '2',
        price: 20,
    },
]

const init_products = () => {
    for (let i = 3; i <= 150; i++) {
        listProducts.push({
            no: '' + i,
            name: '' + i,
            price: i * 10,
        })
    }
}
init_products()

const product_list = (params) => {
    console.log('product_list, params', params)
    return new Promise(resolve => {
        //
        let list = listProducts
        if (params.search && params.search.keyWord) {
            list = listProducts.filter(item => {
                return item.name.indexOf(params.search.keyWord) >= 0
            })
        }
        //
        let pageData = {
            pageCount: 1,
            pageNumber: 1,
            pageSize: 20,
            totalCount: list.length,
        }
        //
        const page = params.page
        if (page && page.pageIndex) {
            pageData.pageNumber = page.pageIndex
            pageData.pageSize = page.pageSize
        }
        pageData.pageCount = Math.floor((pageData.totalCount - 1) / pageData.pageSize) + 1
        pageData.pageNumber = Math.min(pageData.pageNumber, pageData.pageCount)
        //
        const start = (pageData.pageNumber - 1) * pageData.pageSize
        const end = start + pageData.pageSize
        const listData = _.cloneDeep(list.slice(start, end))
        const ret = {
            listData,
            pageData,
        }
        resolve(ret)
    })
}

export const request_api = function (api, data) {
    console.log('request_api', api.url, api.method, data)
    //
    if (api.url === 'product/list') {
        return product_list(data)
    }
}
