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