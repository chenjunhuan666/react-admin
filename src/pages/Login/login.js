import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// antd
import { Form, Input, Button, Row, Col, message, } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';

//加密
import CryptoJs from 'crypto-js'

// 密码验证
import { validate_password } from '../../utils/validate'

// API
import { Login } from '../../api/account'

// 组件
import Code from '../../components/code/index'

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            module: 'login',
            loading: false
        }
    }

    // 用户名输入框改变
    inputChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    // 切换至注册页面
    changeToRegister = () => {
        this.props.changeToRegister('register')
    }
    
    // 登录表单提交
    onFinish = (values ) => {
        // console.log('Received values of form: ', values);
        this.setState({
            loading: true
        })
        let { username, password, code } = values
        let loginData = {
            username, 
            password: CryptoJs.MD5(password).toString(), 
            code
        }
        Login(loginData).then(res => {
            message.success(res.data.message);
            this.setState({
                loading: false
            })
            this.props.history.push('/index')
        }).catch(error => {
            console.log("error：",error)
            this.setState({
                loading: false
            })
        })
    }

    login = () => {
        const { username, module, loading } = this.state
        // const _this = this
        return(
            <div>
                <div className='login-title'>
                    <h4>登录</h4>
                    <i style={{cursor:'pointer'}} onClick={this.changeToRegister}>账号注册</i>
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
                                    {type: "email", message: '邮箱格式不正确'},
                                    // ({ getFieldValue }) => ({
                                    //     validator(rule, value) {
                                    //         if (validate_email(value)) {
                                    //             _this.setState({
                                    //                 code_button_disabled: false
                                    //             })
                                    //             return Promise.resolve();
                                    //         }
                                    //         _this.setState({
                                    //             code_button_disabled: true
                                    //         })
                                    //         return Promise.reject('邮箱格式不正确');
                                    //     },
                                    // }),
                                ]
                            }
                        >
                            <Input 
                                value = {username} 
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
                                    { pattern: validate_password, message: '请输入大于6位小于20位数字+字母'}
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
                            name='code'
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
                                        disabled = {code_button_disabled}
                                        onClick = {this.getAuthCode} 
                                        loading = {code_button_loading}
                                        className="getCodeButton"
                                        block
                                    >
                                        {code_button_text}
                                    </Button> */}
                                    <Code username={username} module={module}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                block
                                loading={loading}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div >
                {this.login()}
            </div>
        )
    }
}

export default withRouter(LoginForm)

