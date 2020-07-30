import React, { Component } from 'react'
import { Switch, HashRouter } from 'react-router-dom'

// 组件
import ControlConsole from '../../pages/ControlConsole/index'
import AddDepartment from '../../pages/DepartmentAdd/index'
import DepartmentList from '../../pages/DepartmentList/index'
import AddPost from '../../pages/PostAdd/index'
import PostList from '../../pages/PostList/index'
import AddUser from '../../pages/UserAdd/index'
import UserList from '../../pages/UserList/index'
import Leave from '../../pages/Leave/index'
import ExtraWork from '../../pages/ExtraWork/index'

// 私有路由组件
import PrivateRouter from '../../privateRouter/index'

/* 自动化工程 */
// import components from './components'


class Container extends Component{
    constructor(props){
        super(props)
        this.state = {

        } 
    }

    render(){
        return(
            <HashRouter>
                <Switch>
                    {/* 自动化导入 */}
                        {/* {
                            components.map(item => {
                                return <PrivateRouter exact key={item.path} component={item.component}  path={item.path} />
                            })
                        } */}
                    <PrivateRouter exact component={AddDepartment}  path='/index/department/add'/>
                    <PrivateRouter exact component={AddPost}  path='/index/post/add'/>
                    <PrivateRouter exact component={AddUser}  path='/index/user/add'/>
                    <PrivateRouter exact component={ControlConsole}  path='/index'/>
                    <PrivateRouter exact component={DepartmentList}  path='/index/department/list'/>
                    <PrivateRouter exact component={Leave}  path='/index/leave'/>
                    <PrivateRouter exact component={ExtraWork}  path='/index/extrawork'/>
                    <PrivateRouter exact component={PostList}  path='/index/post/list'/>
                    <PrivateRouter exact component={UserList}  path='/index/user/list'/>
                </Switch> 
            </HashRouter>
        )
    }
}

export default Container