
const nc_requests = {}

export const register_request_api = (func) => {
    nc_requests['request_api'] = func
}

export const request_api = (api, data) => {
    return new Promise((resolve, reject) => {
        const func = nc_requests['request_api']
        if (func) {
            func(api, data).then(result => {
                // console.log('[nc_requests] request_api, result', result)
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        } else {
            reject('[nc_request] no registered request_api')
        }
    })
}

/**
 * 请求 json 数据
 * @param {*} url 要请求的 json 文件的 url
 * @returns 返回 json 文本转成的对象
 */
 export const request_json = function (url) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                try {
                    var json = JSON.parse(request.responseText);
                    // console.log('# requestJson', json);
                    //
                    resolve(json)
                } catch (e) {
                    reject(e)
                }
            } else {
                reject(request.statusText)
            }
        }
        request.onerror = function (e) {
            reject(e)
        }
    })
}
