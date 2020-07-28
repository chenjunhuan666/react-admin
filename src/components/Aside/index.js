import React, { Component } from 'react'
import './index.scss'
// react-router-dom
import { Link } from 'react-router-dom'
// router
import router from '../../router/index'
// antd
import { Menu } from 'antd';
import {  DingdingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
class Aside extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    // 一级菜单
    renderMenu = ( { key, title } ) => {
        return(
            <Menu.Item key={key}> 
                <Link to={key}>{title} </Link>
            </Menu.Item>
        ) 
    }

    // 二级及多级菜单
    renderSubMenu = ( { key, title, child } ) => {
        return(
            <SubMenu key={key} icon= {<DingdingOutlined />} title={title}>
                {
                    child && child.map(item => {
                        // return <Menu.Item key={item.key}> {item.title} </Menu.Item>
                        // 如果再嵌套一层child
                        return item.child && item.child > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                    })
                }
            </SubMenu>
        )
    }
    

    render(){
        return(
            <div className='aside-warp'>
                <p>React-Admin</p>
                <Menu
                    theme='dark'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >

                    {
                        router && router.map(item => {
                            return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                        })
                    }
                    
                </Menu>
            </div>
        )
    }
}

export default Aside