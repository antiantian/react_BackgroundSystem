import React from 'react';
import {Row, Col, Button, Select, Form, Input, Icon, Switch,Radio,message} from 'antd';
import {hashHistory} from 'react-router';
import host from '../config.js';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {NewSelect} from './../common/resetAntd';
import MerchantList from './merchantList';
import CreatePay from './../EditAddCommon/addPaymentChannel_CreatePay';
import {ValidateEA,postObject,rateJson_Change} from '../EditAddCommon/EAcommon';
import {merchantRate} from '../EditAddCommon/FormParamsCommon';
import {messParams,messChildParams,returnAddEdit,blurValidate,keyUpInner} from './../common/util';
import {clsIDCard,
  CheckBankNo,
  CheckPhoneNo,ValidateCards} from './../common/cardValidate';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddMerchant extends React.Component {
    constructor(props){
      super(props);
      this.mess=this.props.location.state.mess;
      this.returnAddEdit=returnAddEdit; //返回带值
      this.blurValidate=blurValidate; //验证身份证等
      this.keyUpInner=keyUpInner;
      this.state = {
      merchantNo:messParams(this.mess,'merchantNo'),
      agencyNo:messParams(this.mess,'agencyNo'),
      name:messParams(this.mess,'name'),
      idCard:messParams(this.mess,'idCard'),
      initIdCard:messParams(this.mess,'idCard','null'), 
      phone:messParams(this.mess,'phone'),
      contract:messChildParams(this.mess,'accountExs','contract'),
      bankCard:messChildParams(this.mess,'accountExs','bankCard'),
      initBankCard:messChildParams(this.mess,'accountExs','bankCard'),
      bankName:messChildParams(this.mess,'accountExs','bankName'),
      cardMobile:messChildParams(this.mess,'accountExs','cardMobile'),
      email:messChildParams(this.mess,'accountExs','email'),
      password:messChildParams(this.mess,'accountExs','password'),
      accountType:messChildParams(this.mess,'accountExs','accountType',"0").toString(),
      status:messParams(this.mess,'status',"0").toString(),
      isAdd:this.props.location.state.isAdd, //0 add 1 edit
      notifyUrl:messChildParams(this.mess,'config','notifyUrl'),
      PayConfigList:[],
      PayConfigList_check:false,
      rateJson:[],
      open:false,
      ratenames:[],
      rateNecsssary:['minTransaction','maxTransaction','rate'],
      getAgencyLists:[],
      rate:messParams(this.mess,'rate',"arr")
      }
   } 
   componentDidMount() {
     console.log(this)
       // this.setState({
       //    PayConfigList:datas,
       //    PayConfigList_check:true,
       //    getAgencyLists:[{name:'支付宝11',agencyNo:'10011'},{name:'支付宝',agencyNo:'10022'},{name:'钱起',agencyNo:'1100222'}],
       // })
      this.getPayConfigList();
        this.getAgencyList();
      }
    
    getPayConfigList=()=>{
    //获取支付配置列表
     const objectJson={
        token:localStorage.cok,
        status:1,
        type:3,
        isPage:1
    }
    changeID(objectJson)
    var obj={
      url:api.resourcePath+api.getTypeMethodList,
      jsonp:objectJson,
      func200:(json)=>{
          message.info('请求成功');
          if(json.data&&json.data.length>0){
             this.setState({
              PayConfigList:json.data,
              PayConfigList_check:true
             })
          }
      }
    }
    newfetch(obj)
  }
  getAgencyList=()=>{
    //获取合作商列表
     const objectJson={
        token:localStorage.cok,
        status:-1,
        isPage:1,
    }
    changeID(objectJson)
    var obj={
      url:api.resourcePath+api.getAgencyList,
      jsonp:objectJson,
      func200:(json)=>{
          message.info('请求成功');
          if(json.data&&json.data.length>0){
             this.setState({
              getAgencyLists:json.data,
             })
          }
      }
    }
    newfetch(obj)
  }
  changerateJson=(obj)=>{
    var arr=this.state.rateJson;
    var names=this.state.ratenames;
    rateJson_Change(obj,arr,names,()=>{
           this.setState({
             rateJson:arr,
             ratenames:names
           })  
    })
    // console.log(JSON.stringify( arr ))
  }
  onselChange=(val,name)=>{
    this.setState({[name]:val})
  }
    render(){
        return (
            <div>
                <div  className="EA_title">
                  <Button className="qc-add-list" onClick={
                    () =>this.returnAddEdit('/merchantList')
                   }>返回</Button>
                  <h2 className="deal-title">{this.state.isAdd===1?'编辑':'添加'}商户</h2>    
                </div> 
                {this.state.isAdd===1&&
                  <Row style={{marginTop:30}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>商户号</span></Col>
                    <Col span={12}>
                       <Input 
                        placeholder="请输入商户号"
                        name="merchantNo"
                        onChange={this.onChangeAll}
                        value={this.state.merchantNo}
                        className="mineWidth"
                        disabled={true}
                       />
                    </Col>
                  </Row>
                }
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商编号</span></Col>
                    <Col span={12}>
                       <NewSelect name="agencyNo" 
                       value={this.state.agencyNo}
                       datas={this.state.getAgencyLists}  
                       style={{ width: '100%',fontSize:'12px' }} 
                       valMess={'agencyNo'}
                       textMess={'name'}
                       onselChange={this.onselChange}
                       />
                    </Col>
                </Row>
                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>商户名称</span></Col>
                    <Col span={12}>
                        <Input  
                         placeholder="请输入商户名称"
                         onChange={this.onChangeAll}
                         value={this.state.name}
                         name="name"
                         className="mineWidth"
                         />
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>
                    {this.state.isAdd===0&&<span className="star">*</span>}
                    商户身份证号码</span></Col>
                    <Col span={12}>
                        <Input 
                         placeholder="请输入商户身份证号码"
                         name="idCard"
                         onKeyUp={this.keyUp}
                         onChange={this.onChangeAll}
                         value={this.state.idCard}
                         className={this.state.idCard_class}
                        />
                    </Col>
                    <Col span={6}>
                      <p className="errorText">{this.state.idCard_mess}</p>
                    </Col>
                </Row>
                 <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>商户手机号</span></Col>
                    <Col span={12}>
                        <Input 
                         placeholder="请输入手机号号码"
                         onKeyUp={this.keyUp}
                         name="phone"
                         onChange={this.onChangeAll}
                         value={this.state.phone}
                         className={this.state.phone_class}
                         />
                    </Col>
                     <Col span={6}>
                      <p className="errorText">{this.state.phone_mess}</p>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>收款账户名</span></Col>
                    <Col span={12}>
                        <Input 
                         onChange={this.onChangeAll}
                         name="contract"
                         placeholder="请输入收款账户名"
                         value={this.state.contract}
                         />
                    </Col>
                </Row>

                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>收款账户号</span></Col>
                    <Col span={12}>
                        <Input 
                        placeholder="请输入收款账户号"
                        name="bankCard"
                        onKeyUp={this.keyUp}
                        onChange={this.onChangeAll}
                        value={this.state.bankCard}
                        className={this.state.bankCard_class}
                        />
                    </Col>
                    <Col span={6}>
                      <p className="errorText">{this.state.bankCard_mess}</p>
                    </Col>
                </Row>

                      <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>收款账户开户行名称</span></Col>
                    <Col span={12}>
                        <Input 
                          placeholder="请输入收款账户开户行名称"
                          name="bankName"
                          onChange={this.onChangeAll}
                          value={this.state.bankName}
                          />
                    </Col>
                </Row> 
                {/* 
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>收款账户银行手机号</span></Col>
                    <Col span={12}>
                        <Input 
                          placeholder="请输入收款账户银行手机号"
                          onKeyUp={this.keyUp}
                          name="cardMobile"
                          onChange={this.onChangeAll}
                          value={this.state.cardMobile}
                          className={this.state.icardMobile_class}
                          />
                    </Col>
                    <Col span={6}>
                      <p className="errorText">{this.state.icardMobile_mess}</p>
                    </Col>
                </Row>
                */}
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>商家联系人邮箱</span></Col>
                    <Col span={12}>
                        <Input 
                         placeholder="请输入商家联系人邮箱"
                         onChange={this.onChangeAll}
                         name="email"
                         value={this.state.email}
                         />
                    </Col>
                </Row>
               {this.state.isAdd===1&&
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>商家联系人密码</span></Col>
                    <Col span={12}>
                        <Input 
                         placeholder="请输入商家联系人密码"
                         onChange={this.onChangeAll}
                         value={this.state.password}
                         name="password"
                         />
                    </Col>
                </Row>
                }
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>异步通知地址</span></Col>
                    <Col span={12}>
                        <Input 
                         placeholder="请输入异步通知地址"
                         onChange={this.onChangeAll}
                         value={this.state.notifyUrl}
                         name="notifyUrl"
                         />
                    </Col>
                </Row>
                 
                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>账户类型</span></Col>
                    <Col span={12}>
                          <RadioGroup
                          name="accountType"
                          onChange={this.onChangeAll} 
                          value={this.state.accountType}>
                         <Radio name="accountType" value='0'>个人</Radio>
                         <Radio name="accountType" value='1'>公户</Radio>
                      </RadioGroup>
                    </Col>
                </Row> 

                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>账户状态</span></Col>
                    <Col span={12}>
                          <RadioGroup 
                          name="status"
                          onChange={this.onChangeAll} 
                          value={this.state.status}>
                         <Radio name="status" value='0'>开启</Radio>
                         <Radio name="status" value='1'>禁用</Radio>
                      </RadioGroup>
                    </Col>
                </Row> 
                <Row style={{marginTop:10}}>
                  <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={6}>
                       <div style={{marginRight:10}}><span className="star">*</span>费率信息</div>
                  </Col>
                  <Col  span={12} style={{marginBottom:'20px'}}>
                       {this.state.PayConfigList_check&&
                          <div>
                              {this.state.PayConfigList.map((item,index)=>
                                 <CreatePay  
                                   datasValidate={this.state.datasValidate} 
                                   codename={this.state.codename}
                                   ref="FormGroup" 
                                   changeParrateJson={this.changerateJson} 
                                   key={index} 
                                   index={index} 
                                   item={item} 
                                   necessaryMess={this.state.rateNecsssary}
                                   changeValidate={this.repayvalidate}
                                   chanRates={this.state.rate}
                                   default_OBJ={merchantRate}
                                 />
                              )}
                          </div>
                        }
                  </Col>
            </Row>
          
                <div className="qc-save">
                    <Button type="primary" onClick={this.conserve}>保存</Button>
                </div>
            </div>         
        );
    }
  onChangeAll=(e)=>{
      this.setState({
        [e.target.name]:e.target.value,
      });
      if(e.target.name==='idCard'){
          if(e.target.value!==this.state.initIdCard){
             this.blurValidate(e.target.name,e.target.value)
          }
      }else{
        this.blurValidate(e.target.name,e.target.value)
      }
    }  
  repayvalidate=()=>{
       this.setState({
          datasValidate:'true'
        }) 
  } 
  keyUp=(e)=>{
    this.keyUpInner(e.target.name,e.target.value)
  } 
  conserve=()=>{
    // ,{
    //   index:'cardMobile',
    //   mess:'收款银行手机号不能为空',
    //   arr:this.state.cardMobile
    // }
    const saveList=[{
      index:'agencyNo',
      mess:'合作商不能为空',
      arr:this.state.agencyNo
    },{
      index:'name',
      mess:'商户名称不能为空',
      arr:this.state.name
    },{
      index:'phone',
      mess:'手机号不能为空',
      arr:this.state.phone,
      type:'phone',
    },{
      index:'contract',
      mess:'收款人姓名不能为空',
      arr:this.state.contract
    },{
      index:'bankCard',
      mess:'收款账户号不能为空',
      arr:this.state.bankCard,
      type:'banknum',
    },{
      index:'bankName',
      mess:'收款银行不能为空',
      arr:this.state.bankName
    },{
      index:'email',
      mess:'邮箱不能为空',
      arr:this.state.email
    },{
      index:'accountType',
      mess:'账户类型不能为空',
      arr:this.state.accountType
    },{
      index:'status',
      mess:'状态不能为空',
      arr:this.state.status
    },{
      index:'notifyUrl',
      mess:'异步通知地址',
      arr:this.state.notifyUrl
    },{
      index:'rateJson',
      type:'datasValidate', //数组验证
      necessary:this.state.rateNecsssary,
      arr:this.state.rateJson,
      mess:'费率信息不能为空',
      messAll:'请补全费率必填信息',
    }]
    if(this.state.isAdd===0){
        saveList.splice(2,0,{
              index:'idCard',
              mess:'身份证号不能为空',
              arr:this.state.idCard,
              type:'idCard',
           })
    }
  var ValidateReturn=ValidateEA(saveList);
   if(ValidateReturn.nextDo){
       const objectJson={
        token:localStorage.cok,
        isAdd:this.state.isAdd,
        
      }
      if(this.state.idCard!==this.state.initIdCard&&this.state.idCard!==''){
         var len=this.state.idCard.length;
         if(len!=18&&len!=15){
            message.error('您输入的身份证号长度不对');
            return false
         }else{
          objectJson['idCard']=this.state.idCard
         }
      }
      if(this.state.isAdd===1){
        objectJson['password']=this.state.password;
        objectJson['merchantNo']=this.state.merchantNo;
      }
      postObject(saveList,objectJson) 
      changeID(objectJson);
      var obj={
        url:api.resourcePath+api.saveMerchantList,
        jsonp:objectJson,
        func200:()=>{
            message.info('请求成功');
            hashHistory.push('/merchantList')
        }
      }
      newfetch(obj)  
    }else{
       if(ValidateReturn.indexVal=='rateJson'){
                  this.setState({
                    datasValidate:'false',
                    codename:ValidateReturn.codename,
                  })
       }
    }  
 }  
}

export default AddMerchant;


const datas= [{
        "key": 1,
        "payCode": "express_d0",
        "name": "新易联",
    },
    {
        "key": 2,
        "payCode": "payeco_a",
        "name": "易联A",
        "start": "09:00",
    },
    {
        "key": 3,
        "payCode": "tftpay",
        "name": "腾付通",
        "start": "09:00",
        "end": "21:00",
    }]