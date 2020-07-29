import React, { Component } from 'react'
import './index.scss'
// react-router-dom
import { Link, withRouter } from 'react-router-dom'
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
            selectedKeys: [],
            openKeys: [],
        }
    }

    // 多级菜单展开
    onOpenChange = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    componentDidMount = () => {
        const pathname = this.props.location.pathname
        const openPath = pathname.split('/').slice(0,3).join('/')
        const menuHigh = {
            selectedKeys: [pathname],
            openKeys: [openPath]
        }
        this.selectMenuHigh(menuHigh)
    }

    // 菜单点击
    menuClick = ({ item, key, keyPath, domEvent }) => {
        const menuHigh = {
            selectedKeys: [key],
            openKeys: [keyPath[keyPath.length-1]]
        }
        this.selectMenuHigh(menuHigh)
    }

    // 菜单高光显示
    selectMenuHigh = ({selectedKeys,openKeys}) => {
        this.setState({
            selectedKeys,
            openKeys 
        })
    }

    // 一级菜单
    renderMenu = ( { key, title } ) => {
        return(
            <Menu.Item  key={key}> 
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
        const { selectedKeys, openKeys } = this.state
        const { collapsed } = this.props
        return(
            <div className='aside-warp'>
                <p className= {collapsed ? 'logo close' : 'logo'}>{collapsed ? 'Admin' : 'React-Admin'}</p>
                <Menu
                    onOpenChange={this.onOpenChange}
                    onClick={this.menuClick}
                    theme='dark'
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
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

export default withRouter(Aside)