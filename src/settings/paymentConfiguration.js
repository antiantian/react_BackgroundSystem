import React, { Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm,Row,Col,message,Pagination,Spin,Select } from 'antd';
import {hashHistory} from 'react-router';
import AddPaymentConfiguration from './addPaymentConfiguration';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {TableCommon}  from '../common/resetAntd.js';
import {Open_disable,addEditParams,initListState} from '../common/util.js';
const Option = Select.Option;
function statusText(text){
  if(text==0){
    return '启用';
  }
   if(text==1){
    return '禁止';
  }
}
class PaymentConfiguration extends React.Component {
  constructor(props) {
      super(props)
      this.stateArray=['status','current','pageSize'],
      this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
      this.initListState=initListState;
      this.state={
       total:'',
        data:[],
        name:'',
        payCode:'',
        method:'',
        type:'',
        current: 1,
        pageSize: 10,
        status:'-1',
       }
    }
   componentDidMount() {
    this.initListState(this.BalancePost,this.stateArray)
  }
  BalancePost = (pageSize, page) => {
    var obj={
      url:api.resourcePath+api.getTypeMethodList,
      jsonp:{
      token:localStorage.cok,
      numPerPage:this.state.pageSize ,
      pageNum:this.state.current,
      type:3,
      isPage:1,
      status:this.state.status,
      adminId:localStorage.loginId
      },
    func200:(json)=>{
       global.token = json.token;
          this.setState({
            loading: false,
            data: json.data,
            totalAmount:json.data[0].sumAmount,
            total: json.data[0].sumNum,                          
          })
    },
     func201:(json)=>{
           this.setState({
            data: [],
          })  
        }
    }
      newfetch(obj)   
  }
 resetBtn=()=>{
    this.setState({
      status:'-1',
      pageSize:10,
      current:1
    },()=>{
      this.BalancePost();
    });
  }
 //添加
  addBotton=(text,record, index)=>{
    this.addEditParams('/addPaymentConfiguration',0,this.stateArray) 
  }
  //删除
  onDelete=(text,record,index)=>{
    const DelDataSource = this.state.data;
      const obj={
        url:api.resourcePath+api.delPayConfig,
        jsonp:{
          token:localStorage.cok,
          payCode:record.payCode,
          adminId:localStorage.loginId,
        },
        func200:(json)=>{
          message.info('请求成功');
          DelDataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
          this.setState({
          data:DelDataSource,
          })
         },
    }
    newfetch(obj)
      }
  render() {
     const  columns = [{
      title: '名称',
      dataIndex: 'name',
      width: 100,
      fixed: 'left'
    },
    {
      title: '编码',
      dataIndex: 'payCode',
      width: 100,
      fixed: 'left'
    },
     {
      title: '支付方式',
      dataIndex: 'method',
    },
     {
      title: '支付类型',
      dataIndex: 'type',
    },
     {
      title: '启用',
      dataIndex: 'status',
      render: text => <span style={{color:text===0?'green':'red'}}>{statusText(text)}</span>
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) =>
           <div>
             <Button style={{backgroundColor:'#F4F4f4',marginRight:'10px'}} onClick={()=>{ 
                 this.addEditParams('/addPaymentConfiguration',1,this.stateArray,record)
               }}>编辑</Button>

            <Popconfirm title="真的要删除吗?"
             onConfirm={()=>this.onDelete(text,record,index)}
             >
                <Button type="danger">删除</Button>               
            </Popconfirm>
           </div>                
    }];
    return (
      <div>
        <h2 style={{marginBottom:20}}>
           <Row type="flex" justify="space-between">
              <Col span={12} style={{fontSize:'16px',fontWeight:'700'}}>支付配置</Col>
               <Col span={12} style={{textAlign:'right'}}><Button type="primary" icon="plus"  onClick={this.addBotton}>添加</Button></Col>
          </Row>
        </h2>
        <div className="example-input">
          <Select  size={'large'} defaultValue={this.state.status} value={this.state.status} style={{ width: 110,verticalAlign:'middle',marginRight:10,}} onChange={this.handleChangeStatus}>
              <Option value="-1">全部</Option>
              <Option value="0">启用</Option>
              <Option value="1">禁止</Option>
          </Select>
          <Button type="primary" icon="search" style={{marginRight:10}} onClick={this.BalancePost}></Button>
          <Button icon="reload"  onClick={this.resetBtn}></Button>
       </div>
        <TableCommon 
               onShowSizeChange={this.onShowSizeChange}  
               onChangePage={this.onChangePage}
               columns={columns}
               currentpage={this.state.current}
               currentpageSize={this.state.pageSize}
               data={this.state.data}
               scroll={{ x: true }} 
               total={this.state.total}
               load={this.state.loading}
               style={{marginTop:"20px"}}
            /> 
      </div>
    );
  }
  handleChangeStatus=(value)=>{
   this.setState({
      status:value
    })  
  }
  onChangePage=(page, pageSize)=>{
     this.pageCurrentC(page, pageSize)
     }
     onShowSizeChange=(current, size)=>{
      this.pageCurrentC(current, size)
    }
    pageCurrentC=(page, pageSize)=>{
        this.setState({
          current: page,
          pageSize:pageSize
        },()=>{
          this.BalancePost()
        });
    } 

}
export default PaymentConfiguration;