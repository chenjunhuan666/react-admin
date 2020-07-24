import service from '../utils/request'

/* 
    登录接口
*/
export function Login(data){
    return service.request({
        url: '/login/',
        method: 'post',
        data: data, // 请求类型为post
        // params: data  //请求类型为get
    })
}
/* 
    获取验证码
*/
export function GetCode(data){
    return service.request({
        url: '/getSms/',
        method: 'post',
        data: data, // 请求类型为post
    })
}
/* 
    注册
*/
export function Registe(data){
    return service.request({
        url: '/register/',
        method: 'post',
        data: data, // 请求类型为post
    })
}

