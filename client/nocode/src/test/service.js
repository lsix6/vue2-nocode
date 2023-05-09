import _ from 'lodash'

let listProducts = [
]

const init_products = () => {
    for (let i = 1; i <= 5; i++) {
        listProducts.push({
            _id: '' + i,
            no: '' + i,
            name: '' + i,
            price: i * 10,
            market: '0',
            producePlace: '1',
            storageDate: '2023-05-01 00:00:00',
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
                return (item.name.indexOf(params.search.keyWord) >= 0
                    || item.no.indexOf(params.search.keyWord) >= 0)
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

const product_add = (params) => {
    return new Promise(resolve => {
        listProducts.push({
            _id: '' + Date.now(),
            ...params.data
        })
        //
        resolve(true)
    })
}

const product_delete = (params) => {
    return new Promise((resolve, reject) => {
        const i = listProducts.findIndex(item => {
            return (item._id === params._id)
        })
        if (i >= 0) {
            listProducts.splice(i, 1)
            //
            resolve(true)
        } else {
            reject({
                message: 'not found',
            })
        }
    })
}

const product_detail = (params) => {
    return new Promise((resolve, reject) => {
        const i = listProducts.findIndex(item => {
            return (item._id === params._id)
        })
        if (i >= 0) {
            const result = {
                data: _.cloneDeep(listProducts[i]),
            }
            resolve(result)
        } else {
            reject({
                message: 'not found',
            })
        }
    })
}

const product_update = (params) => {
    return new Promise((resolve, reject) => {
        const i = listProducts.findIndex(item => {
            return (item._id === params.data._id)
        })
        if (i >= 0) {
            listProducts[i] = {
                ...listProducts[i],
                ...params.data,
            }
            //
            const result = {
                data: _.cloneDeep(listProducts[i]),
            }
            resolve(result)
        } else {
            reject({
                message: 'not found',
            })
        }
    })
}

const listProducePlace = {
    0: '北京',
    1: '上海',
    2: '广州',
    3: '深圳',
    4: '武汉',
    5: '重庆',
}

const produce_place = () => {
    return new Promise((resolve) => {
        resolve(listProducePlace)
    })
}

export const request_api = function (api, data) {
    console.log('request_api', api.url, api.method, data)
    //
    let process = null
    if (api.url === 'product/list') {
        process = product_list(data)
    } else if (api.url === 'product/add') {
        process = product_add(data)
    } else if (api.url === 'product/delete') {
        process = product_delete(data)
    } else if (api.url === 'product/detail') {
        process = product_detail(data)
    } else if (api.url === 'product/update') {
        process = product_update(data)
    } else if (api.url === 'product/producePlace') {
        process = produce_place(data)
    }
    //
    return new Promise((resolve, reject) => {
        if (process) {
            process.then(result => {
                setTimeout(() => {
                    resolve(result)
                }, 0);
            })
        } else {
            reject()
        }
    })
}
