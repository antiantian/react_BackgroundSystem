import React, { Component } from 'react';
import {Row, Col,Input,Button,Radio,Icon,Table } from 'antd';

const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
  width:"500px"
}, {
  title: '缩写',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '编码',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '真实编码',
  key: 'action',
  render: (text, record) => (
    <span>
    <Input type="text" />
    </span>
  ),
  width:"200px"
}];

const data = [{
  key: '1',
  name: '中国农业银行',
  age: "ABC",
  address: '103',
  defaul:'1002',
}, {
  key: '2',
  name: '中国建设银行',
  age: 'CCB',
  address: '105',
  defaul:'1003',
}, {
     key: '3',
 name: '中国建设银行',
  age: 'CCB',
  address: '105',
},
{
 key: '4',
 name: '中国建设银行',
  age: 'CCB',
  address: '105',
},
{
 key: '5',
 name: '中国建设银行',
  age: 'CCB',
  address: '105',
},
{
 key: '6',
 name: '中国建设银行',
  age: 'CCB',
  address: '105',
},
{
 key: '7',
 name: '中国建设银行',
  age: 'CCB',
  address: '105',
},
{
 key: '8',
 name: '中国建设银行',
  age: 'CCB',
  address: '105',
},
];
class Bankleitzahl extends Component {
 render(){
return(
    <div className='siteSettings '>
        <h2>银行编码设置</h2>
       <Table 
        pagination={false}
        columns={columns} 
        dataSource={data} />  
        <div ><Button style={{backgroundColor:"#E6E6E6",marginTop:'10px'}}>更新</Button></div>
    </div>
)
 }

}

export default Bankleitzahl;