import React,{Component} from 'react';
import {Table, Button, Row, Col, message, Input ,Radio,Tabs} from 'antd';
import moment from 'moment';
import { hashHistory } from 'react-router';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {messParams,messChildParams,returnAddEdit,changeCodeName,dai_payType,dai_paystatus,yesOno} from './../common/util';
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}

class FlowDetails extends React.Component {
     constructor(props) {
        super(props);
        this.returnAddEdit=returnAddEdit;
        this.state = {
            relatedOrderNo:'',
            merchantNo:'',
            agencyNo:'',
            channelSettlementNo:'',
            merchantSettlementNo:'',
            settlementCode:'',
            netAmount:'',
            feeText:'',
            paraId:this.props.params.id,
            channelSettlementName:[],
            successList:[],
            pendingList:[],
            failList:[],
            settMerchantRate:[],
            agencyRate:[],
            settChannelRateText:[],
            merchantConfigText:[],
            updateDetails:[],
        }
    }
    componentDidMount() {
        this.details();
        this.getchannelCode();
     }
     getchannelCode=()=>{
       const obj={
          url:api.resourcePath+api.getSettChanList,
          jsonp:{
            token:localStorage.cok,
            isPage:1,
            adminId:localStorage.loginId,
          },
         func200:(json)=>{
             if(json.data&&json.data.length>0){
                 this.setState({
                  channelSettlementName:json.data,
                })
             }                        
         }   
        }
         newfetch(obj)   
      }
    details(){
      const obj={
        url:api.resourcePath+api.settOrderInfo,
        jsonp:{
          token:localStorage.cok,
          adminId:localStorage.loginId,
          orderNo:this.state.paraId,
        },
        func200:(json)=>{
            var data = json.data;
            this.setState({
            relatedOrderNo:data.relatedOrderNo,
            merchantNo:data.merchantNo,
            agencyNo:data.agencyNo,
            channelSettlementNo:data.channelSettlementNo,
            merchantSettlementNo:data.merchantSettlementNo,
            settlementCode:data.settlementCode,
            netAmount:data.netAmount,
            settMerchantRate:data.settMerchantRate,
            agencyRate:data.agencyRate,
            settChannelRateText:data.settChannelRateText,
            merchantConfigText:data.merchantConfigText,
            feeText:data.feeText,
            updateDetails:data.updateDetails,
             successList:data.successList,
            pendingList:data.pendingList,
            failList:data.failList,
            createDate:data.createDate,
            updateDate:data.updateDate,
            payType:data.payType,
            amount:data.amount,
            fee:data.fee,
            status:data.status,
          })
        }
      }
      newfetch(obj)
    }

    handleSizeChange = (e) => {
      if(e.target.value="updata"){
        this.setState({ data:this.state.updata,updateTable:true });
      }else{
         this.setState({ data:e.target.value,updateTable:true });
      }
       
    }
    render(){
        const data = this.state.data;
        return (
            <div>
                <h2 className="titleName" style={{marginBottom:15}}>代付详情
                  <Button onClick={
                       ()=>this.returnAddEdit('/settleList')
                     } style={{float:'right'}}>
                     返回
                  </Button>
                </h2>
                <Row style={{marginBottom:10,fontSize:15}}>
                    <Col span={8}>代付订单号：{this.state.paraId}</Col>
                    <Col span={8}>商户号：{this.state.merchantNo}</Col>
                    <Col span={8}>合作商号：{this.state.agencyNo}</Col>
                </Row>
                <Row style={{marginBottom:10,fontSize:15}}>
                    <Col span={8}>关联订单号：{this.state.relatedOrderNo}</Col>
                    <Col span={8}>商户代付订单号：{this.state.merchantSettlementNo}</Col>
                    <Col span={8}>通道代付订单号：{this.state.channelSettlementNo}</Col>
                </Row>
                <Row style={{marginBottom:10,fontSize:15}}>
                    <Col span={8}>通道编码：{this.state.settlementCode}</Col>
                    <Col span={8}>创建时间：{this.state.createDate}</Col>
                    <Col span={8}>更新时间：{this.state.updateDate}</Col>
                </Row>
                <Row style={{marginBottom:10,fontSize:15}}>    
                   <Col span={8}>通道名称：{changeCodeName(this.state.settlementCode,this.state.channelSettlementName,'settlementCode')}</Col> 
                   <Col span={8}>代付金额：{this.state.amount}</Col>
                   <Col span={8}>代付类型：{dai_payType(this.state.payType)}</Col>
               </Row>
                 <Row style={{marginBottom:20,fontSize:15}}>
                   <Col span={8}>代付状态：{dai_paystatus(this.state.status)}</Col>
                   <Col span={8}>手续费：{this.state.fee}</Col>
               </Row>
               <Tabs onChange={callback} type="card">
                  <TabPane tab="成功" key="1"><Table dataSource={this.state.successList} columns={successList} pagination={false}/></TabPane>
                  <TabPane tab="进行中" key="2"><Table dataSource={this.state.pendingList} columns={pendingList} pagination={false}/></TabPane>
                  <TabPane tab="失败" key="3"><Table dataSource={this.state.failList} columns={failList} pagination={false}/></TabPane>
                  <TabPane tab="支付商户扣率" key="4"><Table dataSource={this.state.settMerchantRate} columns={settMerchantRate} pagination={false}/></TabPane>
                  <TabPane tab="合作商扣率" key="5"><Table dataSource={this.state.agencyRate} columns={agencyRate} pagination={false}/></TabPane>
                  <TabPane tab="支付类型通道扣率" key="6"><Table dataSource={this.state.settChannelRateText} columns={settChannelRateText} pagination={false}/></TabPane>
                  <TabPane tab="商户信息配置" key="7"><Table dataSource={this.state.merchantConfigText} columns={merchantConfigText} pagination={false}/></TabPane>
                  <TabPane tab="手续费信息" key="8"><Table dataSource={this.state.feeText} columns={feeText} pagination={false}/></TabPane>
                  <TabPane tab="更新纪录" key="9"><Table dataSource={this.state.updateDetails} columns={updateDetails} pagination={false}/></TabPane>
               </Tabs>
            </div>
        )
    }
}

export default FlowDetails;

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
const successList =[{
  title: '姓名',
  dataIndex:'accountName',
},{
   title: '账号',
  dataIndex: 'accountNo',
},{
   title: '余额',
  dataIndex: 'amount',
},{
  title: '银行名称',
  dataIndex: 'bankName',
},{
  title: '省',
  dataIndex: 'province',
},{
  title: '市',
  dataIndex: 'city',
}]
const pendingList =[{
  title: '姓名',
  dataIndex:'accountName',
},{
   title: '账号',
  dataIndex: 'accountNo',
},{
   title: '余额',
  dataIndex: 'amount',
},{
  title: '银行名称',
  dataIndex: 'bankName',
},{
  title: '省',
  dataIndex: 'province',
},{
  title: '市',
  dataIndex: 'city',
}]
const failList =[{
  title: '姓名',
  dataIndex:'accountName',
},{
   title: '账号',
  dataIndex: 'accountNo',
},{
   title: '余额',
  dataIndex: 'amount',
},{
  title: '银行名称',
  dataIndex: 'bankName',
},{
  title: '省',
  dataIndex: 'province',
},{
  title: '市',
  dataIndex: 'city',
}]
const settMerchantRate=[{
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
},{
   title: 'd0费率',
  dataIndex: 'd0Rate',
},{
   title: 'd0手续费',
  dataIndex: 'd0Fee',
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
}]
/*
,{
  title: 'defaultSaleRate',
  dataIndex: 'defaultSaleRate',
  render: (text, record, index) => <span>{JSON.stringify(record.defaultSaleRate)}</span>
}
*/
const settChannelRateText=[{
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
  title: 'd0费率',
  dataIndex: 'd0Rate',
},{
  title: 'd0手续费',
  dataIndex: 'd0Fee',
},{
  title: '是否使用d0',
  dataIndex: 'allowD0',
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
const feeText=[{
   title: '是否信用卡',
  dataIndex: 'credit',
  render: (text, record, index) => <span>{yesOno(text)}</span>
},{
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
}]
const updateDetails=[{
   title: '时间',
  dataIndex: 'date',
},{
   title: '信息',
  dataIndex: 'msg',
}]