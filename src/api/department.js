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
        url: '/department/list/',
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