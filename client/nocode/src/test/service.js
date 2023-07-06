import _ from 'lodash'

let listProducts = [
]

const init_products = () => {
    for (let i = 1; i <= 5; i++) {
        listProducts.push({
            _id: '' + i,
            no: '' + i,
            name: '' + i,
            picture: `/nocode/static/imgs/img${i % 5}.png`,
            price: i * 10,
            market: (Math.random() > 0.5 ? 0 : 1),
            producePlace: (Math.floor(Math.random() * 5)),
            inSale: (Math.random() > 0.5),
            delivery: (Math.random() > 0.5),
            storageDate: '2023-05-01 00:00:00',
            color: (Math.floor(Math.random() * 3)),
            level: (Math.floor(Math.random() * 6)),
        })
    }
}
init_products()

const listUsers = [
]

const init_users = () => {
    for (let i = 0; i < 25; i++) {
        listUsers.push({
            _id: '' + (i + 1),
            no: '' + (i + 1),
            name: '' + (i + 1),
            avatar: `/nocode/static/imgs/avatar${i % 3 + 1}.webp`,
            gender: (Math.floor(Math.random() * 2) + 1),
            huji: (Math.floor(Math.random() * 3) + 1),
            birthday: '2000-05-01',
            obj: {
                a: 2,
                b: 3,
            },
        })
    }
}
init_users()

const tables = {
    product: listProducts,
    user: listUsers,
}

const _list = (moduleName, params) => {
    console.log('_list, params', params)
    return new Promise(resolve => {
        //
        let list = tables[moduleName]
        if (params.search) {
            list = list.filter(item => {
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
                            if (field === 'storageDate'
                                || field === 'birthday') {
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
        if (params.sort && params.sort.field) {
            const fdName = params.sort.field
            const order = (params.sort.order === 'ascending' ? 1 : -1)
            list = list.sort((a, b) => {
                return (a[fdName] - b[fdName]) * order
            })
        }
        //
        let pageData = {
            pageCount: 1,
            pageNumber: 1,
            pageSize: 5,
            totalCount: list.length,
        }
        //
        const page = params.page
        if (page) {
            pageData.pageNumber = page.pageIndex || pageData.pageNumber
            pageData.pageSize = page.pageSize || pageData.pageSize
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

const _add = (moduleName, params) => {
    return new Promise(resolve => {
        const list = tables[moduleName]
        list.push({
            _id: '' + Date.now(),
            ...params.data
        })
        //
        resolve(true)
    })
}

const _delete = (moduleName, params) => {
    return new Promise((resolve, reject) => {
        const list = tables[moduleName]
        const i = list.findIndex(item => {
            return (item._id === params._id)
        })
        if (i >= 0) {
            list.splice(i, 1)
            //
            resolve(true)
        } else {
            reject({
                message: 'not found',
            })
        }
    })
}

const _detail = (moduleName, params) => {
    return new Promise((resolve, reject) => {
        const list = tables[moduleName]
        const i = list.findIndex(item => {
            return (item._id === params._id)
        })
        if (i >= 0) {
            const result = {
                data: _.cloneDeep(list[i]),
            }
            resolve(result)
        } else {
            reject({
                message: 'not found',
            })
        }
    })
}

const _update = (moduleName, params) => {
    return new Promise((resolve, reject) => {
        const list = tables[moduleName]
        const i = list.findIndex(item => {
            return (item._id === params.data._id)
        })
        if (i >= 0) {
            list[i] = {
                ...list[i],
                ...params.data,
            }
            //
            const result = {
                data: _.cloneDeep(list[i]),
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

const listHuJi = {
    0: '北京',
    1: '上海',
    2: '广州',
    3: '深圳',
    4: '武汉',
    5: '重庆',
}

const huji = () => {
    return new Promise((resolve) => {
        resolve(listHuJi)
    })
}

export const request_api = function (api, data) {
    console.log('[service] request_api', api.url, api.method, data)
    //
    let process = null
    if (api.url === 'product/list') {
        process = _list('product', data)
    } else if (api.url === 'product/add') {
        process = _add('product', data)
    } else if (api.url === 'product/delete') {
        process = _delete('product', data)
    } else if (api.url === 'product/detail') {
        process = _detail('product', data)
    } else if (api.url === 'product/update') {
        process = _update('product', data)
    } else if (api.url === 'product/producePlace') {
        process = produce_place(data)
    } else if (api.url === 'user/list') {
        process = _list('user', data)
    } else if (api.url === 'user/add') {
        process = _add('user', data)
    } else if (api.url === 'user/delete') {
        process = _delete('user', data)
    } else if (api.url === 'user/detail') {
        process = _detail('user', data)
    } else if (api.url === 'user/update') {
        process = _update('user', data)
    } else if (api.url === 'user/huji') {
        process = huji('user', data)
    }
    //
    return new Promise((resolve, reject) => {
        if (process) {
            process.then(result => {
                setTimeout(() => {
                    resolve(result)
                }, 0);
            }).catch(e => {
                reject(e)
            })
        } else {
            reject(`[service] request_api, not found ${api.url}`)
        }
    })
}
