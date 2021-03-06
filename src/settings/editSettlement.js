import React, { Component } from 'react';
import {Row, Col,Input,Button,Radio,GetFieldDecorator,Checkbox,message} from 'antd';
import moment from 'moment';
import {api} from '../config.js';
import newfetch from './../common/fetch';
import changeID from './../common/commonID';
import {hashHistory} from 'react-router';
import {NewTimePicker} from '../common/resetAntd';
import PaymentChannel from './paymentChannel';
import CreatePay from './../EditAddCommon/addPaymentChannel_CreatePay';
import CreateConfig from './../EditAddCommon/addPaymentChannel_CreateConfig';
import {ValidateEA,postObject,rateJson_Change} from '../EditAddCommon/EAcommon';
import {settlementRate,settlementConfigs} from '../EditAddCommon/FormParamsCommon';
import {messParams,messChildParams,returnAddEdit} from './../common/util';
const RadioGroup = Radio.Group;
const default_OBJ={
  rate:null,
  fee:null,
  minTransaction:null,
  maxTransaction:null,
  d0Rate:null,
  d0Fee:null,
  allowD0:null
}
class EditSettlement extends Component {
   constructor(props){
      super(props);
      this.mess=this.props.location.state.mess;
      this.state = {
          name:messParams(this.mess,'name'),
          settlementCode:messParams(this.mess,'settlementCode'),
           start:messParams(this.mess,'start'),
           end:messParams(this.mess,'end'),
          status:messParams(this.mess,'status').toString(),
          isAdd:this.props.location.state.isAdd,
          PayConfigList:[],
          PayConfigList_check:true,
          ConfigList_check:true,
          rateJson:[],
          configJson:[],
          open:false,
          ratenames:[],
          rateNecsssary:['minTransaction','maxTransaction','rate'],
          configNecsssary:['appId','endpoint'],
          config:this.props.location.state.mess?[this.props.location.state.mess.chanConfigs]:[],
          configrate:messParams(this.mess,'chanRates','arr'),
      };
      this.returnAddEdit=returnAddEdit;
   }
   componentDidMount(){
     /*
      this.setState({
      PayConfigList:datas,
      PayConfigList_check:true,
      ConfigList_check:true,
      config:arr
     })
     */
  }
  onChangeAll=(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
    });
  }
  render() {
    return (
     <div className="siteSettings">
            <Row type="flex" justify="space-between"  className="EA_title">
               <Col span={12}><h2>{this.state.isAdd===1?'编辑':'添加'}支付通道</h2></Col>
               <Col span={12} style={{textAlign:'right',fontSize:'16px',fontWeight:'700'}}>
                  <Button style={{backgroundColor:"#E6E6E6"}} 
                     onClick={()=>{
                      this.returnAddEdit('/settlementList')
                     }}>返回</Button>
               </Col>  
           </Row>
            <Row gutter={20}>
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                <div>通道编号</div>
              </Col>  
               <Col span={16} style={{marginBottom:'20px'}}>
                    <Input   
                    size="large" 
                    placeholder="请输入通道编号"
                    name="settlementCode"
                    onChange={this.onChangeAll}
                    value={this.state.settlementCode}
                    disabled={this.state.isAdd===1?true:false}
                    />
                </Col>
              <Col span={4}>
                <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}></div>
              </Col> 
        </Row>
        <Row gutter={20}>
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                <div>通道名称</div>
              </Col>  
               <Col span={16} style={{marginBottom:'20px'}}>
                  <Input   
                  size="large"
                  placeholder="请输入通道名称" 
                  name="name"
                  onChange={this.onChangeAll}
                  value={this.state.name}
                     />
                </Col>
              <Col span={4}>
                <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}></div>
              </Col> 
        </Row>
        <Row gutter={20}>
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                <div>开始时间</div>
              </Col>  
               <Col span={16} style={{marginBottom:'20px'}}>
                  <NewTimePicker newStart={this.state.start} name="start" changeTime={this.onChangeTime} />
                </Col>
              <Col span={4}>
                <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}>例：09:00</div>
              </Col> 
        </Row>
        <Row gutter={20}>
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                <div>结束时间</div>
              </Col>  
               <Col span={16} style={{marginBottom:'20px'}}>
                  <NewTimePicker newStart={this.state.end} name="end" changeTime={this.onChangeTime} />
                </Col>
              <Col span={4}>
                <div style={{color:'#A09891',fontWeight:500,lineHeight:'32px'}}>例：21:00</div>
              </Col> 
        </Row>

        <Row gutter={20}>
                    <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                    <div>是否启用 </div>
                    </Col>  
                    <Col  span={16} style={{marginBottom:'20px'}}>
                        <div>          
                     <RadioGroup 
                        onChange={this.onChangeAll} 
                        name="status"
                        value={this.state.status}>
                        <Radio name="status" value='0'>开启</Radio>
                        <Radio name="status"  value='1'>禁用</Radio>
                     </RadioGroup></div>
                   </Col>
        </Row>
        <Row gutter={20}>
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                   <div>费率信息:</div>
              </Col>
              <Col  span={16} style={{marginBottom:'20px'}}>
                     <CreateConfig 
                           datasValidate={this.state.datasValidate} 
                           changeValidate={this.repayvalidate}
                           innerItem="rateJson"
                           necessaryMess={this.state.rateNecsssary}
                           changeParrateJson={this.changeConfigJson} 
                           chanConfigs={this.state.configrate}
                           default_OBJ={settlementRate}
                         />
              </Col>
        </Row>
          
          <Row gutter={20}>
              <Col style={{textAlign:'right',fontWeight:900,lineHeight:'32px'}} span={4}>
                    <div>配置信息:</div> 
              </Col>
              <Col  span={16} style={{marginBottom:'20px'}}>
                   {this.state.ConfigList_check&&
                        <CreateConfig 
                           datasValidate={this.state.configValidate} 
                           changeValidate={this.revalidate}
                           ref="FormGroup2" 
                           innerItem="configJson"
                           necessaryMess={this.state.configNecsssary}
                           changeParrateJson={this.changeConfigJson} 
                           chanConfigs={this.state.config}
                           default_OBJ={settlementConfigs}
                         />
                    }
              </Col>
          </Row>          
           <div className="qc-save">
              <Button type="primary" onClick={this.conserve}>保存</Button>
         </div>
  </div>
    );
  }
  onChangeTime=(name,timeString)=> {
    this.setState({
      [name]:timeString
    })
  }
  changeConfigJson=(obj,innerItem)=>{
     this.setState({
         [innerItem]:obj.datas
     })
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
  conserve=()=>{
   // JSON.stringify( arr )
    const saveList=[{
      index:'settlementCode',
      mess:'通道编号不能为空',
      arr:this.state.settlementCode
    },{
      index:'name',
      mess:'通道名称不能为空',
      arr:this.state.name
    },{
      index:'start',
      mess:'开始时间不能为空',
      arr:this.state.start
    },{
      index:'end',
      mess:'结束时间不能为空',
      arr:this.state.end
    },{
      index:'status',
      mess:'是否开启不能为空',
      arr:this.state.status
    },{
      index:'rateJson',
      type:'objValidate', //数组验证 datasValidate
      necessary:this.state.rateNecsssary,
      arr:this.state.rateJson,
      mess:'费率信息不能为空',
      messAll:'请补全费率必填信息',
    },{
      index:'configJson',
      type:'objValidate', //对象验证
      necessary:this.state.configNecsssary,
      arr:this.state.configJson,
      mess:'配置信息不能为空',
      messAll:'请补全配置必填信息',
    }]
 var ValidateReturn=ValidateEA(saveList);
 if(ValidateReturn.nextDo){
    const objectJson={
      token:localStorage.cok,
      isAdd:this.state.isAdd,
    }
    postObject(saveList,objectJson)
    changeID(objectJson)
    var obj={
      url:api.resourcePath+api.saveSettChan,
      jsonp:objectJson,
      func200:()=>{
          message.info('请求成功');
          hashHistory.push('/settlementList')
      }
    }
      newfetch(obj) 
    }else{
       if(ValidateReturn.indexVal=='rateJson'){
                  this.setState({
                    datasValidate:'false'
                  })
       }else if(ValidateReturn.indexVal=='configJson'){
                 this.setState({
                    configValidate:'false'
                  })
       }
    }
    
  }
  revalidate=()=>{
       this.setState({
          configValidate:'true'
        }) 
  }
  repayvalidate=()=>{
       this.setState({
          datasValidate:'true'
        }) 
  }
}
const datas= [{
        "key": 1,
        "channelCode": "express_d0",
        "name": "新易联",
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
        "chanConfigs": [{
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
        }],
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
        "chanConfigs": [{
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
        }],
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
        "chanConfigs": [{
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
        {
            "key": 2,
            "name": "gateway",
            "appId": null,
            "account": null,
            "endpoint": null,
            "notifyUrl": null,
            "privateKey": null,
            "publicKey": null,
            "dataKey": null,
            "signKey": null
        }],
        "sumNum": 3
    }]
export default EditSettlement;