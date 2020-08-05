import React, { Component } from 'react'

// antd
import { Form, Input, Button, Radio, message, InputNumber } from 'antd';

// api
import { DepartmentAddApi, DetailApi, EditApi } from '../../api/department'
class AddDepartment extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            id: null,
        }
    }

    UNSAFE_componentWillMount = () => {
        if(this.props.location.state){
            this.setState({
                id: this.props.location.state.id
            })
        }
    }
    componentDidMount = () => {
        this.getDetail()
    }

    getDetail = () => {
        if( !this.props.location.state) return false
        DetailApi( {id: this.state.id} ).then(res => {
            // console.log(res.data.data)
            // const { name, status, number, content } = res.data.data
            // this.refs.form.setFieldsValue({
            //     name,
            //     status,
            //     number,
            //     content
            // })
            this.refs.form.setFieldsValue(res.data.data)
        })
    }

    // 表单提交
    onFinish = ( values ) => {
        this.setState({
            loading: true
        })
        if(!values.name){
            message.info('部门名称不能为空')
            this.setState({
                loading: false
            })
            return false
        }
        if(!values.content){
            message.info('请进行相关描述')
            this.setState({
                loading: false
            })
            return false
        }
        const requestAddData = values
        const requestEditData = {
            ...values,
            id: this.state.id
        }

        // id存在是编辑
        this.state.id ? this.onHandlerEdit(requestEditData) : this.onHandlerAdd(requestAddData)
    }

    // 添加信息
    onHandlerAdd = (requestData) => {
        DepartmentAddApi(requestData).then(res => {
            // console.log(res.data)
            message.success(res.data.message)
            this.refs.form.resetFields()
            this.setState({
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    // 编辑信息
    onHandlerEdit = (requestAddData) => {
        EditApi(requestAddData).then(res => {
            // console.log(res.data)
            message.success(res.data.message)
            this.refs.form.resetFields()
            this.setState({
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }


    render(){
        const { loading, id } = this.state
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 20 },
        };
        return(
            <>
               <Form 
                    ref = {'form'}
                    onFinish={this.onFinish} 
                    {...formItemLayout}
                >
                    <Form.Item name='name' label="部门名称">
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name='number' 
                        label="人员数量" 
                    >
                        <InputNumber min={0} max={100} precision={0}/>
                    </Form.Item>
                    <Form.Item 
                        initialValue={true} 
                        name='status' 
                        label="禁启用" 
                        rules={[{type: 'boolean'}]}
                    >
                        <Radio.Group >
                            <Radio value={false}>禁用</Radio>
                            <Radio value={true}>启用</Radio>
                        </Radio.Group>
                    </Form.Item>
                   
                    <Form.Item name= 'content' label="描述">
                        <Input.TextArea rows={5}/>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            loading={loading}
                        >
                           { id ? '修改' : '新增'}
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default AddDepartment