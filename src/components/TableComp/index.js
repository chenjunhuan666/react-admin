import React, { Component } from 'react'

// 类型检测
import  PropTypes from 'prop-types'

// scss
import './index.scss'

// antd
import { Table, Pagination, Row, Col, Button } from 'antd';

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
        this.props.onRef(this)
    }
    

    // 获取部门列表
    getDepartmentListFun = (data) => { 
        const { pageNumber, pageSize } = this.state
        this.setState({tableLoading: true})
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
        if(data){
            requestData.data.name = data
        }

        TableList(requestData).then(res => {
            const newData = res.data.data
            if(newData) {
                this.setState({
                    tableData: newData.data,
                    tableLoading: false
                })
                // 控制父组件serachFlag开关的值
                this.props.sonSetSearchFlag()
            }
            
        }).catch( err => {
            this.setState({tableLoading: false})
            // 控制父组件serachFlag开关的值
            this.props.sonSetSearchFlag()
        })
    }
    /* 
        复选框
    */
    onCheckBox = (selectedRowKeys) => {
        this.props.sonToCheck(selectedRowKeys)
    }

    /* 
        分页跳转
    */
    onChangeCurrentPage = (page, pageSize) => {
        this.setState({
            pageNumber: page
        }, () => this.getDepartmentListFun())
    }
    onChangeSizePage = (current, size) => {
        this.setState({
            pageNumber: current,
            pageSize: size
        }, () => this.getDepartmentListFun())
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
                    pagination={false}
                />
                <Row>
                    <Col span={13}> 
                        {this.props.batchButton && <Button style={{marginTop:'10px'}}>批量删除</Button>} 
                    </Col>
                    <Col span={11}>
                        <Pagination
                            className='table-pagination'
                            // total={tableData && tableData.length}
                            total={20}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                            onChange={this.onChangeCurrentPage}
                            onShowSizeChange= {this.onChangeSizePage}
                            defaultCurrent={1}
                        />
                    </Col>
                </Row>
                
            </>
        )
    }
}
// 校验类型
TableComp.proptype = {
    config: PropTypes.object
}
// 默认值
TableComp.defaultProps = {
    batchButton: false  // 父组件有定义batchButton的值就用，外部无定义就是默认false
}
export default TableComp