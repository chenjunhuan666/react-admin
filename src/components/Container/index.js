import React, { Component } from 'react'
import { Switch, HashRouter } from 'react-router-dom'

// 组件
import AddDepartment from '../../pages/AddDepartment/index'
import AddPost from '../../pages/AddPost/index'
import AddUser from '../../pages/AddUser/index'
import ControlConsole from '../../pages/ControlConsole/index'
import DepartmentList from '../../pages/DepartmentList/index'
import Leave from '../../pages/Leave/index'
import ExtraWork from '../../pages/ExtraWork/index'
import PostList from '../../pages/PostList/index'
import UserList from '../../pages/UserList/index'

// 私有路由组件
import PrivateRouter from '../../privateRouter/index'

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