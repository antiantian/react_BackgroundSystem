import React, { Component } from 'react';
import {Row, Col,Input,Button,Radio,GetFieldDecorator,Checkbox,message} from 'antd';
import newfetch from '../common/fetch.js';
import {api} from '../config.js';
import {hashHistory} from 'react-router';
import {messParams,messChildParams,returnAddEdit} from './../common/util';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class AddPaymentType extends Component {
  constructor(props) {
    super(props)
    this.returnAddEdit=returnAddEdit;
    this.mess=this.props.location.state.mess;
    this.state = {
      newName:messParams(this.mess,'name'),
      newType:messParams(this.mess,'type'),
      isAdd:this.props.location.state.isAdd, //0 add 1 edit
    }
  }
  onChangeName=(e)=>{
     this.setState({
      newName: e.target.value,
    });
  }
  onChangeType=(e)=>{
    this.setState({
     newType: e.target.value,
   });
 }
 onBlurName=(e)=>{
  if(e.target.value.length<1){
    message.warn("名称不能为空")
  }
}
onBlurType=(e)=>{
  if(e.target.value.length<1){
    message.warn("编码不能为空")
  }
}
  conserve=()=>{
    const obj={
      url:api.resourcePath+api.savePayType,
      jsonp:{
        token:localStorage.cok,
        type:this.state.newType,
        name:this.state.newName,
        isAdd:this.props.location.state.isAdd,
        adminId: localStorage.loginId
      },
      func200:(json)=>{
        message.info('请求成功');
        hashHistory.push('/paymentType')
      }
    }
    newfetch(obj)
  }
  render() {
    return (
     <div>
         <div  className="EA_title">
            <Button className="qc-add-list" onClick={
              () =>this.returnAddEdit('/paymentType')
             }>返回</Button>
            <h2 className="deal-title">{this.state.isAdd===1?'编辑':'添加'}支付类型</h2>    
         </div> 
          <Row gutter={20}>
            <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
              <div>名称</div>
            </Col>  
             <Col span={16} style={{marginBottom:'20px'}}>
                  <Input   size="large" 
                  placeholder="请输入支付类型名称"
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
                  <Input   size="large" 
                  placeholder="请输入支付类型编码"
                  onChange={this.onChangeType}
                  value={this.state.newType}
                  onBlur={this.onBlurType}
                  disabled={this.state.isAdd===1?true:false}
                  />
              </Col>
            <Col span={4}>
              <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}></div>
            </Col> 
      </Row>
      <div className="qc-save">
               {/* <Button type="primary" onClick={this.conserve}>保存</Button> */}
               {
                    ((typeof(this.state.newName)=='undefined' || typeof(this.state.newType)=='undefined')) || (this.state.newName<1 || this.state.newType<1) 
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

export default AddPaymentType;