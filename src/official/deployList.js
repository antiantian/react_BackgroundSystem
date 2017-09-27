import React from 'react';
import {Select,  Input, Button, Table} from 'antd';
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}
class DeployList extends React.Component {
    render(){
        return (
            <div>
                <h2 className="deal-title">合作商配置列表</h2>
                <div className="example-input">
                    <Input size="large" placeholder="输入合作商编号" className="mineWidth" />
                    <Select labelInValue defaultValue={{ key: '0' }} style={{ width:140,verticalAlign:'middle',marginRight:10,}} onChange={handleChange}>
                        <Option value="0">请选择合作商组</Option>
                        <Option value="1">状态001</Option>
                    </Select>
                    <Select labelInValue defaultValue={{ key: '0' }} style={{ width: 140,verticalAlign:'middle',marginRight:10,}} onChange={handleChange}>
                        <Option value="0">请选择支付通道</Option>
                        <Option value="1">状态001</Option>
                    </Select>
                    <Select labelInValue defaultValue={{ key: '0' }} style={{ width: 140,verticalAlign:'middle',marginRight:10,}} onChange={handleChange}>
                        <Option value="0">请选择结算通道</Option>
                        <Option value="1">状态001</Option>
                    </Select>
                    <Select labelInValue defaultValue={{ key: '0' }} style={{ width:100,verticalAlign:'middle',marginRight:10,}} onChange={handleChange}>
                        <Option value="0">选择状态</Option>
                        <Option value="1">状态001</Option>
                    </Select>
                    <Button type="primary" icon="search" style={{marginRight:10}}></Button>
                    <Button icon="reload"></Button>
                </div>
                <Table columns={columns} dataSource={data} style={{marginTop:20}}/>
            </div>
        );
    }
}
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
};

const columns = [{
  title: '合作商编号',
  dataIndex: 'id',
}, {
  title: '合作商名称',
  dataIndex: 'merchantName',
}, {
  title: '所属组名',
  dataIndex: 'zuName',
},{
  title:'支付通道名称',
  dataIndex: 'name',
},{
  title:'结算通道名称',
  dataIndex: 'jsName',
},{
  title:'结算在途扣率',
  dataIndex: 'ztkl',
},{
  title:'在途固定扣率',
  dataIndex: 'gdkl',
},{
  title:'在途提现比例',
  dataIndex: 'txbl',
},{
  title:'结算开始时间',
  dataIndex:'startTime',
},{
  title:'结算结束时间',
  dataIndex:'overTime',
},{
  title:'全部商户结算限额',
  dataIndex:'all',
},{
  title:'单商户结算限额',
  dataIndex:'one',
},{
  title:'状态',
  dataIndex: 'state',
  render: text => <span style={{color:'#22BC22'}}>{text}</span>,
},{
  title:'操作',
  dataIndex: 'operation',
  render: text => <Button>{text}</Button>,
}];

const data = [{
  key: '1',
  id: 'G00001',
  merchantName: '钱橙的公司',
  zuName:'未归组',
  name:'未指定',
  jsName:'未指定',
  ztkl:1.000,
  gdkl:0.80,
  txbl:0.7,
  startTime:'09:00:00',
  overTime:'09:00:00',
  all:100000.00,
  one:100000.00,
  state:'启用',
  operation:'编辑',
}, {
  key: '2',
  id: 'G00001',
  merchantName: '钱橙的公司',
  zuName:'未归组',
  name:'未指定',
  jsName:'未指定',
  ztkl:1.000,
  gdkl:0.80,
  txbl:0.7,
  startTime:'09:00:00',
  overTime:'09:00:00',
  all:100000.00,
  one:100000.00,
  state:'启用',
  operation:'编辑',
}];

export default DeployList;