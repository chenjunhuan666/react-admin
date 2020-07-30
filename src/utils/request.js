import axios from 'axios'
// antd
import { message, notification } from 'antd'
// cokies
import { getToken, getUsername } from './cookies'

// 第一步：创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API, //本地已处理跨域，可暂时不需要基础地址
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
});

// 第二步：请求拦截 (请求头)
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['Token'] = getToken()
    config.headers['Username'] = getUsername()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
}); 

// 第三步：响应拦截 (响应头)
service.interceptors.response.use(function (response) {  // http状态 200 执行这里
    // 对响应数据做点什么

    const data = response.data

    if( data.resCode !== 0 ){  // resCode不成功
        message.error(data.message) // 全局的错误拦截提示
        return Promise.reject(response)
    }

    return response;

}, function (error) { // http 不为 200 执行这里
    // 对响应错误做点什么
    console.log('error:',error.response)
    if(error.response){
        switch(error.response.status){
            case 404:
                notification.error({
                    message: error.response.data,
                    description: `状态码:400, 状态信息:${error.response.statusText}`
                })
                break;
            case 400:
                notification.error({
                    message: error.response.data,
                    description: `状态码:400, 状态信息:${error.response.statusText}`
                });
                break;
            case 500:
                notification.error({
                    message: '服务器出错!',
                    description: `状态码:500, 状态信息:${error.response.statusText}`,
                });
                break;
            case 502:
                notification.error({
                    message: '网关错误!',
                    description: `状态码:502, 状态信息:${error.response.statusText}`
                });
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
});

export default service
