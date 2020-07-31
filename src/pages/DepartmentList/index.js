import React, { Component } from 'react'

// antd
import { Table, Button, Switch, Input, Form, message } from 'antd';

//api
import { GetDepartmentList, DeleteDepList } from '@api/department'

class DepartmentList extends Component{
    constructor(props){
        super(props)
        this.state = {
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

    // 获取部门列表
    getDepartmentListFun = () => { 
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
                    tableData: newData.data
                })
                message.info('部门列表加载成功')
                this.refs.form.resetFields()
            }
            
        }).catch( err => {
            
        })
    }

    // 部门搜索
    onSerach = (values) => {
        // console.log(values)
        this.setState({
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
    click = ( text, record ) => {
        console.log(record)
    }
    
    // 删除
    deleteDep = ({id}) => {
        if(!id ) return false;
        DeleteDepList({id}).then(res => {
            console.log(res.data.data)
            message.success(res.data.message)
            this.getDepartmentListFun()
        })
    }

    render(){
        const { tableData  } = this.state
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
                    defaultChecked= {record.status === '1' ? true: false}
                    checkedChildren="启用" unCheckedChildren="禁用"
                    onClick={() => this.click(text,record)}
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
                render: (rext, record) => (
                    <div style={{display:'flex',justifyContent:"space-around"}}>
                        <Button type='primary'>编辑</Button>
                        <Button onClick = {() =>this.deleteDep(record)}>删除</Button>
                    </div>
                )
            }
        ];
        return(
            <>
                <Form ref = 'form'onFinish={this.onSerach} layout = 'inline' style={{marginBottom:"20px"}}>
                    <Form.Item label='部门名称' name='name'>
                        <Input placeholder='请输入部门名称'/>
                    </Form.Item>
                    <Form.Item >
                        <Button htmlType='submit' type='primary'>搜索</Button>
                    </Form.Item>
                </Form>
                <Table  
                    rowKey= 'id'
                    columns={columns} 
                    dataSource={tableData} 
                    bordered = {true}
                    rowSelection={rowSelection}
                />
                <Button>批量删除</Button>
            </>
        )
    }
}

export default DepartmentList