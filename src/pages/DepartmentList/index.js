import React, { Component } from 'react'
//
import {  Link } from 'react-router-dom';

// antd
import { Table, Button, Switch, Input, Form, message, Modal } from 'antd';

//api
import { GetDepartmentList, DeleteDepList, ForbidEnableApi } from '@api/department'

class DepartmentList extends Component{
    constructor(props){
        super(props)
        this.state = {
            // 搜索按钮开关
            searchFlag: false,
            tableLoading: false,
            // 开关
            flag: false,
            switchId: '',
            confirmLoading: false,
            id: '',
            visible: false,
            name: '',
            pageNumber: 1,
            pageSize: 10,
            selectedRowKeys: [],
            tableData: []
        }
    }

    componentDidMount = () => {
        this.getDepartmentListFun()
    }

    /* 
        删除modal框的控制 
    */
   // 确定按钮
   deleteModalOk = () => {
       this.setState({
        confirmLoading: true
       })
        const { id } = this.state
        if(!id ) return false;
        DeleteDepList({id}).then(res => {
            // console.log(res.data.data)
            message.success(res.data.message)
            this.getDepartmentListFun()
            this.setState({
                confirmLoading: false,
                visible: false,
                id: '',
                selectedRowKeys: []
            })
        })
   }
   // 取消按钮
   deleteModalCancel = () => {
    this.setState({
        visible: false
    })
   }

    // 获取部门列表
    getDepartmentListFun = () => { 
        this.setState({tableLoading: true})
        const { pageNumber, pageSize, name } = this.state
        const data = {
            pageNumber,
            pageSize
        }
        if(name) {
            data.name = name
        }
        GetDepartmentList(data).then(res => {
            const newData = res.data.data
            if(newData) {
                this.setState({
                    tableData: newData.data,
                    tableLoading: false,
                    searchFlag: false
                })
                // message.info('部门列表加载成功')
                this.refs.form.resetFields()
            }
            
        }).catch( err => {
            this.setState({ 
                tableLoading: false,
                searchFlag: false 
            })
        })
    }

    // 部门搜索
    onSerach = (values) => {
        // console.log(values)
        if(this.state.searchFlag) return false
        this.setState({
            searchFlag: true,
            name: values.name,
            pageNumber: 1,
            pageSize: 10
        })
        this.getDepartmentListFun()
    }

    // 复选框
    onCheckBox = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    // 禁启用
    handleClick = ( {id, status} ) => {
        // console.log(id,status)
        if(this.state.flag) return false
        /*  
            第一种做法，用组件本身的异步，loading的值通过判断switchId和record.id的一致性
        */
        this.setState({
            switchId: id  
        })
        /* 
            第二种做法, 自己做个开关
        */
    //    this.setState({flag: true})

        const requestData = {
            id,
            status: status === '1' ? false : true
        }
        // console.log('requestData:',requestData)
        ForbidEnableApi(requestData).then(res => {
            message.success(res.data.message)
            this.setState({switchId: null})
            // this.setState({flag: false})
            this.getDepartmentListFun()
        }).catch(err => {
            this.setState({switchId: null})
            // this.setState({flag: false})
        })
    }
    
    // 删除部门
    deleteDep = ({id}) => {
        const { selectedRowKeys } = this.state
        if(!id){ // 批量删除
            if(selectedRowKeys.length === 0) return false;
            id = selectedRowKeys.join()
        }
        console.log(id)
        this.setState({
            visible: true,
            id
        })
    }

    render(){
        const { tableData, confirmLoading, switchId, tableLoading } = this.state
        const rowSelection = {
            onChange: this.onCheckBox,
        };
        const columns = [
            {
              title: '部门名称',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: '禁启用',
              dataIndex: 'status',
              key: 'status',
              render: (text,record) => (
                <Switch 
                    loading={record.id === switchId}
                    defaultChecked= {record.status === '1' ? true: false}
                    checkedChildren="启用" unCheckedChildren="禁用"
                    onClick={() => this.handleClick(record)}
                />
              )
            },
            {
              title: '人员数量',
              dataIndex: 'number',
              key: 'number'
            },
            // {
            //     title: '描述',
            //     dataIndex: 'content',
            //     key: 'content',  
            //     width: 360
            // },
            {
                title: '操作',
                dataIndex: 'operate', 
                key: 'operate',
                width: 215,
                render: (text, record) => (
                    <div style={{display:'flex',justifyContent:"space-around"}}>
                        <Button type='primary'>
                            <Link to = {{ pathname: '/index/department/add',state: { id: record.id}}} >
                            {/* <Link to = {'/index/department/add?id=' + record.id}> */}
                            {/* <Link to ={{pathname: '/index/department/add', query: {id: record.id}}}> */}
                                编辑
                            </Link>
                        </Button>
                        <Button onClick = {() =>this.deleteDep(record)} >删除</Button>
                    </div>
                )
            }
        ];
        return(
            <>
                <Form ref = 'form' onFinish={this.onSerach} layout = 'inline' style={{marginBottom:"20px"}}>
                    <Form.Item label='部门名称' name='name'>
                        <Input placeholder='请输入部门名称'/>
                    </Form.Item>
                    <Form.Item >
                        <Button htmlType='submit' type='primary'>搜索</Button>
                    </Form.Item>
                </Form>
                <Table  
                    loading={tableLoading}
                    rowKey= 'id'
                    columns={columns} 
                    dataSource={tableData} 
                    bordered = {true}
                    rowSelection={rowSelection}
                />
                <Button onClick={this.deleteDep} style={{marginTop:'10px'}}>批量删除</Button>
                <Modal
                    title="删除提示"
                    visible={this.state.visible}
                    onOk={this.deleteModalOk}
                    onCancel={this.deleteModalCancel}
                    cancelText= '取消'
                    okText= '删除'
                    confirmLoading={confirmLoading}
                >
                    <p style={{textAlign:'center'}}>确定要删除此数据吗？<span style={{color:'red'}}>删除后无法恢复</span></p>
                </Modal>
            </>
        )
    }
}

export default DepartmentList