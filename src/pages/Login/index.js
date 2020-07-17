import React, { Component } from 'react'
import './index.scss'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
class About extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    onFinish = (values ) => {
        console.log('Received values of form: ', values);
    }

    login = () => {
        return(
            <div>
                <div className='login-title'>
                    <h4>登录</h4>
                    <i style={{cursor:'pointer'}}>账号注册</i>
                </div>
                <div className='login-content'>
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={13}>
                                <Col  span={15}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="验证码"
                                    />
                                </Col>
                                <Col span={9}>
                                    <Button type="danger"  className="obtain-code-button" block>
                                        获取验证码
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
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
            <div className='login-wrap'>
                <div className='login'>
                    {this.login()}
                </div>
            </div>
        )
    }
}

export default About

