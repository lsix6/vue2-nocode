import _ from 'lodash'

let listProducts = [
]

const init_products = () => {
    for (let i = 1; i <= 5; i++) {
        listProducts.push({
            _id: '' + i,
            no: '' + i,
            name: '' + i,
            picture: `/static/imgs/img${i % 5}.png`,
            price: i * 10,
            market: (Math.random() > 0.5 ? '0' : '1'),
            producePlace: (Math.floor(Math.random() * 5)).toString(),
            inSale: (Math.random() > 0.5),
            delivery: (Math.random() > 0.5),
            storageDate: '2023-05-01 00:00:00',
            color: '#0000ff',
            level: (Math.floor(Math.random() * 6)),
        })
    }
}
init_products()

const product_list = (params) => {
    console.log('product_list, params', params)
    return new Promise(resolve => {
        //
        let list = listProducts
        if (params.search) {
            list = listProducts.filter(item => {
                let ret = true
                //
                for (let field in params.search) {
                    const searchValue = params.search[field]
                    if (field === 'keyWord') {
                        if (searchValue) {
                            ret = (item.name.indexOf(params.search.keyWord) >= 0
                                || item.no.indexOf(params.search.keyWord) >= 0)
                        }
                    } else {
                        if (searchValue !== '' && searchValue !== null) {
                            if (field === 'storageDate') {
                                const startDT = new Date(searchValue[0])
                                const endDT = new Date(searchValue[1])
                                const dt = new Date(item[field])
                                ret = (dt >= startDT && dt <= endDT)
                            } else {
                                ret = (item[field] === searchValue)
                            }
                        }
                    }
                    //
                    if (ret === false) {
                        break
                    }
                }
                //
                return ret
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
