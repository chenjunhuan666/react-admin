import React, { Component } from 'react'
import './index.scss'
import { Button } from 'antd'
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <>
                <Button type="primary">Primary Button</Button>
            </>
        )
    }
}

export default Home