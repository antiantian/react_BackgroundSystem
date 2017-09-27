import React, { Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm,Row,Col,message,Pagination,Spin,Modal} from 'antd';
import {hashHistory} from 'react-router';
import AddPaymentChannel from './addPaymentChannel';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {Open_disable,addEditParams,initListState} from '../common/util.js';
import {TableCommon,NewSelect}  from '../common/resetAntd.js';
let columns={};
class PaymentChannel extends React.Component {
   constructor(props) {
     super(props)
      this.state={
         total:0,
         data:[],
         current: 1,
         pageSize:10,
         preCode:'',
         modal2Visible:false,
         newpayCode:null,
         newpayName:null,
         name:''
       }
     this.stateArray=['name','current','pageSize'],
     this.addEditParams=addEditParams; //一定要使用this 否则不会绑定到当前的组建属性等
     this.initListState=initListState;
     columns.push(
         {
          title:'操作',
          dataIndex: 'operation',
          width:200,
          render:(text, record, index) =><div>
          <Button type="primary" onClick={()=>{
            this.addEditParams('/addPaymentChannel',1,this.stateArray,record)
          }}>编辑</Button>
          <Button onClick={() => {
                    this.ModalShow(record.channelCode)  
                }   
            } style={{marginLeft:'10px'}}>通道拷贝</Button>
            </div>,
        }
      )
  }
   ModalShow=(name)=>{
     this.setState({
        preCode:name, //唯一Id
        modal2Visible:true
     })
  }
  componentWillUnmount(){
    //移除最后一个  因为会重新添加
    columns.pop();
  }
  componentDidMount() {
    this.initListState(this.BalancePost,this.stateArray)
  }
  BalancePost = () => {
     var objectJson={
        token:localStorage.cok,
        name:this.state.name,
        numPerPage:this.state.pageSize,
        pageNum:this.state.current
    }
    changeID(objectJson);
    var obj={
      url:api.resourcePath+api.getPayChanList,
      jsonp:objectJson,
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
            total: 0,
            data: [],
            loading: false,
          })
      }
    }
    newfetch(obj)
  }
  resetBtn=()=>{
    this.setState({
      name:'',
      pageSize:10,
      current:1
    },()=>{
      this.BalancePost();
    });
  }
  addBotton=()=>{ 
     this.addEditParams('/addPaymentChannel',0,this.stateArray,null)
  }
 render() {
   return (
    <div>
        <Button type="primary" icon="plus" className="qc-add-list" onClick={this.addBotton}>添加</Button>
        <h2 className="deal-title">支付通道</h2>
       <div className="example-input">
          <Input size="large" placeholder="支付通道编号" name="name" value={this.state.name} onChange={this.onChangeInput} className="mineWidth" />
          <Button type="primary"  onClick={this.BalancePost} icon="search" style={{marginRight:10}}></Button>
          <Button icon="reload" onClick={this.resetBtn}></Button>
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
        <Modal
          title="通道拷贝"
          wrapClassName="vertical-center-modal"
          visible={this.state.modal2Visible}
          onOk={() => this.resetlModal()}
          onCancel={() => this.cancelModal()}
         >
          <Row gutter={20} type="flex" justify="center">
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                <div>通道编号</div>
              </Col>  
               <Col span={16} style={{marginBottom:'20px'}}>
                    <Input   
                    size="large" 
                    placeholder="请输入通道编号"
                    name="newpayCode"
                    onChange={this.onChangeAll}
                    value={this.state.newpayCode} 
                    />
                </Col>
          </Row>
          <Row gutter={20} type="flex" justify="center">
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                <div>通道名称</div>
              </Col>  
               <Col span={16} style={{marginBottom:'20px'}}>
                    <Input   
                    size="large" 
                    placeholder="请输入通道名称"
                    name="newpayName"
                    onChange={this.onChangeAll}
                    value={this.state.newpayName}
                    />
                </Col>
        </Row>
        </Modal>
     </div>
    )
  }
  onChangeAll=(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
    });
  }
  resetlModal=()=>{
         this.resetMerchantPwd(this.state.newpayCode,this.state.newpayName)       
   }
   resetMerchantPwd=(nowCode,nowName)=>{
      if(!nowName){
         message.warning('通道名称不能为空')
      }else if(!nowCode){
        message.warning('通道编号不能为空')
      }else{
         var objectJson={
            token:localStorage.cok,
            copyCode:this.state.preCode,
            code:nowCode,  //编码
            name:nowName,  //名称
        }
        changeID(objectJson);
        var obj={
          url:api.resourcePath+api.copyPayChan,
          jsonp:objectJson,
          func200:(json)=>{
              global.token = json.token;
              this.BalancePost();
              message.success('通道拷贝成功');
              this.setState({
                modal2Visible:false,
                newpayCode:null,
                newpayName:null,
                preCode:'',
              })
          }
        }
        newfetch(obj)
      }
   }
   cancelModal=()=>{
     this.setState({
        modal2Visible:false
     })  
   }
  onChangeInput = (e)=>{
      this.setState({ [e.target.name]:e.target.value });
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
columns = [
  { title: '名称', dataIndex: 'name', key: 'name'},
  { title: '通道编号', dataIndex: 'channelCode', key: 'channelCode'},
  { title: '开始时间',dataIndex: 'start', key: 'start'},
  { title: '结束时间', dataIndex: 'end', key: 'end'},
  { title: '状态', 
    dataIndex: 'status', 
    key: 'status',
    render: (text, record, index) => <span style={{color:text===0?'green':'red'}}>{Open_disable(text)}</span>
  }];
export default PaymentChannel;

const datas= [{
        "key": 1,
        "channelCode": "express_d0",
        "name": "新易联33333",
        "start": "08:00",
        "end": "22:00",
        "status": 0,
        "chanRates": [{
            "rate": "0.0033",
            "fee": "0.6",
            "key": 1,
            "name": "express_d0",
            "minTransaction": "10",
            "maxTransaction": "20000",
            "creditRate": "0.0033",
            "fakeRate": "0.0033",
            "allowCredit": true,
            "autoD0": true,
            "d0Rate": null,
            "d0Fee": null
        }],
        "chanConfigs":{
            "key": 1,
            "name": "express_d0",
            "appId": null,
            "account": null,
            "endpoint": null,
            "notifyUrl": null,
            "privateKey": null,
            "publicKey": null,
            "dataKey": null,
            "signKey": null
        },
        "sumNum": 3
    },
    {
        "key": 2,
        "channelCode": "payeco_a",
        "name": "易联A",
        "start": "09:00",
        "end": "21:00",
        "status": 0,
        "chanRates": [{
            "rate": "0.0028",
            "fee": null,
            "key": 1,
            "name": "express_t1",
            "minTransaction": "10",
            "maxTransaction": "20000",
            "creditRate": "0.0038",
            "fakeRate": null,
            "allowCredit": true,
            "autoD0": false,
            "d0Rate": null,
            "d0Fee": null
        }],
        "chanConfigs": {
            "key": 1,
            "name": "express_t1",
            "appId": null,
            "account": null,
            "endpoint": null,
            "notifyUrl": null,
            "privateKey": null,
            "publicKey": null,
            "dataKey": null,
            "signKey": null
        },
        "sumNum": 3
    },
    {
        "key": 3,
        "channelCode": "tftpay",
        "name": "腾付通",
        "start": "09:00",
        "end": "21:00",
        "status": 0,
        "chanRates": [{
            "rate": "0.0040",
            "fee": null,
            "key": 1,
            "name": "express_t1",
            "minTransaction": "10",
            "maxTransaction": "20000",
            "creditRate": "0.0040",
            "fakeRate": null,
            "allowCredit": true,
            "autoD0": false,
            "d0Rate": null,
            "d0Fee": null
        },
        {
            "rate": "0.0026",
            "fee": null,
            "key": 2,
            "name": "gateway",
            "minTransaction": "10",
            "maxTransaction": "50000",
            "creditRate": null,
            "fakeRate": null,
            "allowCredit": false,
            "autoD0": false,
            "d0Rate": null,
            "d0Fee": null
        }],
        "chanConfigs":{
            "key": 1,
            "name": "express_t1",
            "appId": null,
            "account": null,
            "endpoint": null,
            "notifyUrl": null,
            "privateKey": null,
            "publicKey": null,
            "dataKey": null,
            "signKey": null
        },
        "sumNum": 3
    }]