import React, { Component } from 'react'

// antd
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// 加密
import CryptoJs from 'crypto-js'

// 组件
import Code from '../../components/code/index'

// 密码验证
import { validate_psd } from '../../utils/validate'

// API
import { Registe } from '../../api/account'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            module: 'register'
        }
    }

    // 切换至登录界面
    changeToLogin = () => {
        this.props.changeToLogin('login')
    }

    // 用户名输入框改变
    inputChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    // 提交注册表单
    onFinish = (values) => {
        console.log(values)
        let { username, password2, code } = values
        let registerData = {
            username,
            password: CryptoJs.MD5(password2).toString(),
            code
        }
        Registe(registerData).then(
            res => {
                console.log(res)
                message.success(res.data.message)
                if(res.data.resCode === 0){
                    this.changeToLogin()
                }
            }
        ).catch(
            err => {
                
            }
        )

    }

    /* 
        注册组件
    */
    register = () => {
        const { username, module } = this.state
        return(
            <div>
                <div className='login-title'>
                    <h4>注册</h4>
                    <i style={{cursor:'pointer'}} onClick={this.changeToLogin}>账号登录</i>
                </div>
                <div className='login-content'>
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={
                                [
                                    { required: true, message: '请输入邮箱!' },
                                    {type: "email", message: '邮箱格式不正确',}
                                ]
                            }
                        >
                            <Input 
                                onChange = {this.inputChange}
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="用户名" 
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                [
                                    { required: true, message: '请输入密码!' },
                                    // { pattern: validate_password, message: '请输入大于6位小于20位数字+字母'},
                                    ({ getFieldValue }) =>({
                                        validator(rule, value){
                                            if(!validate_psd(value)){
                                                return Promise.reject('请输入大于6位小于20位数字+字母')
                                            }
                                            if(getFieldValue('password2') && value !== getFieldValue('password2') ){
                                                return Promise.reject('两次密码不一致')
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]
                            }
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password2"
                            rules={
                                [
                                    { required: true, message: '请再次输入密码!' },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                          if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                          }
                                          return Promise.reject('两次密码不一致!');
                                        },
                                    }),
                                ]
                            }
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="确认密码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={
                                [
                                    { required: true, message: '验证码不能为空!' },
                                    { len: 6, message: '验证码为6位数' }
                                ]
                            }
                        >
                            <Row gutter={13}>
                                <Col  span={15}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder="验证码"
                                    />
                                </Col>
                                <Col span={9}>
                                    {/* <Button 
                                        type="danger" 
                                        onClick={this.getRandomNumber} 
                                        className="getCodeButton"
                                        block
                                    >
                                        获取验证码
                                    </Button> */}
                                    <Code username={username} module={module}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div>
                {this.register()}
            </div>
        )
    }
}

export default Register