import React,{Component} from 'react';
import { Table, Button, Row, Col,Tabs} from 'antd';
import { hashHistory } from 'react-router';
import moment from 'moment';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {messParams,messChildParams,returnAddEdit,statusText,changeCodeName,yesOno} from './../common/util';
const TabPane = Tabs.TabPane;
function callback(key) {  
  console.log(key);
}

class DealDetals extends React.Component {
  constructor(props) {
    super(props);
    this.returnAddEdit=returnAddEdit;
    this.state = {
      merchantNo:'',
      merchantOrderNo: '',//商户订单号
      orderNo: '',//平台订单号
      update: '',//更新
      Status:0,
      orderExts:[],
      payMerchantRate:[],
      agencyRate:[],
      payChannelRateText:[],
      merchantConfigText:[],
      merchantRequestText:[],
      feeText:[],
      updateDetails:[],
      channelOrderNo:'',
      channelCode:'',
      payConfigCode:'',
      settlementType:'',
      desc:'',
      agencyNo:'',
      paraId:this.props.params.id,
      channelCodeName:[]
    }
  }
  componentDidMount() {
    this.details();
    this.getchannelCode();
  }
  getchannelCode = () => {
    const obj = {
      url: api.resourcePath + api.getPayChanList,
      jsonp: {
        token: localStorage.cok,
        isPage: 1,
        adminId: localStorage.loginId,
      },
      func200: (json) => {
        if (json.data && json.data.length > 0) {
          this.setState({
            channelCodeName:json.data
          });  
        }
      }
    }
    newfetch(obj)
  }
  details() {
    const obj={
      url:api.resourcePath+api.paymentOrderInfo,
      jsonp:{
        token:localStorage.cok,
        adminId:localStorage.loginId,
        orderNo:this.state.paraId
      },
      func200:(json)=>{
           var data = json.data;
            this.setState({
            merchantNo:data.merchantNo,
            merchantOrderNo: data.merchantOrderNo,
            orderNo: data.orderNo,
            orderExts:json.data.orderExts,
            payMerchantRate:json.data.payMerchantRate,
            agencyRate:json.data.agencyRate,
            payChannelRateText:json.data.payChannelRateText,
            merchantConfigText:json.data.merchantConfigText,
            merchantRequestText:json.data.merchantRequestText,
            feeText:json.data.feeText,
            channelOrderNo:data.channelOrderNo,
            channelCode:data.channelCode,
            payConfigCode:data.payConfigCode,
            settlementType:data.settlementType,
            desc:data.desc,
            agencyNo:data.agencyNo,
            updateDetails:data.updateDetails,
            createDate:data.createDate,
            finishDate:data.finishDate,
            payType:data.payType,
            amount:data.amount,
            fee:data.fee,
            status:data.status,
          })
      }
    }
    newfetch(obj)
  }
  render() {
    return (
      <div>
        <h2 className="titleName" style={{ marginBottom: 15 }}>交易详情
          <Button onClick={
               ()=>this.returnAddEdit('/layout')
             } style={{float:'right'}}>
             返回
          </Button>
        </h2>
        <Row style={{ marginBottom: 10, fontSize: 15 }}>
           <Col span={8}>平台订单号：{this.state.orderNo}</Col>
           <Col span={8}>商户订单号：{this.state.merchantOrderNo}</Col>
           <Col span={8}>商户号：{this.state.merchantNo}</Col>
        </Row>
        <Row style={{ marginBottom: 10, fontSize: 15 }}>
           <Col span={8}>合作商编号：{this.state.agencyNo}</Col>
           <Col span={8}>通道订单号：{this.state.channelOrderNo}</Col> 
           <Col span={8}>通道名称：{changeCodeName(this.state.channelCode,this.state.channelCodeName)}</Col>
        </Row>      
        <Row style={{ marginBottom: 10, fontSize: 15 }}> 
           <Col span={8}>创建时间：{this.state.createDate}</Col>
           <Col span={8}>支付时间：{this.state.finishDate}</Col>
           <Col span={8}>交易类型：{this.state.payType}</Col>
         </Row>      
         <Row style={{ marginBottom: 10, fontSize: 15 }}>     
           <Col span={8}>交易金额：{this.state.amount}</Col>
           <Col span={8}>手续费：{this.state.fee}</Col>
           <Col span={8}>交易状态：{statusText(this.state.status)}</Col>
         </Row>
         <Row style={{ marginBottom: 10, fontSize: 15 }}>   
           <Col span={8}>描述：{this.state.desc}</Col>  
           <Col span={8}>结算类型：{this.state.settlementType}{this.state.settlementType=='1'?'自动代付':this.state.settlementType=='0'?'余额':''}</Col>
         </Row>
          <Tabs onChange={callback} type="card">
           <TabPane tab="订单额外信息" key="1"><Table dataSource={this.state.orderExts} columns={orderExts} pagination={false}/></TabPane>
           <TabPane tab="支付商户扣率" key="2"><Table dataSource={this.state.payMerchantRate} columns={payMerchantRate} pagination={false}/></TabPane>
           <TabPane tab="合作商扣率" key="3"><Table dataSource={this.state.agencyRate} columns={agencyRate} pagination={false}/></TabPane>
           <TabPane tab="支付类型通道扣率" key="4"><Table dataSource={this.state.payChannelRateText} columns={payChannelRateText} pagination={false}/></TabPane>
           <TabPane tab="商户信息配置" key="5"><Table dataSource={this.state.merchantConfigText} columns={merchantConfigText} pagination={false}/></TabPane>
           <TabPane tab="商户请求信息" key="6"><Table dataSource={this.state.merchantRequestText} columns={merchantRequestText} pagination={false}/></TabPane>
           <TabPane tab="手续费信息" key="7"><Table dataSource={this.state.feeText} columns={feeText} pagination={false}/></TabPane>
           <TabPane tab="更新纪录" key="8"><Table dataSource={this.state.updateDetails} columns={updateDetails} pagination={false}/></TabPane>
        </Tabs>
      </div>
    )
  }
}
export default DealDetals;

const agencyRateinner=[{
  title: '手续费',
  dataIndex: 'fee',
},{
  title: '费率',
  dataIndex: 'rate',
}, {
  title: '最小限额',
  dataIndex: 'minTransaction',
},{
 title: '最大限额',
  dataIndex: 'maxTransaction',
},{
 title: 'd0费率',
  dataIndex: 'd0Rate',
},{
 title: 'd0手续费',
  dataIndex: 'd0Fee',
},{
  title: '是否使用信用卡',
  dataIndex: 'allowCredit',
  render: (text, record, index) => <span>{yesOno(text)}</span>
}];
class Createul extends Component{
  render(){
      const lis=agencyRateinner.map((item,index)=>
        <li key={index}>
           <p>
            <span>
             {item.title}
            </span>
            {item.dataIndex==='allowCredit'?
            this.props.item[item.dataIndex]:
            yesOno(this.props.item[item.dataIndex])
           }
           </p>
        </li>
      )
    return(
       <ul className='inner-tableul'>
          {lis}
       </ul>
    )
  }
}

const orderExts =[{
  title: '姓名',
  dataIndex:'name',
},{
   title: '电话',
  dataIndex: 'phone',
},{
   title: '身份证号码',
  dataIndex: 'idCard',
},{
  title: '银行卡号',
  dataIndex: 'bankCard',
}]
/*
,{
  title: '有效期',
  dataIndex: 'expirationDate',
},{
  title: '授权码',
  dataIndex: 'cvn2',
},{
  title: 'XXX',
  dataIndex: 'smId',
}
*/
const payMerchantRate=[{
   title: '是否使用信用卡',
  dataIndex: 'allowCredit',
  render: (text, record, index) => <span>{yesOno(text)}</span>
},{
   title: '费率',
  dataIndex: 'rate',
},{
   title: '手续费',
  dataIndex: 'fee',
},{
   title: '每笔最小交易额',
  dataIndex: 'minTransaction',
},{
   title: '每笔最大交易额',
  dataIndex: 'maxTransaction',
}]
const agencyRate=[{
   title: '费率',
  dataIndex: 'rate',
},{
   title: '手续费',
  dataIndex: 'fee',
},{
   title: '每笔最小交易额',
  dataIndex: 'minTransaction',
},{
   title: '每笔最大交易额',
  dataIndex: 'maxTransaction',
},{
   title: 'autoD0',
  dataIndex: 'autoD0',
  render: (text, record, index) => <span>{yesOno(text)}</span>
}
]
/*
,{
  title: 'defaultSaleRate',
  dataIndex: 'defaultSaleRate',
  render: (text, record, index) =>  <span>{JSON.stringify(record.defaultSaleRate)}</span>
}
*/
const payChannelRateText=[{
   title: '费率',
   dataIndex: 'rate',
},{
   title: '手续费',
  dataIndex: 'fee',
},{
   title: '每笔最小交易额',
  dataIndex: 'minTransaction',
},{
   title: '每笔最大交易额',
  dataIndex: 'maxTransaction',
},{
  title: '信用卡费率',
  dataIndex: 'creditRate',
},{
  title: '名义费率',
  dataIndex: 'fakeRate',
},{
  title: '是否使用信用卡',
  dataIndex: 'allowCredit',
  render: (text, record, index) => <span>{yesOno(text)}</span>
},{
  title: '是否自动D0',
  dataIndex: 'autoD0',
  render: (text, record, index) => <span>{yesOno(text)}</span>
}]

const merchantConfigText=[{
   title: '回调地址',
  dataIndex: 'notifyUrl',
},{
   title: '在途限额',
  dataIndex: 'inTransitLimit',
},{
   title: '余额限额',
  dataIndex: 'balanceLimit',
}]
const merchantRequestText=[{
   title: '请求IP',
  dataIndex: 'clientIp',
},{
   title: '用户ID',
  dataIndex: 'userId',
}]
const feeText=[{
   title: '是否自动D0',
  dataIndex: 'autoD0',
  render: (text, record, index) => <span>{yesOno(text)}</span>
},{
   title: '手续费',
  dataIndex: 'transactionFee',
},{
   title: '合作商利润',
  dataIndex: 'agencyProfit',
},{
  title: '平台利润',
  dataIndex: 'platformProfit',
},{
  title: '平台名义利润',
  dataIndex: 'fakePlatformProfit',
},{
  title: '是否信用卡',
  dataIndex: 'credit',
  render: (text, record, index) => <span>{yesOno(text)}</span>
}]
const updateDetails=[{
   title: '时间',
  dataIndex: 'date',
},{
   title: '信息',
  dataIndex: 'msg',
}]