import React, { Component } from 'react'
import './index.scss'

// 组件
import Aside from '../../components/Aside/index'
import Container from '../../components/Container/index'
import Head from '../../components/Header/index'
// antd
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

class Index extends Component {

    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
        }
    }

    // 存储刷新状态
    componentDidMount = () => {
        const collapsed = JSON.parse(sessionStorage.getItem("collapsed"))
        this.setState({
            collapsed
        })
    }

    // 状态切换
    toggle = () => {
        const  collapsed  = !this.state.collapsed
        this.setState({
            collapsed
        })
        sessionStorage.setItem("collapsed", collapsed);
    }


    render(){
        return(
            <>
                <Layout className='layout-wrap'>
                    <Sider collapsed = {this.state.collapsed} width={"250px"}>
                        <Aside collapsed = {this.state.collapsed}/>
                    </Sider>
                    <Layout>
                        <Header  className='layout-header'>
                            <Head 
                                collapsed = {this.state.collapsed}
                                toggle = {this.toggle}
                            />
                        </Header>
                        <Content className='layout-content'>
                            <Container />
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default Index