import React, { Component } from 'react'

// antd
import { Form, Input, Button, Radio, message, InputNumber } from 'antd';

// api
import { DepartmentAddApi } from '../../api/department'
class AddDepartment extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }
    onFinish = ( values ) => {
        this.setState({
            loading: true
        })
        if(!values.name){
            message.info('部门名称不能为空')
            return false
        }
        if(!values.content){
            message.info('请进行相关描述')
            return false
        }
        const requestData = values
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
    
    render(){
        const { loading } = this.state
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
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default AddDepartment