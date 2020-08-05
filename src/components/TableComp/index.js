import React, { Component } from 'react'

// antd
import { Table } from 'antd';

//api
import { TableList } from '@api/common'
import { requestUrl } from '@api/publicUrl';

class TableComp extends Component {
    constructor(props){
        super(props)
        this.state = {  
            //请求参数
            name: '',
            pageNumber: 1,
            pageSize: 10,

            // 表格data
            tableData: [],
            tableLoading: false
        }
    }

    componentDidMount = () => {
        // console.log(requestUrl[this.props.config.url])
        this.getDepartmentListFun()
    }
    

    // 获取部门列表
    getDepartmentListFun = () => { 
        const { pageNumber, pageSize } = this.state
        this.setState({tableLoading: true})
        // const data = {
        //     pageNumber,
        //     pageSize
        // }
        // if(name) {
        //     data.name = name
        // }
        const requestData = {
            url: requestUrl[this.props.config.url],
            method: 'post',
            data: {
                pageNumber,
                pageSize
            }
        }

        TableList(requestData).then(res => {
            const newData = res.data.data
            if(newData) {
                this.setState({
                    tableData: newData.data,
                    tableLoading: false
                })
            }
            
        }).catch( err => {
            this.setState({tableLoading: false})
        })
    }
    /* 
        复选框
    */
    onCheckBox = (selectedRowKeys) => {
        // this.setState({ selectedRowKeys });
        console.log(selectedRowKeys)
    }


    render(){
        const { thead, checkbox, rowKey } = this.props.config
        const { tableData, tableLoading } = this.state
        const rowSelection = {
            onChange: this.onCheckBox,
        };
        return(
            <>
                <Table  
                    loading={tableLoading}
                    rowKey= {rowKey || "id"}
                    columns={thead} 
                    dataSource={tableData} 
                    bordered = {true}
                    rowSelection={ checkbox ? rowSelection : null}
                />
            </>
        )
    }
}

export default TableComp