import React, { Component } from 'react'
import './index.scss'

// 组件
import Aside from '../../components/Aside/index'

// antd
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render(){
        return(
            <>
                <Layout className='layout-wrap'>
                    <Sider width={"250px"}>
                        <Aside />
                    </Sider>
                    <Layout>
                        <Header className='layout-header'>Header</Header>
                        <Content className='layout-content'>Content</Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default Index