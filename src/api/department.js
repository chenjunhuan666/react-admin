import service from '../utils/request'
/* 
    添加部门
*/
export function DepartmentAddApi(data){
    return service.request({
        url: '/department/add/',
        method: 'post',
        data: data, // 请求类型为post
    }) 
}

/* 
    部门列表
*/
export function GetDepartmentList(data){
    return service.request({
        url: data.url,
        method: 'post',
        data: data, // 请求类型为post
    }) 
}

/* 
    删除部门列表
*/
export function DeleteDepList(data){
    return service.request({
        url: '/department/delete/',
        method: 'post',
        data: data, // 请求类型为post
    }) 
}

/* 
    禁启用
*/
export function ForbidEnableApi(data){
    return service.request({
        url: '/department/status/',
        method: 'post',
        data: data, // 请求类型为post
    }) 
}

/* 
    详情
*/
export function DetailApi(data){
    return service.request({
        url: '/department/detailed/',
        method: 'post',
        data: data, // 请求类型为post
    }) 
}

/* 
    编辑
*/
export function EditApi(data){
    return service.request({
        url: '/department/edit/',
        method: 'post',
        data: data, // 请求类型为post
    }) 
}