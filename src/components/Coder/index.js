import React, { Component } from 'react'

// 密码、邮箱验证
import { validate_email } from '../../utils/validate'

// antd
import { Button, message } from 'antd';

// API
import { GetCode } from '../../api/account'

// 定时器
let timer = null

class Code extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: props.username,
            button_disabled: false,
            button_loading: false,
            button_text: '获取验证码',
            module: props.module
        }
    }
    /* 
        这个钩子函数，定时器setState后1s会触发一次，不建议使用
    */
    // static getDerivedStateFromProps = (props,state) => {
    //     console.log(props,state)
    //     const { username } = props
    //     if(username !== state.username){
    //         return {
    //             username
    //         }
    //     }
    //     return null
    // }

    /* 
        即将被废弃，所以暂时用
    */
    UNSAFE_componentWillReceiveProps = ({ username }) => {
        // console.log(props)
        this.setState({
            username,
        })
    }

    /* 
        组件销毁，清除定时器
    */
    componentWillUnmount = () => {
        clearInterval(timer)
    }


    // 获取验证码
    getAuthCode = () => {
        const { username, module } = this.state
        if(!username){
            message.warning('用户名不能为空',1)
            return false;
        }
        if(!validate_email(username)){
            message.warning('用户名格式不正确',1)
            return false;
        }
        this.setState({
            button_loading: true,
            button_text: '发送中'
        })
        const requestData = {
            module,
            username
        }
        GetCode(requestData).then(
            res => {
                message.success(res.data.message)
                this.countDown()
            }
        ).catch( 
            err => {
                this.setState({
                    button_loading: false,
                    button_text: '重新获取'
                })  
            }
        )
    }

    // 倒计时
    countDown = () => {
        let sec = 60
        this.setState({
            button_loading: false,
            button_disabled: true,
            button_text: `${sec}S`,
        })
        timer = setInterval(() => {
            sec--
            this.setState({
                button_text: `${sec}S`,
            })
            if(sec === 0){
                clearInterval(timer)
                this.setState({
                    button_text: '重新获取',
                    button_disabled: false,
                })
            }
        }, 1000);
    }

    render(){
        const { button_text, button_disabled, button_loading } = this.state
        return(
            <div>
                <Button 
                    type="danger" 
                    disabled = {button_disabled}
                    onClick = {this.getAuthCode} 
                    loading = {button_loading}
                    className="getCodeButton"
                    block
                >
                    {button_text}
                </Button>
            </div>
        )
    }
}

export default Code