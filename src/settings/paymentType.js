import React, { Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm,Row,Col,Spin,Pagination,message } from 'antd';
import {api} from '../config.js';
import newfetch from '../common/fetch.js';
import {hashHistory} from 'react-router';
import {TableCommon}  from '../common/resetAntd.js';
import {Open_disable,addEditParams,initListState} from '../common/util.js';
class PaymentType extends React.Component {
   constructor(props) {
    super(props);
    this.stateArray=['current','pageSize'],
    this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
    this.initListState=initListState;
    this.state = {
    data:[],
    current: 1,
    total: '',
    name:'',
    type:'',
    pageSize:10,
    }
  }
  componentDidMount() {
    this.initListState(this.BalancePost,this.stateArray)
  }

  BalancePost = () => {
    var obj={
      url:api.resourcePath+api.getTypeMethodList,
      jsonp:{
      token:localStorage.cok,
      numPerPage:this.state.pageSize ,
      pageNum:this.state.current,
      type:2,
      isPage:1, //不分页
      status:-1,
      adminId:localStorage.loginId
      },
      func200:(json)=>{
         global.token = json.token;
            this.setState({
              loading: false,
              data: json.data,
              total: json.data[0].sumNum,                          
            })
      },
       func201:(json)=>{
             this.setState({
              data: [],
              loading: false,
              total:0,
            })  
          }
    }
   newfetch(obj)   
  }

  //删除
  // onDelete(text,record,index){
  //   const DelDataSource = this.state.data;
  //   var obj={
  //     url:api.resourcePath+api.delPayMethod,
  //     jsonp:{
  //       token:localStorage.cok,
  //       type:record.type,
  //       adminId:localStorage.loginId,
  //     },
  //     func200:(json)=>{
  //       message.info('请求成功');
  //       DelDataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
  //       this.setState({
  //       data:DelDataSource,
  //       })
  //     },
  //     func201:(json)=>{
  //       this.setState({
  //           data: [],
  //        })
  //     }
  //   }
  //   newfetch(obj)
  // } 
     render() {
      let self = this;
      const columns = [
      { title: '名称', width: '30%', dataIndex: 'name', key: 'name', },
      { title: '编码',width: '30%', dataIndex: 'type', key: '1' },
      {
        title: '操作',
        key: 'operation',
         render: (text, record, index) => 
               <div>
                 <Button style={{backgroundColor:'#F4F4f4',marginRight:'10px'}} onClick={()=>{
                  this.addEditParams('/addPaymentType',1,this.stateArray,record)    
                   }}>编辑</Button>
                {/* <Popconfirm title="真的要删除吗?" 
                onConfirm={()=>self.onDelete(text,record,index)}
                >
                <Button type="danger">删除</Button>               
                </Popconfirm> */}
               </div>                
     }];

      return (
        <div>
            <h2 style={{marginBottom:20}}>
               <Row type="flex" justify="space-between">
                  <Col span={12} style={{fontSize:'16px',fontWeight:'700'}}>支付类型</Col>
                   <Col span={12} style={{textAlign:'right'}}><Button type="primary" icon="plus" className="editable-add-btn" onClick={()=>{
                      this.addEditParams('/addPaymentType',0,this.stateArray)
                   }}>添加</Button></Col>
              </Row>
           </h2>
           <TableCommon 
               columns={columns}
               data={this.state.data}
               scroll={{ x: true }} 
               total={this.state.total}
               load={this.state.loading}
               style={{marginTop:"20px"}}
               nopaging={true}
            /> 
          </div>
        )  

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

export default PaymentType;