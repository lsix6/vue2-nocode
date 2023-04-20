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

const product_list = (params) => {
    console.log('product_list, params', params)
    return new Promise(resolve => {
        const ret = {
            listData: _.cloneDeep(listProducts),
            pageData: {
                pageCount: 1,
                pageNumber: 1,
                pageSize: 20,
                totalCount: listProducts.length,
            },
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
