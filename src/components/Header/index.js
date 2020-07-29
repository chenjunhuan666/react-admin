import React, { Component } from 'react'

// antd
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';

class Head extends Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: props.collapsed,
        } 
    }
    // 更新父组件的collapsed值
    UNSAFE_componentWillReceiveProps = ({collapsed}) => {
        this.setState({
            collapsed
        })
    }

    // 触发父级的toggle切换
    toggleCollapsed = () => {
        this.props.toggle()
    };

    render(){
        const { collapsed } = this.state
        return(
            <div>
                <span onClick={this.toggleCollapsed} style={{fontSize:'24px',cursor:'pointer'}}>
                    {collapsed ? <MenuUnfoldOutlined />: <MenuFoldOutlined/>}
                </span>
                
            </div>
        )
    }
}

export default Head