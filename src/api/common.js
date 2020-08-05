import service from '../utils/request'

export function TableList(params){
    return service.request({
        url: params.url,
        method: params.method || 'post',
        data: params.data, // 请求类型为post
    }) 
}