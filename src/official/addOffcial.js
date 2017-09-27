import React from 'react';
import {Row, Col, Button, Select, Form, Input, Icon, Switch,Radio,message} from 'antd';
import {hashHistory} from 'react-router';
import host from '../config.js';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {NewSelect} from './../common/resetAntd';
import CreatePay from './../EditAddCommon/addPaymentChannel_CreatePay';
import {ValidateEA,postObject,rateJson_Change} from '../EditAddCommon/EAcommon';
import {messParams,messChildParams,returnAddEdit,blurValidate,keyUpInner} from './../common/util';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddOffcial extends React.Component {
    constructor(props){
      super(props);
      this.blurValidate=blurValidate;
      this.keyUpInner=keyUpInner;
      this.returnAddEdit=returnAddEdit;
      this.state = {
      merchantNo:messParams(this.props.location.state.mess,'merchantNo'),
      agencyNo:messParams(this.props.location.state.mess,'agencyNo'),
      name:messParams(this.props.location.state.mess,'name'),
      idCard:messParams(this.props.location.state.mess,'idCard'),
      initIdCard:messParams(this.props.location.state.mess,'idCard','null'), 
      phone:messParams(this.props.location.state.mess,'phone'),
      agencyGroupId:messParams(this.props.location.state.mess,'agencyGroupNo','null')?parseInt(this.props.location.state.mess.agencyGroupNo):'',
      contract:messChildParams(this.props.location.state.mess,'accountExs','contract'),
      bankCard:messChildParams(this.props.location.state.mess,'accountExs','bankCard'),
      bankName:messChildParams(this.props.location.state.mess,'accountExs','bankName'),
      cardMobile:messChildParams(this.props.location.state.mess,'accountExs','cardMobile'),
      email:messChildParams(this.props.location.state.mess,'accountExs','email'),
      password:messChildParams(this.props.location.state.mess,'accountExs','password'),
      accountType:messChildParams(this.props.location.state.mess,'accountExs','accountType','0').toString(),
      status:messParams(this.props.location.state.mess,'status','0').toString(),
      isAdd:this.props.location.state.isAdd, //0 add 1 edit
      notifyUrl:messChildParams(this.props.location.state.mess,'config','notifyUrl'),
      PayConfigList:[],
      PayConfigList_check:false,
      rateJson:[],
      open:false,
      ratenames:[],
      rateNecsssary:['minTransaction','maxTransaction','rate'],
      agencyGroupIdLists:[],
      idCard_class:'',//inputErrors
      }
      
   }
   componentDidMount() {
       this.setState({
          PayConfigList:datas,
          PayConfigList_check:true,
          agencyGroupIdLists:[{name:'支付宝',key:'10022'},{name:'钱起',key:'1100222'}],
       })
      this.getPayConfigList();
        this.agencyGroupIdLists();
      }
    onChangeAll=(e)=>{
      this.setState({
        [e.target.name]:e.target.value,
      });
      if(e.target.name==='idCard'){
          if(this.state.idCard!==this.state.initIdCard){
             this.blurValidate(e.target.name,e.target.value)
          }
      }else{
        this.blurValidate(e.target.name,e.target.value)
      }
    }
    getPayConfigList=()=>{
    //获取支付配置列表
     const objectJson={
        token:localStorage.cok,
        status:-1,
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
  agencyGroupIdLists=()=>{
    //获取合作商组列表
     const objectJson={
        token:localStorage.cok,
        status:-1,
        isPage:1,
    }
    changeID(objectJson)
    var obj={
      url:api.resourcePath+api.getAgencyGroupList,
      jsonp:objectJson,
      func200:(json)=>{
          message.info('请求成功');
          if(json.data&&json.data.length>0){
             this.setState({
              agencyGroupIdLists:json.data,
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
  keyUp=(e)=>{
    this.keyUpInner(e.target.name,e.target.value)
  }
    render(){
        return (
            <div>
                <div  className="EA_title">
                  <Button className="qc-add-list" onClick={()=>{
                    this.returnAddEdit('/offcialList')
                  }}>返回</Button>
                  <h2 className="deal-title">{this.state.isAdd===1?'编辑':'添加'}合作商</h2>    
                </div> 
                {this.state.isAdd===1&&
                  <Row style={{marginTop:30}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商号</span></Col>
                    <Col span={12}>
                       <Input 
                        placeholder="请输入合作商号"
                        name="agencyNo"
                        onChange={this.onChangeAll}
                        value={this.state.agencyNo}
                        className="mineWidth"
                        disabled={true}
                       />
                    </Col>
                  </Row>
                }
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商组</span></Col>
                    <Col span={12}>
                       <NewSelect 
                         name="agencyGroupId" 
                         value={this.state.agencyGroupId.toString()}
                         datas={this.state.agencyGroupIdLists} 
                         placeholder="合作商组" 
                         style={{ width: '100%',fontSize:'12px' }} 
                         valMess={'key'}
                         textMess={'name'}
                         onselChange={this.onselChange}
                       />
                    </Col>
                </Row>
                  <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商名称</span></Col>
                    <Col span={12}>
                        <Input  
                         placeholder="请输入合作商名称"
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
                    合作商身份证号码</span></Col>
                    <Col span={12}>
                           <Input 
                               placeholder="请输入合作商身份证号码"
                               name="idCard"
                               onChange={this.onChangeAll}
                               onKeyUp={this.keyUp}
                               value={this.state.idCard}
                               id="idCard"
                               className={this.state.idCard_class}
                            />
                    </Col>
                    <Col span={6}>
                      <p className="errorText">{this.state.idCard_mess}</p>
                    </Col>
                </Row>
                 <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商手机号</span></Col>
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
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}><span className="star">*</span>合作商联系人邮箱</span></Col>
                    <Col span={12}>
                        <Input 
                         placeholder="请输入合作商联系人邮箱"
                         onChange={this.onChangeAll}
                         name="email"
                         value={this.state.email}
                         />
                    </Col>
                </Row>
               {this.state.isAdd===1&&
                <Row style={{marginTop:10}}>
                    <Col span={6} style={{fontWeight:700,textAlign:'right'}}><span style={{marginRight:10}}>合作商联系人密码</span></Col>
                    <Col span={12}>
                        <Input 
                         placeholder="请输入合作商联系人密码"
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
                          defaultValue="0"
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
                          defaultValue="1"
                          name="status"
                         onChange={this.onChangeAll} 
                         value={this.state.status}>
                         <Radio name="status" value='0'>开启</Radio>
                         <Radio name="status" value='1'>禁用</Radio>
                      </RadioGroup>
                    </Col>
                </Row> 
          
                <div className="qc-save">
                    <Button type="primary" onClick={this.conserve}>保存</Button>
                </div>
            </div>         
        );
    }
  repayvalidate=()=>{
       this.setState({
          datasValidate:'true'
        }) 
  }  
  conserve=()=>{
    const saveList=[{
      index:'agencyGroupId',
      mess:'合作商组不能为空',
      arr:this.state.agencyGroupId,
    },{
      index:'name',
      mess:'合作商名称不能为空',
      arr:this.state.name
    },{
      index:'phone',
      mess:'手机号不能为空',
      arr:this.state.phone,
      type:'phone'
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
      mess:'异步通知地址不能为空',
      arr:this.state.notifyUrl,
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
        isAdd:this.state.isAdd
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
        objectJson['agencyNo']=this.state.agencyNo;
      }
      postObject(saveList,objectJson) 
      changeID(objectJson);
      var obj={
        url:api.resourcePath+api.saveAgencyList,
        jsonp:objectJson,
        func200:()=>{
            message.info('请求成功');
            hashHistory.push('/offcialList')
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

export default AddOffcial;


const datas= [{
        "key": 1,
        "channelCode": "express_d0",
        "name": "新易联",
    },
    {
        "key": 2,
        "channelCode": "payeco_a",
        "name": "易联A",
        "start": "09:00",
    },
    {
        "key": 3,
        "channelCode": "tftpay",
        "name": "腾付通",
        "start": "09:00",
        "end": "21:00",
    }]
