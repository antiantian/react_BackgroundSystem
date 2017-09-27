import React, { Component } from 'react';
import {Row, Col,Input,Button,Radio,GetFieldDecorator,Checkbox,message} from 'antd';
import newfetch from '../common/fetch.js';
import {api} from '../config.js';
import {hashHistory} from 'react-router';
import {messParams,messChildParams,returnAddEdit} from './../common/util';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class AddPaymentConfiguration extends Component {
  constructor(props) {
    super(props)
    this.returnAddEdit=returnAddEdit;
    this.mess=this.props.location.state.mess;
    this.state = {
      newName:messParams(this.mess,'name'),
      newPayCode:messParams(this.mess,'payCode'),
      newMethod:messParams(this.mess,'method'),
      newType:messParams(this.mess,'type','null')?messParams(this.mess,'type','null').split(","):[],
      newStatus:messParams(this.mess,'status'),
      plainOptions:[],
      isAdd:this.props.location.state.isAdd, //0 add 1 edit
    }
  }
  componentDidMount() {
    this.paymentWay();
    this.paymentType();
  }
  paymentWay = () => {
    var obj={
      url:api.resourcePath+api.getTypeMethodList,
      jsonp:{
      token:localStorage.cok,
      type:1,
      isPage:1,
      status:0,
      adminId:localStorage.loginId,
      },
    func200:(json)=>{
     var array=[];
     if(json.data&&json.data.length>0){
       for(var i=0;i<json.data.length;i++){
        array.push(<Radio key={i} value={json.data[i].code}>{json.data[i].name}</Radio>)
       }
     }
     this.setState({
      arrs: array
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
  paymentType = () => {
    var obj={
      url:api.resourcePath+api.getTypeMethodList,
      jsonp:{
      token:localStorage.cok,
      type:2,
      isPage:1,
      status:0,
      adminId:localStorage.loginId
      },
    func200:(json)=>{
     var arr=[];
     if(json.data&&json.data.length>0){
       for(var i=0;i<json.data.length;i++){
        arr.push(json.data[i].type)
       }
     }
     this.setState({
      plainOptions: arr
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
  onChangeName=(e)=>{
     this.setState({
      newName: e.target.value,
    });
  }
  onChangePayCode=(e)=>{
     this.setState({
      newPayCode: e.target.value,
    });
  }
onChangemethod=(e)=>{
     this.setState({
      newMethod:e.target.value,
    });
  }
  onChangeType = (newType) => {
    this.setState({
      newType,
    });
  }
  onChangeStatus=(e)=>{
    this.setState({
      newStatus: e.target.value,
    });
  }
  conserve=()=>{
    var obj={
     url:api.resourcePath+api.savePayConfig,
     jsonp:{
      token:localStorage.cok,
      payCode:this.state.newPayCode,
      name:this.state.newName,
      Type:this.state.newType,
      method:this.state.newMethod,
      status:this.state.newStatus,
      isAdd:this.props.location.state.isAdd,
      adminId:localStorage.loginId
     },
    func200:(json)=>{
      message.info('请求成功');
     hashHistory.push('/PaymentConfiguration')
    },
    func201:(json)=>{
      this.setState({
           data: [],
          })
    }
    }
    newfetch(obj)
  }
  onBlurName=(e)=>{
    if(e.target.value.length<1){
      message.warn("名称不能为空")
    }
  }
  onBlurPayCode=(e)=>{
    if(e.target.value.length<1){
      message.warn("编码不能为空")
    }
  }
  render() {
    return (
     <div className="siteSettings">
         <div  className="EA_title">
            <Button className="qc-add-list" onClick={
              () =>this.returnAddEdit('/paymentConfiguration')
             }>返回</Button>
            <h2 className="deal-title">{this.state.isAdd===1?'编辑':'添加'}支付配置</h2>    
         </div>
    <Row gutter={20}>
      <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
        <div>名称</div>
      </Col>  
       <Col span={16} style={{marginBottom:'20px'}}>
            <Input   size="large" 
            placeholder="请输入支付配置名称"
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
           placeholder="请输入支付配置编码"
            onChange={this.onChangePayCode}
            value={this.state.newPayCode}
            onBlur={this.onBlurPayCode}
            disabled={this.state.isAdd===1?true:false}
             />
        </Col>
      <Col span={4}>
        <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}></div>
      </Col> 
</Row>
<Row gutter={20}>
      <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
        <div>支付方式</div>
      </Col>  
       <Col span={16} style={{marginBottom:'20px'}}>
             <RadioGroup
              onChange={this.onChangemethod}
              value={this.state.newMethod}>
             {this.state.arrs}
             </RadioGroup>
        </Col>
      <Col span={4}>
        <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}></div>
      </Col> 
</Row>
    <Row gutter={20}>
      <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
        <div>支付类型</div>
      </Col>  
       <Col  span={16} style={{marginBottom:'20px'}}>
                <div><CheckboxGroup 
                 options={this.state.plainOptions} 
                 value={this.state.newType}
                 onChange={this.onChangeType} 
                 /></div>
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
                    ((typeof(this.state.newName)=='undefined' || typeof(this.state.newPayCode)=='undefined')) || (this.state.newName<1 || this.state.newPayCode<1) 
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

export default AddPaymentConfiguration;