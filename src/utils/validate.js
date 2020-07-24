// 正则
const reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
const reg_email = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/

// 密码验证
export const validate_password = reg_password;

// 密码验证
export function validate_psd(value){
    return reg_password.test(value)
}
// 邮箱验证
export function validate_email(value){
    return reg_email.test(value)
}