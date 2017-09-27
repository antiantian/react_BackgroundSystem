import React,{Component} from 'react';
import { Table, Button, Row, Col,Tabs} from 'antd';
import { hashHistory } from 'react-router';
import moment from 'moment';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {messParams,messChildParams,returnAddEdit,changeDate} from './../common/util';
const TabPane = Tabs.TabPane;
function callback(key) {  
  console.log(key);
}

class MerchantCapitaDetail extends React.Component {
  constructor(props) {
    super(props);
    this.returnAddEdit=returnAddEdit;
    this.mess=this.props.location.state.mess;
    this.state = {
      merchantNo:messParams(this.mess,'merchantNo'),
      agencyNo:messParams(this.mess,'agencyNo'),
      accountingDate:messParams(this.mess,'accountingDate'),
      tradeVolume:messParams(this.mess,'tradeVolume'),
      netIncome:messParams(this.mess,'netIncome'), 
      withdrawD0:messParams(this.mess,'withdrawD0'),
      withdrawT1:messParams(this.mess,'withdrawT1'),
      paymentFee:messParams(this.mess,'paymentFee'),
      settFeeD0:messParams(this.mess,'settFeeD0'),
      settFeeT1:messParams(this.mess,'settFeeT1'),
      balance:messParams(this.mess,'balance'),
      inTransit:messParams(this.mess,'inTransit'),
      refund:messParams(this.mess,'refund'),
      freeze:messParams(this.mess,'freeze'),
    }
 }
  componentDidMount() {
     
  }
  render() {
    return (
      <div>
        <div  className="EA_title">
          <Button className="qc-add-list" onClick={
            () =>this.returnAddEdit('/merchantCapital')
           }>返回</Button>
          <h2 className="deal-title">商户资金列表详情</h2>    
        </div> 
        <Row style={{ marginBottom: 10, fontSize: 15 }}>
           <Col span={8}>商户编号：{this.state.merchantNo}</Col>
           <Col span={8}>合作商编号：{this.state.agencyNo}</Col>
           <Col span={8}>记账日期：{changeDate(this.state.accountingDate)}</Col>
        </Row>
        <Row style={{ marginBottom: 10, fontSize: 15 }}>
           <Col span={8}>交易额：{this.state.tradeVolume}</Col>
           <Col span={8}>净收入：{this.state.netIncome}</Col> 
           <Col span={8}>d0提现金额：{this.state.withdrawD0}</Col>
        </Row>      
        <Row style={{ marginBottom: 10, fontSize: 15 }}> 
           <Col span={8}>t1提现金额：{this.state.withdrawT1}</Col>
           <Col span={8}>支付手续费：{this.state.paymentFee}</Col>
           <Col span={8}>d0结算手续费：{this.state.settFeeD0}</Col>
         </Row>      
         <Row style={{ marginBottom: 10, fontSize: 15 }}>     
           <Col span={8}>t1结算手续费：{this.state.settFeeT1}</Col>
           <Col span={8}>余额：{this.state.balance}</Col>
           <Col span={8}>在途资金：{this.state.inTransit}</Col>
         </Row>
         <Row style={{ marginBottom: 10, fontSize: 15 }}>   
           <Col span={8}>退款：{this.state.refund}</Col>  
           <Col span={8}>冻结：{this.state.freeze}</Col>
         </Row>
      </div>
    )
  }
}
export default MerchantCapitaDetail;


