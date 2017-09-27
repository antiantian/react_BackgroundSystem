import React, { Component } from 'react';
import {Row, Col,Input,Button,Radio,Checkbox,message} from 'antd';
import newfetch from '../common/fetch.js';
import {api} from '../config.js';
import {hashHistory} from 'react-router';
import {messParams,messChildParams,returnAddEdit} from './../common/util';
const RadioGroup = Radio.Group;
class AddPaymentWay extends Component {
  constructor(props) {
    super(props)
    this.returnAddEdit=returnAddEdit;
    this.mess=this.props.location.state.mess;
    this.state = {
      newName:messParams(this.mess,'name'),
      newCode:messParams(this.mess,'code'),
      newStatus:messParams(this.mess,'status'),
      isAdd:this.props.location.state.isAdd, //0 add 1 edit
    }
  }
  onChangeName=(e)=>{
     this.setState({
      newName: e.target.value,
    });
  }
  onChangeCode=(e)=>{
     this.setState({
      newCode: e.target.value,
    });
  }
  onChangeStatus=(e)=>{
    this.setState({
      newStatus: e.target.value,
    });
  }
  onBlurName=(e)=>{
    if(e.target.value.length<1){
      message.warn("名称不能为空")
    }
  }
  onBlurCode=(e)=>{
    if(e.target.value.length<1){
      message.warn("编码不能为空")
    }
  }
  conserve=()=>{
    var obj={
      url:api.resourcePath+api.savePayMethod,
      jsonp:{
        token:localStorage.cok,
        adminId:localStorage.loginId,
        code:this.state.newCode,
        name:this.state.newName,
        status:this.state.newStatus,
        isAdd:this.props.location.state.isAdd,  
      },
      func200:(json)=>{
          message.info('请求成功');
          hashHistory.push('/PaymentWay')
      }
    }
     newfetch(obj)
   }
  render() {
    return (
      <div>
             <div  className="EA_title">
                <Button className="qc-add-list" onClick={
                  () =>this.returnAddEdit('/paymentWay')
                 }>返回</Button>
                <h2 className="deal-title">{this.state.isAdd===1?'编辑':'添加'}支付方式</h2>    
             </div> 
              <Row gutter={20}>
                <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                  <div>名称</div>
                </Col>  
                 <Col span={16} style={{marginBottom:'20px'}}>
                      <Input   
                      size="large" 
                      placeholder="请输入支付名称"
                      onChange={this.onChangeName}
                      value={this.state.newName}
                      onBlur={this.onBlurName}
                      />
                  </Col>
                <Col span={4}>
                  <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}></div>
                </Col> 
          </Row>
          <Row gutter={20}>
                <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                  <div>编码</div>
                </Col>  
                 <Col span={16} style={{marginBottom:'20px'}}>
                    <Input   
                      size="large" 
                      placeholder="请输入支付编码"
                      onChange={this.onChangeCode}
                      value={this.state.newCode}
                      onBlur={this.onBlurCode}
                      disabled={this.state.isAdd===1?true:false}
                       />
                  </Col>
                <Col span={4}>
                  <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}></div>
                </Col> 
          </Row>
          <Row gutter={20}>
                      <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                      <div>是否启用 </div>
                      </Col>  
                      <Col  span={16} style={{marginBottom:'20px'}}>
                          <div>          
                       <RadioGroup 
                       onChange={this.onChangeStatus} 
                       value={this.state.newStatus}>
                       <Radio value={0}>开启</Radio>
                       <Radio value={1}>禁用</Radio>
                       </RadioGroup></div>
                     </Col>
          </Row>
         <div className="qc-save">
                  {
                    ((typeof(this.state.newName)=='undefined' || typeof(this.state.newCode)=='undefined')) || (this.state.newName<1 || this.state.newCode<1) 
                    ?
                      <Button type="primary" disabled>保存</Button>
                    :
                      <Button type="primary" onClick={this.conserve}>保存</Button>
                  }
             </div>
       </div>
    );
  }
}

export default AddPaymentWay;