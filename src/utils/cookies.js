import cookies from 'react-cookies'

// 存储token
export function setToken(value){
    cookies.save('adminToken',value)
}

// 获取token
export function getToken(){
    return cookies.load('adminToken')
}
// 存储用户名
export function setUsername(value){
    cookies.save('username',value)
}
// 获取用户名
export  function getUsername(){
    return cookies.load('username')
}
