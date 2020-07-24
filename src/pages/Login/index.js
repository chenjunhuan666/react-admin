import React, { Component } from 'react'
import './index.scss'
import Login from './login'
import Register from './register'
class About extends Component {
    constructor(props){
        super(props)
        this.state = {
            visiableValue: 'login',
        }
    }

    componentDidMount = () => {
        // console.log(process.env)
    }

    changeToRegister = (value) => {
        this.setState({
            visiableValue : value
        })
    }

    changeToLogin = (value) => {
        this.setState({
            visiableValue : value
        })
    }

    render(){
        return(
            <div className='login-wrap'>
               <div className='login'>
                    {this.state.visiableValue === 'login' ? <Login changeToRegister={this.changeToRegister}/> : <Register changeToLogin={this.changeToLogin}/>}
               </div>
            </div>
        )
    }
}

export default About

